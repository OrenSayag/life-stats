import { UtilitiesService } from '../modules/utilities/utilities.service';
import { IsDate, IsDateString, IsString } from 'class-validator';

export class AppAPIResponseBodyBase {
  timestamp: string;

  constructor(
    public success: boolean,
    public message: string,
    public data: any = {},
    public httpStatus: number = 200,
  ) {
    this.timestamp = UtilitiesService.timestamp();
  }
}


export class DateRangeQueryParams {
  @IsDateString()
  minDate: string;
  @IsDateString()
  maxDate: string;
}
