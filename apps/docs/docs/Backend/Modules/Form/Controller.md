Base: `form`

## Endpoints

### `:definitionId/state`

#### `PATCH`

Update the form's state.

The property `isPerfect`

##### Request Body

`PatchFormStateRequestBodyDto`

##### Return

`APIResponseBodyBase` (no `data`)

### `/:formDefinitionId`

#### `GET`

Gets the log's definition.

##### Return

`APIResponseBodyBase`, `data` contains `Form`

#### `PATCH`

Updates the form's definition.

##### RequestBody

`PatchFormDefinitionRequestBodyDto`

#### `DELETE`

Deletes the form's definition. Deletes all logs of this definition.
If the form definition is the last, error: must have at least one form.
If the formId was the user's default form, the default form ID is updated to be the first in the user.forms array.

##### Return

`APIResponseBodyBase`

### `/`

#### `POST`

Creates a new form definition.

##### RequestBody

`CreateFormDefinitionDto`

##### Return

`APIResponseBodyBase` with `data` containing `formDefinitionId`
de