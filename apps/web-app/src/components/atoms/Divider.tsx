import React from "react";
import { DividerParams } from "../../types/component-params/app.type";

const Divider: React.FC<DividerParams> = ({ className }) => {
  return (
    <div
      className={["h-[.2px] w-full bg-white", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
};

export default Divider;
