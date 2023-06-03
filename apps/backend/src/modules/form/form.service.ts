import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { UtilitiesService } from '../utilities/utilities.service';
import {
  CreateFormDefinitionDto,
  GetFormLogByDateParams,
  UpdateFormDefinitionParams,
  UpdateFormLogParams,
} from '../../types/form.type';
import { FormLog } from '../../mongoose-schemas/form-log.mongoose-schema';
import { Form } from '../../mongoose-schemas/form.mongoose-schema';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import {
  FormItem,
  NumericTarget,
} from '../../mongoose-schemas/form-item.mongoose-schema';
import { Types } from 'mongoose';
import { DateRange } from 'shared-types/shared.type';

@Injectable()
export class FormService {
  constructor(private readonly userService: UsersService) {}

  public async getHistoryByDate(date: string): Promise<any> {
    const user = await this.userService.findByCookie();
    const formTypes = user.forms.map((f) => f.objectId.toString());
    const formsInThisDate = user.formHistory.filter((f) =>
      UtilitiesService.compareDateStrings(f.date, date),
    );
    const groupedByType = {};
    for (const id of formTypes) {
      // FOLLOWING CODE SEEM BUGGY AND REDUNDANT. TODO INVESTIGATE AND REMOVE
      // const matchingForm = formsInThisDate.find(
      //   (f) => f.objectId.toString() === id,
      // );
      // if (matchingForm) {
      //   groupedByType[id] = matchingForm;
      //   continue;
      // }

      // TODO REMOVE COMMENTED OUT CODE
      // const formDefinition = user.forms.find(
      //   (f) => f.objectId.toString() === id,
      // );
      // formDefinition.items.forEach((i) => (i.value = i.defaultValue));
      // groupedByType[id] = formDefinition;
      const newFormLog = await this.getLogByDate({ date, definitionId: id });
      groupedByType[id] = newFormLog;
    }
    return groupedByType;
  }

  public async getLogByDate(params: GetFormLogByDateParams): Promise<FormLog> {
    const user = await this.userService.findByCookie();
    const { forms, formHistory } = user;
    const { date, definitionId } = params;
    const formDefinition = forms.find(
      (f) => f.objectId.toString() === definitionId,
    );
    inputValidation();

    let formLog = formHistory.find(
      (f) => f.date === date && f.definitionId.toString() === definitionId,
    );

    if (!formLog) {
      formLog = new FormLog();
      populateNewFormLog(formDefinition, formLog, date);
    } else {
      getFormDefinitionUpdatedValues(formLog);
    }

    return formLog;

    function inputValidation() {
      if (!formDefinition) {
        throw new BadRequestException(
          apiReturnStrings.form.FAILED_TO_GET_FORM_BY_INPUT_ID,
        );
      }
    }
    function populateNewFormLog(
      formDefinition: Form,
      log: FormLog,
      date: string,
    ): void {
      log.date = date;
      log.definitionId = formDefinition.objectId;
      log.objectId = UtilitiesService.objectId();

      for (const key of Object.keys(formDefinition)) {
        if (['objectId'].includes(key)) {
          continue;
        }
        log[key] = formDefinition[key];
      }
      for (const item of log.items) {
        item.value = item.defaultValue;
      }
    }

    function getFormDefinitionUpdatedValues(log: FormLog) {
      const definition = user.forms.find(
        (d) => d.objectId.toString() === log.definitionId.toString(),
      );
      console.log("debug form service: definition's name");
      console.log(definition);
      log.name = definition.name;
      const { items } = definition;
      const itemsThatAreNotInLog = items.filter(
        (itemInDefinition) =>
          !log.items.some(
            (logItem) =>
              logItem.objectId.toString() ===
              itemInDefinition.objectId.toString(),
          ),
      );
      for (const item of itemsThatAreNotInLog) {
        log.items.push(item);
      }
      log.items.forEach((i) => {
        const itemDefinition = items.find(
          (item) => item.objectId.toString() === i.objectId.toString(),
        );
        if (!itemDefinition) {
          definition.items = definition.items.filter(
            (item) => item.objectId.toString() !== i.objectId.toString(),
          );
          log.items = log.items.filter(
            (logItem) => logItem.objectId.toString() !== i.objectId.toString(),
          );
          return;
        }
        i.label = itemDefinition.label;
        i.isDaily = itemDefinition.isDaily;
        i.defaultValue = itemDefinition.defaultValue;
        i.numericTarget = itemDefinition.numericTarget;
        i.booleanTarget = itemDefinition.booleanTarget;
      });
    }
  }

