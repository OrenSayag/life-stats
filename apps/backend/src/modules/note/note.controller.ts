import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { AppAPIResponseBodyBase } from '../../types/app.type';
import {
  CreateNoteRequestBodyDto,
  NoteIdParamDto,
  PatchNoteRequestBody,
} from '../../types/note.type';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('note')
@UseGuards(AuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('')
  async createNote(
    @Body() body: CreateNoteRequestBodyDto,
  ): Promise<AppAPIResponseBodyBase> {
    const noteId = await this.noteService.createNote(body);
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.notes.SUCCESSFULLY_CREATED_NOTE,
      { noteId },
    );
  }

  @Patch(':noteId')
  async updateNote(
    @Param() params: NoteIdParamDto,
    @Body() body: PatchNoteRequestBody,
  ): Promise<AppAPIResponseBodyBase> {
    await this.noteService.updateNote(body, params.noteId);
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.notes.SUCCESSFULLY_UPDATED_NOTE,
    );
  }
  @Delete(':noteId')
  async deleteNote(
    @Param() params: NoteIdParamDto,
  ): Promise<AppAPIResponseBodyBase> {
    await this.noteService.deleteNote(params.noteId);
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.notes.SUCCESSFULLY_DELETED_NOTE,
    );
  }
}
