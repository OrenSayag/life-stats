import React from "react";
import BooleanTrue from "../../assets/icons/BooleanTrue.svg";

import BooleanFalse from "../../assets/icons/BooleanFalse.svg";

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
