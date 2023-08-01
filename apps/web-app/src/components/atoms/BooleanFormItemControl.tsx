import React from "react";
import { BooleanFormItemControlParams } from "../../types/component-params/form.type";
import Switch from "@mui/material/Switch";

const BooleanFormItemControl: React.FC<BooleanFormItemControlParams> = ({
  value,
  isTargetDisplay,
  onChange,
  objectId,
  booleanTarget,
}) => {
  const onSwitch = () => onChange({ value: !value, objectId });
  const determineColor = () => {
    if (isTargetDisplay) {
      return "error";
    }
    if (value === booleanTarget) {
      return "success";
    }
  };
  return (
    <div>
      <Switch
        color={determineColor()}
        onChange={onSwitch}
        checked={isTargetDisplay ? booleanTarget : value}
        disabled={isTargetDisplay}
      />
    </div>
  );
};

export default BooleanFormItemControl;
