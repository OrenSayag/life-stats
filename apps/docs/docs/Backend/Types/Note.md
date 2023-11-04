### `CreateNoteRequestBodyDto`

```ts
export class CreateNoteRequestBodyDto {
	objectId: string;
	date: string;
	title: string;
	content?: string;
	rtl: boolean;
}
```

### `PatchNoteRequestBody`

```ts
export class PatchNoteRequestBody {
	title: string;
	content?: string;
	rtl: boolean;
}
```

### `NoteIdParamDto`

```ts
export class NoteIdParamDto {
  @IsString()
  noteId: string;
}
```

### `GetNoteHistoryParams`

```ts
export interface GetNoteHistoryParams {
	fromDate: string;
	toDate: string;
}
```