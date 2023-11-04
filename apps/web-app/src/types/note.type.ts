export interface CreateNoteRequestBody {
  objectId: string;
  date: string;
  title: string;
  content?: string;
  rtl: boolean;
}

export interface UpdateNoteRequestBody {
  title?: string;
  rtl?: boolean;
  content?: string;
}
