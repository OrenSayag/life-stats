import React from "react";
import { ViewModeToggleParams } from "../../types/component-params/shared.type";
import Switch from "@mui/material/Switch";

const ViewModeToggle: React.FC<ViewModeToggleParams> = ({
  label1,
  label2,
  onChange,
  highlighted,
}) => {
  const Unit: React.FC<{ label: string }> = ({ label }) => {
    return (
      <span
        className={[label === highlighted ? "underline" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </span>
    );
  };
  return (
    <span className={"flex justify-between items-center p-6 text-2xl"}>
      <Unit label={label1} />
      <Switch
        color={"default"}
        checked={label1 !== highlighted}
        onClick={onChange}
      />
      <Unit label={label2} />
    </span>
  );
};

export default ViewModeToggle;
