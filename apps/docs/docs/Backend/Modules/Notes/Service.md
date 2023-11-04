## Public Methods

### createNote

Creates a Note.

#### Params

`CreateNoteRequestBody`

#### Return

`noteId: string`

### updateNote

Updates a Note.

#### Params

`{ data:PatchNoteRequestBody, id: string }`

#### Return

`Promise<void>`

### deleteNote

Deletes a Note.

#### Params

`id: string`

#### Return

`Promise<void>`


### getHistory

#### Params

`GetNoteHistoryParams`

#### Return

`Promise<Note[]>`