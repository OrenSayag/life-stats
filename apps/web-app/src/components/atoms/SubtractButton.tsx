import React from "react";
import { PreviousNextButtonParams } from "../../types/component-params/shared.type";
import SubtractIcon from "../../assets/icons/Subtract.svg";

const DEFAULT_DIMENSION = 30;
const NextButton: React.FC<PreviousNextButtonParams> = ({
  onClick,
  dimensions,
  fill,
}) => {
  return (
    <button onClick={onClick}>
      <SubtractIcon
        height={dimensions ? dimensions.height : DEFAULT_DIMENSION}
        width={dimensions ? dimensions.height : DEFAULT_DIMENSION}
        fill={fill}
      />
    </button>
  );
};

export default NextButton;
