import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import {
  CreateFormDefinitionDto,
  FormDefinitionIdParamDto,
  PatchFormDefinitionRequestBodyDto,
  PatchFormStateRequestBodyDto,
} from '../../types/form.type';
import { AppAPIResponseBodyBase } from '../../types/app.type';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import { FormService } from './form.service';

@Controller('form')
@UseGuards(AuthGuard)
export class FormController {
  constructor(private readonly formService: FormService) {}
  @Patch(':formDefinitionId/state')
  async updateFormState(
    @Param() params: FormDefinitionIdParamDto,
    @Body() body: PatchFormStateRequestBodyDto,
  ): Promise<AppAPIResponseBodyBase> {
    const { formDefinitionId } = params;
    const { items, date } = body;
    const log = await this.formService.getLogByDate({
      date,
      definitionId: formDefinitionId,
    });
    await this.formService.updateFormLogItemValues({
      log,
      items,
    });
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.form.PATCH_FORM_STATE_SUCCESS +
        ' ' +
        log.objectId.toString() +
        ' for date ' +
        date,
    );
  }

  @Get(':formDefinitionId')
  async getFormDefinition(
    @Param() params: FormDefinitionIdParamDto,
  ): Promise<AppAPIResponseBodyBase> {
    const { formDefinitionId } = params;
    const definition = await this.formService.getFormDefinition(
      formDefinitionId,
    );
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.form.SUCCESSFULLY_GOT_FORM_DEFINITION,
      definition,
    );
  }
  @Patch(':formDefinitionId')
  async updateFormDefinition(
    @Param() params: FormDefinitionIdParamDto,
    @Body() body: PatchFormDefinitionRequestBodyDto,
  ): Promise<AppAPIResponseBodyBase> {
    const { items, name, isActive } = body;
    const { formDefinitionId } = params;
    await this.formService.updateFormDefinition({
      name,
      definitionId: formDefinitionId,
      items,
      isActive,
    });
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.form.SUCCESSFULLY_UPDATED_FORM_DEFINITION,
    );
  }
  @Delete(':formDefinitionId')
  async deleteFormDefinition(
    @Param() params: FormDefinitionIdParamDto,
  ): Promise<AppAPIResponseBodyBase> {
    const { formDefinitionId } = params;
    await this.formService.deleteFormDefinition(formDefinitionId);
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.form.SUCCESSFULLY_DELETED_FORM_DEFINITION_AND_LOGS,
    );
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createFormDefinition(
    @Body() body: CreateFormDefinitionDto,
  ): Promise<AppAPIResponseBodyBase> {
    const formDefinitionId = await this.formService.createFormDefinition(body);
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.form.SUCCESSFULLY_CREATED_FORM_DEFINITION,
      { formDefinitionId },
      HttpStatus.CREATED,
    );
  }
}
