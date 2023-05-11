Base: `user`

## Endpoints

### `/settings`

#### PATCH

Updates the user settings.

#### Request Body

`UserSettingsDto`

#### Return

`APIResponseBodyBase` with empty `data` property

### `/data`

#### GET

Executes `UserService.getUserData`

#### Return

`APIResponseBodyBase` with empty `data` property
