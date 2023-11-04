import React from "react";
import { ViewModeToggleParams } from "../../types/component-params/shared.type";
import Switch from "@mui/material/Switch";
import { classNames } from "../../services/utilities.service";

const ViewModeToggle: React.FC<ViewModeToggleParams> = ({
  onChange,
  modes,
  mode,
  className,
}) => {
  const Unit: React.FC<{ label: string; className?: string }> = ({
    label,
    className,
  }) => {
    return (
      <span
        className={[label === mode.label ? "underline" : "", className]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </span>
    );
  };
  const onToggleFormFinance = () => {
    if (mode === modes[0]) {
      onChange(modes[1]);
    } else {
      onChange(modes[0]);
    }
  };
  return (
    <div
      className={classNames(
        "flex justify-between items-center p-6 text-2xl shadow-xl",
        className
      )}
    >
      <div>
        <Unit className={"text-xl"} label={modes[0].label} />
        <Switch
          color={"default"}
          checked={mode === modes[1]}
          onClick={onToggleFormFinance}
        />
        <Unit className={"text-xl"} label={modes[1].label} />
      </div>
    </div>
  );
};

export default ViewModeToggle;
