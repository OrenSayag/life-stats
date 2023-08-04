import { Dimensions } from "../../types/utilities.type";
import { ChangeEventHandler, ReactNode } from "react";
import { DateRangeSelection } from "../app.type";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export interface SelectParams {
  selectedOption:
    | { value: any; label: string }
    | { value: any; label: string }[];
  label: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  labelClassName?: string;
  options: { value: any; label: string }[];
  labelId: string;
  className?: string;
  multiple?: boolean;
}
export interface LayoutParams {
  profilePicUrl: string;
  view: ReactNode;
}
export interface HeaderBarParams {
  profilePicUrl: string;
  toggleDisplayMobileNavbar: () => void;
  isBurgerOpen: boolean;
}

export interface BurgerParams {
  toggleDisplayMobileNavbar: () => void;
  isOpen: boolean;
}

export interface UserAvatarParams {
  profilePicUrl: string;
}

export interface AppLogoParams {
  dimensions?: Dimensions;
}

export interface DayNavigatorParams {
  date: string;
  onChange: (next: boolean) => void;

  // TODO update docs
  dateColor?: "success";
}

export interface DividerParams {
  className?: string;
}

export interface IconButtonParams {
  iconPath: string;
  onClick: () => void;
  className?: string;
}

export enum InputLabelType {
  SELECT = "select",
  TEXT = "text",
  BOOLEAN = "boolean",
  NUMBER = "number",
}
export type InputLabelParams = {
  onInputChange: (value: any) => void;
  className?: string;
  value: number | boolean | string | { label: string; value: string }[];
  widthByValue?: boolean;
} & (
  | { type: InputLabelType.TEXT; value: string }
  | { type: InputLabelType.NUMBER; value: number }
  | { type: InputLabelType.BOOLEAN; value: boolean }
  | { type: InputLabelType.SELECT; value: { label: string; value: string }[] }
);

export interface ChartParams {
  data: { key: string; value: number }[];
  renderLabel?: ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: any;
    cy: any;
    midAngle: any;
    innerRadius: any;
    outerRadius: any;
    percent: any;
    index: any;
  }) => ReactJSXElement;
  className?: string;
}

export interface DateRangeSelectorParams {
  selectedDateRangeOption: { value: DateRangeSelection; label: string };
  dateRangeOptions: { value: DateRangeSelection; label: string }[];
  setSelectedDateRangeOption: (option: {
    value: DateRangeSelection;
    label: string;
  }) => void;

  selectInputLabel: string;
  selectInputLabelId: string;
}
