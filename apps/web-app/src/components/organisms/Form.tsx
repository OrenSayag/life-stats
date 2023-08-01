import React, { useState } from "react";
import Card from "../../components/atoms/Card";
import Divider from "../../components/atoms/Divider";
import { FormParams } from "../../types/component-params/form.type";
import FormItemContainer from "../../components/molecules/FormItemContainer";
import {
  FormItem,
  PatchFormDefinitionRequestBody,
  PatchFormStateItem,
  PatchFormStateRequestBody,
} from "../../types/form.type";
import { CircularProgress } from "@mui/material";
import FormService from "../../services/form.service";
import TargetButton from "../../components/atoms/TargetButton";
import InputLabel from "../molecules/InputLabel";
import { InputLabelType } from "../../types/component-params/app.type";
import strings from "../../assets/strings";
import UtilitiesService from "../../services/utilities.service";
import AddButton from "../atoms/AddButton";
import TrashButton from "../atoms/TrashButton";

const PADDING = "xl:p-6 p-4";
const PADDING_X = "xl:px-24";
const Form: React.FC<FormParams> = ({ formLog, modificationMode }) => {
  const { name, definitionId, items, date, isActive, objectId, isPerfect } =
    formLog || {};

  const toggleTargetMode = () => setTargetMode(!targetMode);
  const { mutate } = FormService.useUpdateFormState(definitionId, date);

  const { updateFormDefinitionMutation } = FormService.useFormDefinitions();

  const [targetMode, setTargetMode] = useState<boolean>(!!modificationMode);
  const onItemValueModification = (formItem: PatchFormStateItem) => {
    const requestBody: PatchFormStateRequestBody = {
      items: [formItem],
      date,
    };
    mutate(requestBody);
  };

  const formDefinitionChangers = {
    changeName: (name: string) => {
      const requestBody: PatchFormDefinitionRequestBody = {
        name,
      };
      const formDefinitionId = modificationMode?.formDefinition.objectId;
      updateFormDefinitionMutation.mutate({ requestBody, formDefinitionId });
    },
    changeFormItem: (item: FormItem) => {
      const currentItems = modificationMode?.formDefinition.items;
      const relevantItem = currentItems.find(
        (ci) => ci.objectId === item.objectId
      );
      if (!relevantItem) {
        currentItems.push(item);
      } else {
        for (const key of Object.keys(relevantItem)) {
          if (item[key] !== undefined) {
            relevantItem[key] = item[key];
          }
        }
      }
      const requestBody: PatchFormDefinitionRequestBody = {
        items: currentItems,
      };
      const formDefinitionId = modificationMode?.formDefinition.objectId;
      console.log("Debug Form component: about to mutate form item item");
      updateFormDefinitionMutation.mutate({ requestBody, formDefinitionId });
    },

    deleteFormItem: (itemId: string) => {
      const item = modificationMode.formDefinition.items.find(
        (i) => i.objectId.toString() === itemId
      );
      item.delete = true;
      const requestBody: PatchFormDefinitionRequestBody = {
        items: modificationMode.formDefinition.items,
      };
      const formDefinitionId = modificationMode?.formDefinition.objectId;
      updateFormDefinitionMutation.mutate({ requestBody, formDefinitionId });
    },

    createNewFormItem: (itemType: "numeric" | "boolean") => {
      const defaultValue = itemType === "boolean" ? false : 0;

      const newItem: FormItem = {
        isDaily: false,
        numericTarget:
          itemType === "numeric" ? { isMinimum: true, amount: 3 } : undefined,
        booleanTarget: itemType === "boolean" ? true : undefined,
        type: itemType,
        defaultValue,
        label: strings.form.formItemModificationTitles.NEW_FORM_ITEM_LABEL,
        objectId: UtilitiesService.createObjectId(),
        value: defaultValue,
      };

      const formDefinitionId = modificationMode?.formDefinition.objectId;
      const requestBody: PatchFormDefinitionRequestBody = {
        items: [...modificationMode.formDefinition.items, newItem],
      };
      updateFormDefinitionMutation.mutate({ requestBody, formDefinitionId });
    },
  };

  const [addItemMode, setAddItemMode] = useState<null | "ask-for-type">(null);
  const toggleAddItemMode = (itemType?: "boolean" | "numeric") => {
    if (addItemMode === null) {
      return setAddItemMode("ask-for-type");
    }

    if (addItemMode !== "ask-for-type") {
      return setAddItemMode(null);
    }

    formDefinitionChangers.createNewFormItem(itemType);

    setAddItemMode(null);
  };

  const FormItemModificationWorkspace: React.FC<{
    formItem: FormItem;
  }> = ({ formItem }) => {
    const [isMouseEntered, setIsMouseEntered] = useState<boolean>(false);
    return (
      <div
        className={"flex items-center justify-between flex-col relative"}
        key={formItem.objectId}
        onMouseEnter={() => setIsMouseEntered(true)}
        onMouseLeave={() => setIsMouseEntered(false)}
      >
        {isMouseEntered && (
          <span className={"absolute right-4 top-4"}>
            <TrashButton
              fill={"white"}
              onClick={() =>
                formDefinitionChangers.deleteFormItem(formItem.objectId)
              }
            />
          </span>
        )}
        <div className={"w-full"}>
          <InputLabel
            className={"w-full text-4xl my-4 border-b-2 border-white pb-2"}
            onInputChange={(newItemName: string) => {
              formDefinitionChangers.changeFormItem({
                ...formItem,
                label: newItemName,
              });
            }}
            value={formItem.label}
            type={InputLabelType.TEXT}
          />
        </div>

        <div className={"w-full text-xl grid grid-cols-2 gap-2"}>
          {formItem.type === "boolean" && (
            <div className={"w-full flex-1  flex flex-col"}>
              <div>
                <label>
                  {strings.form.formItemModificationTitles.DEFAULT_VALUE}
                </label>
              </div>
              <InputLabel
                onInputChange={(newDefaultValue: boolean) => {
                  formDefinitionChangers.changeFormItem({
                    ...formItem,
                    defaultValue: newDefaultValue,
                  });
                }}
                value={formItem.defaultValue as boolean}
                type={InputLabelType.BOOLEAN}
              />
            </div>
          )}
          {formItem.type === "numeric" && (
            <div className={"w-full flex-1  flex flex-col"}>
              <div>
                <label>
                  {strings.form.formItemModificationTitles.DEFAULT_VALUE}
                </label>
              </div>
              <div>
                <InputLabel
                  className={"w-full flex-1"}
                  onInputChange={(newDefaultValue: number) => {
                    formDefinitionChangers.changeFormItem({
                      ...formItem,
                      defaultValue: newDefaultValue,
                    });
                  }}
                  value={formItem.defaultValue as number}
                  type={InputLabelType.NUMBER}
                />
              </div>
            </div>
          )}
          {formItem.type === "boolean" && (
            <div className={"w-full flex-1  flex flex-col"}>
              <div>
                <label>{strings.form.formItemModificationTitles.TARGET}</label>
              </div>
              <InputLabel
                onInputChange={(newTarget: boolean) => {
                  formDefinitionChangers.changeFormItem({
                    ...formItem,
                    booleanTarget: newTarget,
                  });
                }}
                value={formItem.booleanTarget as boolean}
                type={InputLabelType.BOOLEAN}
              />
            </div>
          )}
          {formItem.type === "numeric" && (
            <div className={"w-full flex-1 flex flex-col"}>
              <div className={"mb-8"}>
                <label>{strings.form.formItemModificationTitles.TARGET}</label>
              </div>
              <div className={"grid grid-cols-2 w-full"}>
                <div>
                  <label className={"text-md"}>
                    {
                      strings.form.formItemModificationTitles
                        .NUMERIC_TARGET_AMOUNT
                    }
                  </label>
                </div>

                <InputLabel
                  className={"flex justify-end text-right"}
                  onInputChange={(newTargetAmount: number) => {
                    formDefinitionChangers.changeFormItem({
                      ...formItem,
                      numericTarget: {
                        ...formItem.numericTarget,
                        amount: newTargetAmount,
                      },
                    });
                  }}
                  value={formItem.numericTarget.amount}
                  type={InputLabelType.NUMBER}
                />
              </div>
              <div className={"grid grid-cols-2 w-full text-md"}>
                <div>
                  <label>
                    {
                      strings.form.formItemModificationTitles
                        .NUMERIC_TARGET_IS_MINIMUM
                    }
                  </label>
                </div>
                <InputLabel
                  className={"flex justify-end w-full"}
                  onInputChange={(newTargetIsMinimum: boolean) => {
                    formDefinitionChangers.changeFormItem({
                      ...formItem,
                      numericTarget: {
                        ...formItem.numericTarget,
                        isMinimum: newTargetIsMinimum,
                      },
                    });
                  }}
                  value={formItem.numericTarget.isMinimum as boolean}
                  type={InputLabelType.BOOLEAN}
                />
              </div>
            </div>
          )}
          <div className={"w-full"}>
            <div>
              <label>{strings.form.formItemModificationTitles.IS_DAILY}</label>
            </div>
            <InputLabel
              onInputChange={(newIsDaily: boolean) => {
                formDefinitionChangers.changeFormItem({
                  ...formItem,
                  isDaily: newIsDaily,
                });
              }}
              value={formItem.isDaily as boolean}
              type={InputLabelType.BOOLEAN}
            />
          </div>
        </div>
      </div>
    );
  };

  const AddFormItemAskForTypeDialog: React.FC = () => {
    return (
      <div>
        <div>
          {strings.form.formItemModificationTitles.NEW_FORM_ITEM_TYPE_DIALOG}
        </div>
        <div className={"grid grid-cols-2 rounded-2"}>
          <button
            className={"bg-primary hover:bg-opacity-40 duration-100"}
            onClick={() => toggleAddItemMode("boolean")}
          >
            Boolean
          </button>
          <button
            className={"bg-primary hover:bg-opacity-40 duration-100"}
            onClick={() => toggleAddItemMode("numeric")}
          >
            Numeric
          </button>
        </div>
      </div>
    );
  };

  return (
    <Card
      className={[
        "xl:w-1/2 w-full mt-6 mx-6 transition duration-500",
        isPerfect && "bg-success bg-opacity-20",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(formLog || modificationMode?.formDefinition) && (
        <div>
          <div
            className={[
              "flex items-center justify-between relative",
              PADDING,
              PADDING_X,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {!modificationMode && <label>{name}</label>}
            {modificationMode && (
              <InputLabel
                className={"text-4xl w-full"}
                value={modificationMode.formDefinition.name}
                onInputChange={formDefinitionChangers.changeName}
                type={InputLabelType.TEXT}
              />
            )}
            {!modificationMode && (
              <TargetButton
                targetMode={targetMode}
                onClick={toggleTargetMode}
              />
            )}
          </div>
          <Divider />
          <div
            className={["flex flex-col gap-3", PADDING, PADDING_X]
              .filter(Boolean)
              .join(" ")}
          >
            {formLog &&
              items.map((i) => (
                <FormItemContainer
                  key={i.objectId}
                  formItem={i}
                  targetMode={targetMode}
                  onChange={onItemValueModification}
                />
              ))}
            {modificationMode?.formDefinition &&
              modificationMode?.formDefinition.items.map((i) => (
                <FormItemModificationWorkspace key={i.objectId} formItem={i} />
              ))}
            {modificationMode?.formDefinition && addItemMode === null && (
              <AddButton onClick={toggleAddItemMode} fill={"white"} />
            )}
            {addItemMode === "ask-for-type" && <AddFormItemAskForTypeDialog />}
            {/*{addItemMode !== "ask-for-type" && addItemMode !== null && (*/}
            {/*  <FormItemModificationWorkspace formItem={addItemMode} />*/}
            {/*)}*/}
          </div>
        </div>
      )}
      {!formLog && !modificationMode && <CircularProgress />}
    </Card>
  );
};

export default Form;
