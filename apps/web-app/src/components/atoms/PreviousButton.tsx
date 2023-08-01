import React from "react";
import { PreviousNextButtonParams } from "../../types/component-params/shared.type";
import Image from "next/image";
import config from "../../config";

const DEFAULT_DIMENSION = 30;
const PreviousButton: React.FC<PreviousNextButtonParams> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <Image
        src={`${config.BASE_PATH}/icons/Previous.svg`}
        alt={"next-button"}
        height={DEFAULT_DIMENSION}
        width={DEFAULT_DIMENSION}
      />
    </button>
  );
};

export default PreviousButton;