  public async updateFormLogItemValues(
    params: UpdateFormLogParams,
  ): Promise<void> {
    const user = await this.userService.findByCookie();
    const { formHistory, forms } = user;
    const { log, items } = params;
    updateFormItemValues();
    isPerfectDayLog();
    upsertLog();

    await this.userService.updateUser(user);

    function isPerfectDayLog() {
      let dayIsPerfect = true;
      for (const itemInLog of log.items) {
        const { isDaily, type, value, numericTarget, booleanTarget } =
          itemInLog;
        if (!isDaily) {
          continue;
        }
        if (type === 'numeric') {
          const { amount, isMinimum } = numericTarget;
          if ((isMinimum && value < amount) || (!isMinimum && value > amount)) {
            dayIsPerfect = false;
          }
        }
        if (type === 'boolean') {
          if (booleanTarget !== value) {
            dayIsPerfect = false;
          }
        }
      }
      log.isPerfect = dayIsPerfect;
    }

    function upsertLog() {
      const existing = formHistory.find(
        (l) => l.objectId.toString() === log.objectId.toString(),
      );
      if (existing) {
        for (const key of Object.keys(log)) {
          existing[key] = log[key];
        }
      } else {
        user.formHistory.push(log);
      }
    }

    function updateFormItemValues() {
      for (const updatedItem of items) {
        const itemInLog = log.items.find(
          (l) => l.objectId.toString() === updatedItem.objectId,
        );
        if (!itemInLog) {
          throw new NotFoundException(
            apiReturnStrings.form.FAILED_TO_GET_FORM_ITEM_BY_INPUT_ID,
          );
        }

        const itemType = itemInLog.type;

        validateValue();

        itemInLog.value = updatedItem.value;

        function validateValue() {
          const valid =
            (itemType === 'numeric' && typeof updatedItem.value === 'number') ||
            (itemType === 'boolean' && typeof updatedItem.value === 'boolean');
          if (!valid) {
            throw new BadRequestException(
              apiReturnStrings.form.RECEIVED_INVALID_VALUE_TYPE_FOR_LOG_ITEM_UPDATE,
            );
          }
        }
      }
    }
  }

  public async getFormDefinition(definitionId: string): Promise<Form> {
    const user = await this.userService.findByCookie();
    const { forms } = user;
    const definition = forms.find(
      (f) => f.objectId.toString() === definitionId,
    );
    if (!definition) {
      throw new NotFoundException(
        apiReturnStrings.form.FAILED_TO_GET_FORM_BY_INPUT_ID,
      );
    }
    return definition;
  }

  public async updateFormDefinition(
    params: UpdateFormDefinitionParams,
  ): Promise<void> {
    const { definitionId, items, name, isActive } = params;
    const user = await this.userService.findByCookie();
    const { forms } = user;
    const formDefinition = FormService.validateFormDefinitionExists(
      definitionId,
      forms,
    );
    updateFormConfig();
    updateFormItems();
    await this.userService.updateUser(user);

    function updateFormConfig() {
      formDefinition.name = name ? name : formDefinition.name;
      formDefinition.isActive =
        isActive !== undefined ? isActive : formDefinition.isActive;
    }
    function updateFormItems() {
      if (!items) {
        return;
      }
      for (const i of items) {
        const itemInFormDefinition = formDefinition.items.find(
          (fi) => fi.objectId.toString() === i.objectId,
        );
        if (i.delete) {
          formDefinition.items = formDefinition.items.filter(
            (item) => item.objectId.toString() !== i.objectId,
          );
          continue;
        }
        if (!itemInFormDefinition) {
          const {
            defaultValue,
            isDaily,
            numericTarget,
            booleanTarget,
            objectId,
            label,
            type,
          } = i;
          if (
            defaultValue === undefined ||
            isDaily === undefined ||
            objectId === undefined ||
            label === undefined ||
            type === undefined
          ) {
            const errorMessage =
              'Invalid params received for new form item - missing some properties';
            throw new BadRequestException(errorMessage);
          }
          const newItem = new FormItem();
          newItem.type = type;
          if (type === 'boolean') {
            newItem.booleanTarget = booleanTarget;
          }
          if (type === 'numeric') {
            if (
              numericTarget?.amount === undefined ||
              numericTarget.isMinimum === undefined
            ) {
              const errorMessage =
                'Invalid params received for new numeric form item';
              throw new BadRequestException(errorMessage);
            }
            newItem.numericTarget = numericTarget as NumericTarget;
          }
          newItem.defaultValue = defaultValue;
          newItem.value = defaultValue;
          newItem.objectId = new Types.ObjectId(objectId);
          newItem.label = label;
          newItem.isDaily = isDaily;
          formDefinition.items.push(newItem);
          continue;
        }
        const { defaultValue, isDaily, numericTarget, label, booleanTarget } =
          i;
        const { type } = itemInFormDefinition;

        validateItem();
        itemInFormDefinition.isDaily =
          isDaily !== undefined ? isDaily : itemInFormDefinition.isDaily;
        if (itemInFormDefinition.type === 'numeric') {
          itemInFormDefinition.numericTarget = {
            amount:
              numericTarget.amount !== undefined
                ? numericTarget.amount
                : itemInFormDefinition.numericTarget.amount,
            isMinimum:
              numericTarget.isMinimum !== undefined
                ? numericTarget.isMinimum
                : itemInFormDefinition.numericTarget.isMinimum,
          };
        }
        if (itemInFormDefinition.type === 'boolean') {
          itemInFormDefinition.booleanTarget = booleanTarget
            ? booleanTarget
            : itemInFormDefinition.booleanTarget;
        }
        itemInFormDefinition.defaultValue =
          defaultValue !== undefined
            ? defaultValue
            : itemInFormDefinition.defaultValue;
        itemInFormDefinition.label = label ? label : itemInFormDefinition.label;

        function validateItem() {
          if (
            type === 'boolean' &&
            defaultValue !== undefined &&
            typeof defaultValue !== 'boolean'
          ) {
            throw new BadRequestException(
              apiReturnStrings.form.INVALID_FORM_ITEM_DEFINITION_VALUE_FOR_TYPE,
            );
          }
          if (
            type === 'numeric' &&
            defaultValue !== undefined &&
            typeof defaultValue !== 'number'
          ) {
            throw new BadRequestException(
              apiReturnStrings.form.INVALID_FORM_ITEM_DEFINITION_VALUE_FOR_TYPE,
            );
          }
        }
      }
    }
  }

