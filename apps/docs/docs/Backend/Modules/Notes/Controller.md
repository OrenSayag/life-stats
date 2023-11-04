Base: `note`

## Endpoints

### `/:id`

#### `PATCH`

Update the note data.

##### Return

`APIResponseBodyBase` (no `data`)

#### `DELETE`

Deletes the note.

##### Return

`APIResponseBodyBase` (no `data`)

### `/`

#### `POST`

Creates a new `Note`.

##### Request Body

`CreateNoteRequestBodyDto`

##### Return

`APIResponseBodyBase`, `data` contains `objectId`

