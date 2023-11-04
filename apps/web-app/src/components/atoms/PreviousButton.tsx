import React from "react";
import { PreviousNextButtonParams } from "../../types/component-params/shared.type";

import Previous from "../../assets/icons/Previous.svg";

const DEFAULT_DIMENSION = 30;
const PreviousButton: React.FC<PreviousNextButtonParams> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <Previous height={DEFAULT_DIMENSION} width={DEFAULT_DIMENSION} />
    </button>
  );
};

export default PreviousButton;
