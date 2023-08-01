import React from "react";
import BooleanTrue from "@/../public/icons/BooleanTrue.svg";

import BooleanFalse from "@/../public/icons/BooleanFalse.svg";

const BooleanIcon: React.FC<{ value: boolean; width?: number }> = ({
  value,
  width = 30,
}) => {
  return value ? (
    <BooleanTrue width={width} fill={"green"} />
  ) : (
    <BooleanFalse width={width} fill={"red"} />
  );
};

export default BooleanIcon;
