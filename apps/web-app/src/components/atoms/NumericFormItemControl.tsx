import React from "react";
import { NumericFormItemControlParams } from "../../types/component-params/form.type";
import AddButton from "../../components/atoms/AddButton";
import SubtractButton from "../../components/atoms/SubtractButton";
import InputLabel from "../molecules/InputLabel";
import { InputLabelType } from "../../types/component-params/app.type";

const NumericFormItemControl: React.FC<NumericFormItemControlParams> = ({
  value,
  onChange,
  isTargetDisplay,
  objectId,
  numericTarget,
}) => {
  const add = () => onChange({ value: value + 1, objectId });
  const subtract = () => onChange({ value: value - 1, objectId });
  const setInput = (value: number) => onChange({ value, objectId });
  const determineColor = () => {
    if (isTargetDisplay) {
      return "error";
    }
    const { isMinimum, amount } = numericTarget;
    if (isMinimum && value >= amount) {
      return "success";
    }
    if (isMinimum === false && value > amount) {
      return "error";
    }
    if (isMinimum === false && value <= amount) {
      return "success";
    }
    return "";
  };
  const determineChangerFill = (type: "add" | "subtract") => {
    if (numericTarget.isMinimum) {
      return type !== "add" ? "#D32F2F" : "#309700";
    } else {
      return type !== "add" ? "#309700" : "#D32F2F";
    }
  };
  const determineTargetLabel = () => {
    return (
      numericTarget.amount +
      " " +
      (numericTarget.isMinimum ? "Minimum" : "Maximum")
    );
  };
  return (
    <div className={"flex items-center justify-between gap-2"}>
      {!isTargetDisplay && (
        <AddButton fill={determineChangerFill("add")} onClick={(e) => add(e)} />
      )}
      {!isTargetDisplay && (
        <InputLabel
          className={`text-${determineColor()} text-3xl`}
          type={InputLabelType.NUMBER}
          value={value}
          onInputChange={setInput}
        />
        // <div
        //   className={[`duration-200 text-3xl`, `text-${determineColor()}`]
        //     .filter(Boolean)
        //     .join(" ")}
        // >
        //   {value}
        // </div>
      )}
      {!isTargetDisplay && (
        <SubtractButton
          fill={determineChangerFill("subtract")}
          onClick={(e) => subtract(e)}
        />
      )}
      {isTargetDisplay && (
        <div className={`text-${determineColor()}`}>
          {determineTargetLabel()}
        </div>
      )}
    </div>
  );
};

export default NumericFormItemControl;
