import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Form } from '../mongoose-schemas/form.mongoose-schema';

export class GetAnalyticsForFormRequestBody {
  @IsArray()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  items?: string[]; // referring to the FormDefinitionItems in the FormDefinition. Empty

  @IsDateString()
  minDate: string;
  @IsDateString()
  maxDate: string;
}
export interface AnalyticsFormItem {
  date: string;
  value: number | boolean;
}

export interface GetAnalyticsForFormParams
  extends GetAnalyticsForFormRequestBody {
  formDefinitionId: string;
}

export interface FormAnalytics {
  items: any; // object containing form item names as keys, each includes an array of AnalyticsFormItem
  form: Form; // the form definition
  minDate: string;
  maxDate: string;
}
