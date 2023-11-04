import React from "react";
import { FormItemContainerParams } from "../../types/component-params/form.type";
import BooleanFormItemControl from "../../components/atoms/BooleanFormItemControl";
import NumericFormItemControl from "../../components/atoms/NumericFormItemControl";
import { NumericTarget } from "shared-types/shared.type";
import { classNames } from "../../services/utilities.service";

const FormItemContainer: React.FC<FormItemContainerParams> = ({
  formItem,
  targetMode,
  onChange,
  isCurrentSelectedTask,
  onClick,
}) => {
  const {
    isDaily,
    label,
    defaultValue,
    value,
    numericTarget,
    booleanTarget,
    type,
    objectId,
  } = formItem;
  const determineMarker = () => {
    if (isCurrentSelectedTask) {
      return "rounded bg-blue-400 bg-opacity-10 outline outline-blue-800";
    }
    const targetMet =
      type === "boolean"
        ? booleanTarget === value
        : numericTarget?.isMinimum
        ? (value as number) >= numericTarget?.amount
        : (value as number) <= numericTarget?.amount;
    if (isDaily && !targetMet) {
      return "rounded bg-orange-400 bg-opacity-10 outline outline-orange-800";
    }
  };
  return (
    <div
      className={classNames(
        "flex items-center justify-between p-2 transition-all duration-200",
        determineMarker()
      )}
      onClick={onClick}
    >
      <label>{label}</label>
      <div>
        {type === "boolean" && (
          <BooleanFormItemControl
            defaultValue={defaultValue as boolean}
            value={value as boolean}
            onChange={onChange}
            isTargetDisplay={targetMode}
            objectId={objectId}
            booleanTarget={booleanTarget as boolean}
          />
        )}
        {type === "numeric" && (
          <NumericFormItemControl
            numericTarget={numericTarget as NumericTarget}
            value={value as number}
            onChange={onChange}
            isTargetDisplay={targetMode}
            objectId={objectId}
          />
        )}
      </div>
    </div>
  );
};

export default FormItemContainer;
