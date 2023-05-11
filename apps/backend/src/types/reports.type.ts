import { IsDateString, IsString } from 'class-validator';

export class GetReportRequestBody {
  @IsDateString()
  minDate: string;
  @IsDateString()
  maxDate: string;
  @IsString()
  formId: string;
}
export class ReportFormItem {
  value: {
    success: number;
    total: number;
  };
  isDaily: boolean;
  label: string;

  constructor() {
    this.value = {
      success: 0,
      total: 0,
    };
  }
}
export interface Report {
  creationTimestamp: string;
  formName: string;
  formItems: any;
}