  public static validateFormDefinitionExists(
    formDefinitionId: string,
    forms: Form[],
  ) {
    const formDefinition = forms.find(
      (f) => f.objectId.toString() === formDefinitionId,
    );
    if (!formDefinition) {
      throw new NotFoundException(
        apiReturnStrings.form.FAILED_TO_GET_FORM_BY_INPUT_ID,
      );
    }
    return formDefinition;
  }

  public async deleteFormDefinition(definitionId: string): Promise<void> {
    const user = await this.userService.findByCookie();
    const { forms, formHistory } = user;
    FormService.validateFormDefinitionExists(definitionId, forms);
    validateIsLastForm();
    deleteFormClonesFromHistory();
    deleteFormDefinition();
    await this.userService.updateUser(user);
    function deleteFormDefinition() {
      user.forms = forms.filter((f) => f.objectId.toString() !== definitionId);
    }

    function deleteFormClonesFromHistory() {
      user.formHistory = formHistory.filter(
        (f) => f.definitionId.toString() !== definitionId,
      );
    }
    function validateIsLastForm() {
      const isLastForm = forms.length === 1;
      if (isLastForm) {
        throw new BadRequestException(
          apiReturnStrings.form.DELETE_FORM_ERROR_YOU_MUST_HAVE_ONE_FORM,
        );
      }
    }
  }

  public async createFormDefinition(
    params: CreateFormDefinitionDto,
  ): Promise<string> {
    const user = await this.userService.findByCookie();
    const { items, isActive, name, objectId } = params;
    const form = new Form();
    form.objectId = new Types.ObjectId(objectId);
    form.name = name;
    form.isActive = isActive;
    validateItems();
    form.items = items.map((i) => ({
      ...i,
      value: i.defaultValue,
      objectId: UtilitiesService.objectId(),
    }));

    user.forms.push(form);
    await this.userService.updateUser(user);
    return form.objectId.toString();

    function validateItems() {
      for (const item of items) {
        const { booleanTarget, numericTarget, defaultValue, type } = item;
        let valid = true;
        console.log('DEBUG formService');
        console.log({ booleanTarget, numericTarget, defaultValue, type });
        if (type === 'numeric') {
          valid =
            numericTarget !== undefined && typeof defaultValue === 'number';
        }
        if (type === 'boolean') {
          valid =
            booleanTarget !== undefined && typeof defaultValue === 'boolean';
        }
        if (!valid) {
          throw new BadRequestException(
            apiReturnStrings.form.INVALID_FORM_ITEM_DEFINITION_VALUE_FOR_TYPE,
          );
        }
      }
    }
  }

  public static getFormHistoryByDefinitionId(
    definitionId: string,
    formHistory: FormLog[],
    range?: DateRange,
  ) {
    let logs = formHistory.filter(
      (l) => l.definitionId.toString() === definitionId,
    );
    filter(range);
    return logs;

    function filter(range?: DateRange) {
      if (!range) {
        return;
      }
      const { minDate, maxDate } = range;
      logs = logs.filter((l) =>
        UtilitiesService.isBetweenDates(l.date, minDate, maxDate),
      );
    }
  }
}
