Base endpoint: `auth`

## Endpoints

### `/login`

#### `POST`

Logs the user in using social providers (e,g, Google, Facebook)

If the userId from the social provider is registered in the `Users` DB collection, the user is redirected to the application.

Else, the user is created in the DB collection and redirected to the application.

##### Return

`UserAuthenticData`

