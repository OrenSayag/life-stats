## Public Methods

### `static login`

Calls the backend login endpoint of the relevant social provider.

#### Params

`SocialProviderLoginType`

#### Return

`Promise<void>`

### `static logout`

Removes the `access_token` cookie and redirects to login view.

#### Return

`Promise<void>`