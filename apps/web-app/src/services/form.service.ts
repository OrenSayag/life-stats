import {
  PatchFormDefinitionRequestBody,
  PatchFormStateRequestBody,
  UseFormDefinitionsReturn,
} from "../types/form.type";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import config from "./../config";
import { DayViewDateData } from "../types/day.type";
import {
  Form,
  FormItem,
  FormLog,
  NumericTarget,
} from "shared-types/shared.type";
import strings from "../assets/strings";
import UtilitiesService from "./utilities.service";
import { CreateFormDefinitionRequestBody } from "../types/component-params/form.type";

class FormService {
  public static useUpdateFormState = (
    formDefinitionId: string,
    date: string
  ) => {
    const queryClient = useQueryClient();

    const queryKey = ["day-view-data", date];

    return useMutation({
      mutationFn: (requestBody: PatchFormStateRequestBody) => {
        return axios.patch(
          config.API_HOST + "form/" + formDefinitionId + "/state",
          requestBody,
          { withCredentials: true }
        );
      },
      onMutate: async (requestBody: PatchFormStateRequestBody) => {
        await queryClient.cancelQueries({ queryKey: queryKey });

        const dayViewData = await queryClient.getQueryData<DayViewDateData>(
          queryKey
        );
        const { items: modifiedFormLogItems } = requestBody;
        if (dayViewData) {
          const { forms } = dayViewData;
          const relevantForm = forms[formDefinitionId];
          for (const i of modifiedFormLogItems) {
            const { value, objectId } = i;
            const relevantItemInForm = relevantForm.items.find(
              (item: FormItem) => item.objectId === objectId
            );
            relevantItemInForm.value = value;
          }
          relevantForm.isPerfect = FormService.isFormLogPerfect(relevantForm);
          queryClient.setQueriesData<DayViewDateData>(
            queryKey,
            () => dayViewData
          );
        }
        return { dayViewData };
      },
      onError: (err, variables, context) => {
        if (context?.dayViewData) {
          queryClient.setQueryData<DayViewDateData>(
            [queryKey],
            context.dayViewData
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
    });
  };

  private static isFormLogPerfect(log: FormLog): boolean {
    return log.items
      .filter((i) => i.isDaily)
      .every((i) => {
        const { type, booleanTarget, numericTarget, value } = i;
        if (type === "boolean") {
          return booleanTarget === value;
        }
        const { amount, isMinimum } = numericTarget as NumericTarget;
        if (isMinimum && (value as number) >= amount) {
          return true;
        }
        if (!isMinimum && (value as number) <= amount) {
          return true;
        }
      });
  }

  public static createNewFormDefinition(): Form {
    const definitionId = UtilitiesService.createObjectId();
    return {
      objectId: definitionId,
      name: strings.form.NEW_FORM_TITLE,
      isActive: true,
      items: [
        {
          objectId: UtilitiesService.createObjectId(),
          booleanTarget: true,
          value: true,
          isDaily: true,
          numericTarget: { amount: 1, isMinimum: true },
          type: "boolean",
          defaultValue: false,
          label: strings.form.NEW_FORM_ITEM_BOOLEAN_TITLE,
        },
        {
          objectId: UtilitiesService.createObjectId(),
          booleanTarget: false,
          value: 0,
          isDaily: true,
          numericTarget: { amount: 5, isMinimum: true },
          type: "numeric",
          defaultValue: 0,
          label: strings.form.NEW_FORM_ITEM_NUMERIC_TITLE,
        },
      ],
    };
  }

  public static useFormDefinitions = (): UseFormDefinitionsReturn => {
    const queryClient = useQueryClient();
    const queryKey = ["formDefinitions"];
    const init = (formDefinitions: Form[]) => {
      queryClient.setQueryData<Form[]>(queryKey, formDefinitions);
    };

    const createFormDefinitionMutation = useMutation({
      mutationFn: (params: {
        requestBody: CreateFormDefinitionRequestBody;
      }) => {
        return axios.post(config.API_HOST + "form/", params.requestBody, {
          withCredentials: true,
        });
      },
      onMutate: (params: { requestBody: CreateFormDefinitionRequestBody }) => {
        const { objectId, name, isActive, items } = params.requestBody;
        queryClient.setQueryData<Form[]>(
          queryKey,
          (formDefinitions): Form[] => {
            formDefinitions.push({
              items: items.map((i) => ({ ...i, value: i.defaultValue })),
              name,
              isActive,
              objectId,
            });
            return formDefinitions;
          }
        );
      },
      onError: (error, variables) => {
        queryClient.setQueryData<Form[]>(
          queryKey,
          (formDefinitions): Form[] => {
            const {
              requestBody: { objectId },
            } = variables;
            formDefinitions = formDefinitions.filter(
              (f) => f.objectId !== objectId
            );
            return formDefinitions;
          }
        );
      },
    });

    const updateFormDefinitionMutation = useMutation({
      mutationFn: (params: {
        requestBody: PatchFormDefinitionRequestBody;
        formDefinitionId: string;
      }) =>
        axios.patch(
          config.API_HOST + "form/" + params.formDefinitionId,
          params.requestBody,
          { withCredentials: true }
        ),
      onMutate: (params: {
        requestBody: PatchFormDefinitionRequestBody;
        formDefinitionId: string;
      }) => {
        const { requestBody, formDefinitionId } = params;
        const { items, name, isActive } = requestBody;
        const formDefinitions = queryClient.getQueryData<Form[]>(queryKey);
        const form = formDefinitions.find(
          (f) => f.objectId === formDefinitionId
        );
        const previousFormDefinition: Form = {
          items: [...form.items],
          name: form.name,
          isActive: form.isActive,
          objectId: form.objectId,
        };
        const filterDeletedItems = () => items.filter((i) => !i.delete);
        form.items = items ? filterDeletedItems() : form.items;
        form.name = name ? name : form.name;
        form.isActive = isActive !== undefined ? isActive : form.isActive;

        return { previousFormDefinition };
      },
      onError: (error, variables, context) => {
        queryClient.setQueryData<Form[]>(
          queryKey,
          (formDefinitions): Form[] => {
            const { formDefinitionId, requestBody } = variables;
            let definition = formDefinitions.find(
              (f) => f.objectId === formDefinitionId
            );
            for (const key of Object.keys(definition)) {
              definition[key] = context.previousFormDefinition[key];
            }
            return formDefinitions;
          }
        );
      },
    });

    const deleteFormDefinitionMutation = useMutation({
      mutationFn: (params: { formDefinitionId: string }) =>
        axios.delete(config.API_HOST + "form/" + params.formDefinitionId, {
          withCredentials: true,
        }),
      onMutate: (params: { formDefinitionId: string }) => {
        const previousValue = queryClient.getQueryData<Form[]>(queryKey);
        queryClient.setQueryData<Form[]>(
          queryKey,
          (formDefinitions): Form[] => {
            formDefinitions = formDefinitions.filter(
              (f) => f.objectId !== params.formDefinitionId
            );
            return formDefinitions;
          }
        );
        return { previousValue };
      },
      onError: (error, variables, context) => {
        queryClient.setQueryData<Form[]>(
          queryKey,
          (formDefinitions): Form[] => {
            const { previousValue } = context;
            const { formDefinitionId } = variables;
            const definition = previousValue.find(
              (f) => f.objectId === formDefinitionId
            );
            formDefinitions.push(definition);
            return formDefinitions;
          }
        );
      },
    });

    return {
      init,
      formDefinitions: queryClient.getQueryData<Form[]>(queryKey),
      updateFormDefinitionMutation,
      createFormDefinitionMutation,
      deleteFormDefinitionMutation,
    };
  };
}

export default FormService;
