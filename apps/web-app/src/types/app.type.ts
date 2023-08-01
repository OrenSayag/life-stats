import { ReactNode } from "react";

export interface DisplayMobileNavbarControl {
  displayMobileNavbar: boolean;
  toggleMobileNavbar: () => void;
}

export interface NavBarPageLinkParams {
  pageName: string;
}

export type DateFormat = "israel" | "computer";

export interface CardParams {
  children: ReactNode;
  className?: string;
}

export enum DateRangeSelection {
  THIS_MONTH = 1,
  LAST_MONTH = 2,
  LAST_3_MONTHS = 3,
  LAST_6_MONTHS = 4,
  LAST_YEAR = 5,
  CUSTOM = 6,
}
