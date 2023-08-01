import React from "react";
import { SubmitButtonParams } from "../../types/component-params/shared.type";
import SubmitIcon from "../../../public/icons/Submit.svg";
import { Dimensions } from "../../types/utilities.type";

const DEFAULT_DIMENSIONS: Dimensions = {
  height: 30,
  width: 30,
};

const SubmitButton: React.FC<SubmitButtonParams> = ({
  onClick,
  className,
  dimensions,
  fill,
}) => {
  return (
    <button className={className} onClick={onClick}>
      <SubmitIcon
        height={dimensions ? dimensions.height : DEFAULT_DIMENSIONS.height}
        width={dimensions ? dimensions.width : DEFAULT_DIMENSIONS.height}
        fill={fill ? fill : "white"}
      />
    </button>
  );
};

export default SubmitButton;
