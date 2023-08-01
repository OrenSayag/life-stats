import React from "react";
import PreviousButton from "../atoms/PreviousButton";
import NextButton from "../atoms/NextButton";
import strings from "../../assets/strings";

const AnalyticsItemSwitch: React.FC<{
  itemLabel: string;
  onChange: (dir: "next" | "previous") => void;
}> = ({ itemLabel, onChange }) => {
  return (
    <div
      className={"flex gap-3 items-center justify-center border-b-[1px] py-4"}
    >
      {itemLabel !== undefined && (
        <>
          <PreviousButton onClick={() => onChange("previous")} />
          <label className={"w-72 text-center text-2xl"}>{itemLabel}</label>
          <NextButton onClick={() => onChange("next")} />
        </>
      )}
      {itemLabel === undefined && (
        <label>{strings.analytics.FILTERS.ITEMS_SWITCH_NO_DATA}</label>
      )}
    </div>
  );
};

export default AnalyticsItemSwitch;
