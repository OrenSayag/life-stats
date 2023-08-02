import { UseMutationResult } from "react-query";
import { Form, FormItem, UserSettings } from "shared-types/shared.type";

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
