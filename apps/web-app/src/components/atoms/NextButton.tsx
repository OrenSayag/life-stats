import React from "react";
import { PreviousNextButtonParams } from "../../types/component-params/shared.type";

import NextIcon from "../../assets/icons/Next.svg";

const DEFAULT_DIMENSION = 50;
const NextButton: React.FC<PreviousNextButtonParams> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <NextIcon height={DEFAULT_DIMENSION} width={DEFAULT_DIMENSION} />
    </button>
  );
};

export default NextButton;
