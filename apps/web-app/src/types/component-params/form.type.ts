import { PatchFormStateItem } from "../../types/form.type";
import {
  FormLog,
  Form,
  FormItem,
  NumericTarget,
} from "shared-types/shared.type";
import React from "react";

export interface FormModificationModeOptions {
  formDefinition: Form;
}
export interface FormParams {
  formLog?: FormLog;
  modificationMode?: FormModificationModeOptions;
}

export interface FormItemContainerParams {
  formItem: FormItem;
  targetMode: boolean;
  // TODO update docs
  onChange: (formLogItem: PatchFormStateItem) => void;
  isCurrentSelectedTask?: boolean;
  onClick: () => void;
}

export interface FormItemControlParams {
  isTargetDisplay: boolean; // when true, value-modification buttons are hidden.
}

export interface NumericFormItemControlParams extends FormItemControlParams {
  value: number;
  numericTarget: NumericTarget;
  // TODO update docs
  onChange: (formLogItem: PatchFormStateItem) => void;
  objectId: string;
}
export interface BooleanFormItemControlParams extends FormItemControlParams {
  value: boolean;
  defaultValue: boolean;
  booleanTarget: boolean;
  // TODO update docs
  onChange: (formLogItem: PatchFormStateItem) => void;
  objectId: string;
}

export interface CreateFormDefinitionRequestBody {
  name: string;
  items: {
    defaultValue: number | boolean;
    label: string;
    isDaily: boolean;
    numericTarget?: NumericTarget;
    booleanTarget?: boolean;
    objectId: string;
    type: "boolean" | "numeric";
  }[];
  isActive: boolean;
  objectId: string;
}
