import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateNoteRequestBodyDto,
  GetNoteHistoryParams,
  PatchNoteRequestBody,
} from '../../types/note.type';
import { UsersService } from '../user/users.service';
import { Note } from '../../mongoose-schemas/note.mongoose-schema';
import { Note as INote } from 'shared-types/shared.type';
import { Types } from 'mongoose';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import { UtilitiesService } from '../utilities/utilities.service';

@Injectable()
export class NoteService {
  constructor(private readonly userService: UsersService) {}

  public async createNote(params: CreateNoteRequestBodyDto): Promise<string> {
    const { title, objectId, rtl, date, content } = params;
    const user = await this.userService.findByCookie();
    const note = new Note();
    note.content = content;
    note.title = title;
    note.objectId = new Types.ObjectId(objectId);
    note.rtl = rtl;
    note.date = date;
    const now = new Date();
    note.createdAt = now;
    note.updatedAt = now;
    user.notes.push(note);
    await this.userService.updateUser(user);
    return note.objectId.toString();
  }

  private validateNoteExists(id: string, notes: Note[]) {
    const note = notes.find((t) => t.objectId.toString() === id);
    if (!note) {
      throw new NotFoundException(apiReturnStrings.notes.NOTE_NOT_FOUND);
    }
    return note;
  }

  public async updateNote(
    params: PatchNoteRequestBody,
    id: string,
  ): Promise<void> {
    const { rtl, content, title } = params;
    const user = await this.userService.findByCookie();
    const { notes } = user;
    const note = this.validateNoteExists(id, notes);
    note.rtl = rtl;
    note.content = content;
    note.title = title;
    note.updatedAt = new Date();
    await this.userService.updateUser(user);
  }

  public async deleteNote(id: string): Promise<void> {
    const user = await this.userService.findByCookie();
    user.notes = user.notes.filter((t) => t.objectId.toString() !== id);
    await this.userService.updateUser(user);
  }

  public async getHistory(params: GetNoteHistoryParams): Promise<INote[]> {
    const { toDate, fromDate } = params;
    const user = await this.userService.findByCookie();
    const notes = user.notes.filter((n) =>
      UtilitiesService.isBetweenDates(n.date, fromDate, toDate),
    );

    return notes.map((n) => ({
      date: n.date,
      creationTime: n.createdAt.toISOString(),
      objectId: n.objectId.toString(),
      title: n.title,
      content: n.content,
      rtl: n.rtl,
    }));
  }
}
