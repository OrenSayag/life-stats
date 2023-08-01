import React, { FC } from "react";
import { DateRangeSelectorParams } from "../../types/component-params/app.type";
import Select from "../atoms/Select";
import strings from "../../assets/strings";

const DateRangeSelector: FC<DateRangeSelectorParams> = ({
  selectedDateRangeOption,
  setSelectedDateRangeOption,
  dateRangeOptions,
}) => {
  const onSelectChange = (e) => {
    const { value } = e.target;
    setSelectedDateRangeOption(
      dateRangeOptions.find((o) => o.value === +value)
    );
  };
  return (
    <>
      <Select
        labelClassName={"text-white"}
        className={"text-white"}
        selectedOption={selectedDateRangeOption}
        label={strings.analytics.FILTERS.DATE_RANGE_SELECTOR_LABEL}
        labelId={strings.analytics.FILTERS.DATE_RANGE_SELECTOR_LABEL_ID}
        onChange={onSelectChange}
        options={dateRangeOptions}
      />
    </>
  );
};

export default DateRangeSelector;
