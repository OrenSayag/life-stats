import React, { useEffect, useMemo, useState } from "react";
import ViewModeToggle from "../../components/molecules/ViewModeToggle";
import Layout from "../../components/templates/Layout";
import AuthService from "../../services/auth.service";
import Divider from "../../components/atoms/Divider";
import { DateRange, UserData } from "shared-types/shared.type";
import AnalyticsService from "../../services/analytics.service";
import LineChart from "../../components/organisms/LineChart";
import AnalyticsItemSwitch from "../../components/molecules/AnalyticsItemSwitch";
import moment from "moment";
import BooleanIcon from "../../components/molecules/BooleanIcon";
import Select from "../../components/atoms/Select";
import strings from "../../assets/strings";
import { DateRangeSelection } from "../../types/app.type";
import DateRangeSelector from "../../components/molecules/DateRangeSelector";
import { ViewMode, ViewModes } from "../day";

const Filters: React.FC<{
  changeSelectedForm: (formDefinitionId: string) => void;
  selectedFormId: string;
  formSelectionOptions: { label: string; value: string }[];
  changeDateRange: (dateRange: DateRange | DateRangeSelection) => void;
  selectedDateRangeOption: { value: DateRangeSelection; label: string };
  dateRangeOptions: { value: DateRangeSelection; label: string }[];
  setSelectedDateRangeOption: (option: {
    value: DateRangeSelection;
    label: string;
  }) => void;
  selectedItems: string[];
  allItems: { value: string; label: string }[];
  setSelectedItems: (newItems: string[]) => void;
}> = ({
  changeSelectedForm,
  selectedFormId,
  formSelectionOptions,
  selectedDateRangeOption,
  setSelectedDateRangeOption,
  dateRangeOptions,
  selectedItems,
  setSelectedItems,
  allItems,
}) => {
  const FormSelector: React.FC<{
    formSelectionOptions: { label: string; value: string }[];
    selectedFormId: string;
    changeSelectedForm: (formDefinitionId: string) => void;
  }> = ({ formSelectionOptions, changeSelectedForm, selectedFormId }) => {
    const onChange = (changeEvent) => {
      const newFormId = changeEvent.target.value;
      changeSelectedForm(newFormId);
    };
    return (
      <Select
        labelClassName={"text-white"}
        className={"text-white"}
        options={formSelectionOptions}
        selectedOption={{
          value: selectedFormId,
          label: formSelectionOptions.find((o) => o.value === selectedFormId)
            .label,
        }}
        label={strings.analytics.FILTERS.FORM_SELECTOR_LABEL}
        labelId={strings.analytics.FILTERS.FORM_SELECTOR_LABEL_ID}
        onChange={onChange}
      />
    );
  };

  const ItemsSelector: React.FC<{
    allItems: { value: string; label: string }[];
    selectedItems: string[];
    setSelectedItems: (newItems: string[]) => void;
  }> = ({ allItems, selectedItems, setSelectedItems }) => {
    const onChange = (e) => {
      setSelectedItems(e.target.value as unknown as string[]);
    };
    const selectedOptions = useMemo(() => {
      return selectedItems
        .filter((i) => allItems.some((it) => it.value === i))
        .map((i) => ({
          value: i,
          label: allItems.find((it) => it.value === i).label,
        }));
    }, [selectedItems]);
    return (
      <>
        <Select
          labelClassName={"text-white"}
          className={"text-white"}
          selectedOption={selectedOptions || allItems}
          label={strings.analytics.FILTERS.ITEMS_SELECTOR.LABEL}
          onChange={onChange}
          options={allItems}
          labelId={strings.analytics.FILTERS.ITEMS_SELECTOR.LABEL_ID}
          multiple={true}
        />
      </>
    );
  };

  return (
    <div className={"flex border-b-[1px] gap-2 pl-2 border-white pt-8 pb-4"}>
      <FormSelector
        formSelectionOptions={formSelectionOptions}
        selectedFormId={selectedFormId}
        changeSelectedForm={changeSelectedForm}
      />
      <DateRangeSelector
        dateRangeOptions={dateRangeOptions}
        selectedDateRangeOption={selectedDateRangeOption}
        setSelectedDateRangeOption={setSelectedDateRangeOption}
        selectInputLabel={strings.analytics.FILTERS.DATE_RANGE_SELECTOR_LABEL}
        selectInputLabelId={
          strings.analytics.FILTERS.DATE_RANGE_SELECTOR_LABEL_ID
        }
      />
      {/*Buggy, TODO fix*/}
      {/*<ItemsSelector*/}
      {/*  allItems={allItems}*/}
      {/*  selectedItems={selectedItems}*/}
      {/*  setSelectedItems={setSelectedItems}*/}
      {/*/>*/}
    </div>
  );
};

const HistoryList: React.FC<{
  data: { date: string; value: number | boolean }[];
  className?: string;
}> = ({ data, className }) => {
  const formatDate = (date: string) => {
    return moment(date).format("DD/MM/YY");
  };
  const determineValue = (value: boolean | number) => {
    if (typeof value === "number") {
      return value;
    }
    return <BooleanIcon value={value} />;
  };

  return (
    <div
      className={["flex flex-col gap-2 items-center", className]
        .filter(Boolean)
        .join(" ")}
    >
      {data
        ?.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .map((i) => (
          <div
            className={"flex justify-between items-center w-72 text-xl"}
            key={i.date + i.value}
          >
            <div>{formatDate(i.date)}</div>
            <div>{determineValue(i.value)}</div>
          </div>
        ))}
    </div>
  );
};

