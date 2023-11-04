import React from "react";
import { NavBarPageLinkParams } from "../../types/app.type";
import UtilitiesService from "../../services/utilities.service";
import AppService from "../../services/app.service";
import Link from "next/link";

const NavBarPageLink: React.FC<NavBarPageLinkParams> = ({ pageName }) => {
  const isHighlighted = AppService.useIsNavBarPageLinkSelected(pageName);
  return (
    <Link href={`/${pageName}`}>
      <label
        className={[
          isHighlighted ? "text-success" : "",
          "text-3xl",
          "cursor-pointer shadow-lg",
          "hover:text-success",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {UtilitiesService.capitalizeFirstLetter(pageName)}
      </label>
    </Link>
  );
};

export default NavBarPageLink;
