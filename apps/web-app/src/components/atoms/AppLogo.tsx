import Image from "next/image";
import React from "react";
import { AppLogoParams } from "../../types/component-params/app.type";
import config from "../../config";

const DEFAULT_DIMENSION = 200;
const AppLogo: React.FC<AppLogoParams> = ({ dimensions }) => {
  return (
    <Image
      src={`${config.BASE_PATH}/icons/LifeStats.svg`}
      alt={"app-logo"}
      width={dimensions?.width || DEFAULT_DIMENSION}
      height={dimensions?.height || DEFAULT_DIMENSION}
    />
  );
};
export default AppLogo;
