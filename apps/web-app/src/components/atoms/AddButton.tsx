import React from "react";
import { PreviousNextButtonParams } from "../../types/component-params/shared.type";
import AddIcon from "../../../public/icons/Add.svg";

const DEFAULT_DIMENSION = 30;
const NextButton: React.FC<PreviousNextButtonParams> = ({
  onClick,
  dimensions,
  fill,
}) => {
  return (
    <button onClick={onClick}>
      <AddIcon
        height={dimensions ? dimensions.height : DEFAULT_DIMENSION}
        width={dimensions ? dimensions.width : DEFAULT_DIMENSION}
        fill={fill}
      />
    </button>
  );
};

export default NextButton;