const AnalyticsView: React.FC<UserData> = ({
  formDefinitions,
  moneyTransactionCategories,
  settings,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewModes.GRAPH);

  const [selectedForm, setSelectedForm] = useState<string>(
    formDefinitions[0].objectId
  );
  const {
    query: { data, isError, isLoading },
    changeDateRange,
    selectedDateRangeOption,
    setSelectedDateRangeOption,
    dateRangeOptions,
  } = AnalyticsService.useFormAnalyticsData({
    formDefinitionId: selectedForm,
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const allItems = useMemo<{ value: string; label: string }[]>(() => {
    return Object.keys(data?.items || {}).map((itemId) => ({
      value: itemId,
      label: formDefinitions
        .find((f) => f.objectId === selectedForm)
        ?.items.find((i) => i.objectId === itemId)?.label,
    }));
  }, [data]);

  const selectedItemsData = useMemo(() => {
    return {
      ...data,
      items: filterOutUnselectedItems(),
    };
    function filterOutUnselectedItems() {
      if (selectedItems.length === 0 && data?.items) {
        return data.items;
      }
      const copy = {};
      const allowedItemIds = selectedItems;
      for (const itemId in data?.items || {}) {
        if (!allowedItemIds.includes(itemId)) {
          continue;
        }
        copy[itemId] = [...data.items[itemId]];
      }
      return copy;
    }
  }, [data, selectedItems]);

  const [selectedItemId, setSelectedItemId] = useState<string>(
    Object.keys(selectedItemsData?.items || {})[0]
  );

  const selectedItemData = useMemo(() => {
    return selectedItemsData?.items[selectedItemId];
  }, [selectedItemId, selectedItemsData]);

  useEffect(() => {
    setSelectedItemId(Object.keys(selectedItemsData?.items || {})[0]);
  }, [selectedItemsData]);

  const selectedItemIndex = useMemo(() => {
    return Object.keys(selectedItemsData?.items || {}).indexOf(selectedItemId);
  }, [selectedItemId]);

  const selectedItemLabel: string = useMemo(() => {
    return formDefinitions
      .find((f) => f.objectId === selectedForm)
      ?.items.find((i) => i.objectId === selectedItemId)?.label;
  }, [selectedItemId]);

  const switchSelectedItemId = (dir: "next" | "previous") => {
    let newItemId: string;
    const isCurrentIndexMax =
      Object.keys(selectedItemsData?.items).length - 1 === selectedItemIndex;
    if (dir === "next") {
      newItemId = isCurrentIndexMax
        ? Object.keys(selectedItemsData?.items)[0]
        : Object.keys(selectedItemsData?.items)[selectedItemIndex + 1];
    } else {
      newItemId =
        selectedItemIndex === 0
          ? Object.keys(selectedItemsData?.items)[
              Object.keys(selectedItemsData?.items).length - 1
            ]
          : Object.keys(selectedItemsData?.items)[selectedItemIndex - 1];
    }
    setSelectedItemId(newItemId);
  };

  const toggleViewMode = () =>
    setViewMode(
      viewMode === ViewModes.GRAPH ? ViewModes.HISTORY : ViewModes.GRAPH
    );

  const lineChartData = useMemo(() => {
    const determineValue = (value: boolean | number) => {
      if (typeof value === "boolean") {
        return value ? 1 : 0;
      }
      return value;
    };
    return selectedItemData?.map((i) => ({
      key: i.date,
      value: determineValue(i.value),
    }));
  }, [selectedItemData, selectedItemsData]);

  const formSelectionOptions: { label: string; value: any }[] =
    formDefinitions.map((f) => ({ value: f.objectId, label: f.name }));

  return (
    <div>
      <Filters
        allItems={allItems}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
        setSelectedDateRangeOption={setSelectedDateRangeOption}
        selectedDateRangeOption={selectedDateRangeOption}
        dateRangeOptions={dateRangeOptions}
        changeDateRange={changeDateRange}
        changeSelectedForm={setSelectedForm}
        formSelectionOptions={formSelectionOptions}
        selectedFormId={selectedForm}
      />
      <div className={"flex"}>
        <div className={"w-5/6"}></div>
        <ViewModeToggle
          modes={[ViewModes.GRAPH, ViewModes.HISTORY]}
          mode={viewMode}
          onChange={toggleViewMode}
        />
      </div>
      <Divider />
      <AnalyticsItemSwitch
        itemLabel={selectedItemLabel}
        onChange={switchSelectedItemId}
      />
      {viewMode === ViewModes.GRAPH && data && (
        <LineChart data={lineChartData} className={"mt-24"} />
      )}
      {viewMode === ViewModes.HISTORY && data && (
        <HistoryList data={selectedItemData} className={"mt-24"} />
      )}
    </div>
  );
};

export default (params: UserData) =>
  Layout({
    view: AnalyticsView({ ...params }),
    profilePicUrl: params.profilePicUrl as string,
  });

export const getServerSideProps = AuthService.routeGuardMiddleware;
