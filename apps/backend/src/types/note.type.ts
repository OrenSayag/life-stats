import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateNoteRequestBodyDto {
  @IsString()
  objectId: string;

  @IsDateString()
  date: string;
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  content?: string;
  @IsBoolean()
  rtl: boolean;
}
export class PatchNoteRequestBody {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  rtl: boolean;
}

export class NoteIdParamDto {
  @IsString()
  noteId: string;
}

export interface GetNoteHistoryParams {
  fromDate: string;
  toDate: string;
}
