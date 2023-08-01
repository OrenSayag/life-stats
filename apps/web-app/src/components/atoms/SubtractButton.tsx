import React from "react";
import { PreviousNextButtonParams } from "../../types/component-params/shared.type";
import SubtractIcon from "../../../public/icons/Subtract.svg";

const DEFAULT_DIMENSION = 30;
const NextButton: React.FC<PreviousNextButtonParams> = ({
  onClick,
  dimensions,
  fill,
}) => {
  return (
    <button onClick={onClick}>
      {/*<Image*/}
      {/*  src={"/icons/Subtract.svg"}*/}
      {/*  alt={"next-button"}*/}
      {/*  height={DEFAULT_DIMENSION}*/}
      {/*  width={DEFAULT_DIMENSION}*/}
      {/*/>*/}
      <SubtractIcon
        height={dimensions ? dimensions.height : DEFAULT_DIMENSION}
        width={dimensions ? dimensions.height : DEFAULT_DIMENSION}
        fill={fill}
      />
    </button>
  );
};

export default NextButton;
