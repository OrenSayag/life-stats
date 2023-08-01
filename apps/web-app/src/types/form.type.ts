import { UseMutationResult, UseQueryResult } from "react-query";
import { Form, UserSettings } from "shared-types/shared.type";
import { AxiosResponse } from "axios";

export interface NumericTarget {
  amount: number;
  isMinimum: boolean;
}

export interface FormItem {
  isDaily: boolean;
  label: string;
  type: "numeric" | "boolean";
  numericTarget?: NumericTarget;
  booleanTarget?: boolean;
  defaultValue: number | boolean;
  objectId: string;
  value: number | boolean;
  // TODO update docs

  delete?: boolean; // used for mutating the form definition
}

export interface PatchFormStateItem {
  objectId: string;
  value: number | boolean;
}

export interface PatchFormStateRequestBody {
  items: PatchFormStateItem[];
  date: string;
}

export interface PatchFormDefinitionRequestBody {
  name?: string;
  items?: FormItem[];
  isActive?: boolean;
}
export interface UseFormDefinitionsReturn {
  updateFormDefinitionMutation?: UseMutationResult;
  createFormDefinitionMutation?: UseMutationResult;

  deleteFormDefinitionMutation?: UseMutationResult;

  formDefinitions: Form[];
  init: (formDefinitions: Form[]) => void;
}

export interface AppContext {
  formDefinitions?: Form[];
  settings?: UserSettings;
}
