import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import Layout from "../../components/templates/Layout";
import AddButton from "../../components/atoms/AddButton";
import Switch from "@mui/material/Switch";
import { Form as FormType, UserData } from "shared-types/shared.type";
import { FormModificationModeOptions } from "../../types/component-params/form.type";
import Form from "../../components/organisms/Form";
import FormService from "../../services/form.service";
import PreviousIcon from "../../assets/icons/Previous.svg";
import TrashButton from "../../components/atoms/TrashButton";

const FormView: React.FC<UserData> = ({
  formDefinitions: initialFormDefinitions,
}) => {
  const [formModificationMode, setFormModificationMode] =
    useState<FormModificationModeOptions | null>(null);
  const toggleFormModificationMode = (
    options?: FormModificationModeOptions
  ) => {
    setFormModificationMode(options);
  };
  const {
    formDefinitions,
    init,
    createFormDefinitionMutation,
    deleteFormDefinitionMutation,
  } = FormService.useFormDefinitions();

  const FormList: React.FC = () => {
    const FormListItem: React.FC<{ formDefinition: FormType }> = ({
      formDefinition: f,
    }) => (
      <div
        onClick={() =>
          toggleFormModificationMode({
            formDefinition: f,
          })
        }
        className={
          "flex justify-between items-center hover:bg-white hover:bg-opacity-20 p-4 rounded-md cursor-pointer"
        }
      >
        <label>{f.name}</label>
        <div>
          <span>Is Active: </span>
          <Switch checked={f.isActive} />
        </div>
      </div>
    );

    return (
      <div>
        <div className={"flex justify-end p-8"}>
          <AddButton
            fill={"white"}
            onClick={() => {
              const requestBody = FormService.createNewFormDefinition();
              toggleFormModificationMode({
                formDefinition: requestBody,
              });
              createFormDefinitionMutation.mutate({ requestBody });
            }}
          />
        </div>
        <div className={"flex flex-col gap-3 p-8"}>
          {formDefinitions?.map((f) => (
            <FormListItem formDefinition={f} key={f.objectId} />
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    init(initialFormDefinitions);
  }, []);

  const deleteFormDefinition = (formDefinitionId: string) => {
    deleteFormDefinitionMutation.mutate({ formDefinitionId });
    setFormModificationMode(null);
  };

  return (
    <>
      {!formModificationMode && <FormList />}
      {formModificationMode && formDefinitions && (
        <div className={"flex items-center justify-center relative"}>
          <button
            className={"absolute top-12 left-12"}
            onClick={() => toggleFormModificationMode()}
          >
            <PreviousIcon />
          </button>
          <Form modificationMode={formModificationMode} />
          <TrashButton
            fill={"white"}
            className={"absolute right-1/2 -top-8"}
            onClick={() => {
              deleteFormDefinition(
                formModificationMode.formDefinition.objectId
              );
            }}
          />
        </div>
      )}
    </>
  );
};

export default (params: UserData) =>
  Layout({
    view: FormView({ ...params }),
    profilePicUrl: params.profilePicUrl,
  });

export const getServerSideProps = AuthService.routeGuardMiddleware;
