import Image from "next/image";
import React from "react";
import { AppLogoParams } from "../../types/component-params/app.type";

import LifeStatsLogo from "../../assets/icons/LifeStats.svg";
import { Dimensions } from "../../types/utilities.type";

const DEFAULT_DIMENSION: Dimensions = { width: 200 };
const AppLogo: React.FC<AppLogoParams> = ({ dimensions }) => {
  return (
    <LifeStatsLogo
    // width={dimensions ? dimensions.width : DEFAULT_DIMENSION.width}
    />
  );
};
export default AppLogo;
