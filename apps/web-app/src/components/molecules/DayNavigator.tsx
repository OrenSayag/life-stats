import React from "react";
import { DayNavigatorParams } from "../../types/component-params/app.type";
import NextButton from "../../components/atoms/NextButton";
import PreviousButton from "../../components/atoms/PreviousButton";
import UtilitiesService from "../../services/utilities.service";

const DayNavigator: React.FC<DayNavigatorParams> = ({
  onChange,
  date,
  dateColor,
}) => {
  const onNext = () => onChange(true);
  const onPrevious = () => onChange(false);
  return (
    <div className={"flex items-center gap-12"}>
      <div>
        <PreviousButton onClick={onPrevious} />
      </div>
      <div className={"flex flex-col items-center justify-center  gap-2"}>
        <label className={"text-2xl"}>
          {UtilitiesService.getDayOfWeek(date, "israel")}
        </label>
        <label
          className={["text-3xl", dateColor && `text-${dateColor}`]
            .filter(Boolean)
            .join(" ")}
        >
          {date}
        </label>
      </div>
      <div className={"w-12"}>
        {UtilitiesService.isDateBeforeTomorrow(date, "israel") && (
          <NextButton onClick={onNext} />
        )}
      </div>
    </div>
  );
};

export default DayNavigator;
