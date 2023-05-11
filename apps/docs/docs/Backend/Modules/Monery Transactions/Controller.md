Base: `money-transactions`

## Endpoints

### `/:id`

#### `PATCH`

Update the transaction data.

##### Return

`APIResponseBodyBase` (no `data`)

#### `DELETE`

Deletes the transaction.

##### Return

`APIResponseBodyBase` (no `data`)

### `/`

#### `POST`

Creates a new `MoneyTransaction`.

##### Request Body

`CreateMoneyTransactionRequestBodyDto`

##### Return

`APIResponseBodyBase`, `data` contains `objectId`

### `/category`

#### `POST`

Creates a new money transaction category.

##### Request Body

`CreateMoneyTransactionCategoryRequestBody`

##### Return

`moneyTransactionCategoryId: string`

### `/category/:id`

#### `PATCH`

Updates the money transaction category.

##### Request Body

`PatchMoneyCategoryRequestBody`

##### Return

`Promise<void>`

#### `DELETE`

Deletes the money transaction category.
Remove the `category` property for all `moneyTransactions` with this category ID.

##### Return

`Promise<void>`

### `/get-history`

#### `POST`

Gets history of money transactions by request body filter.

##### Request Body

`GetMoneyTransactionHistoryDto`

##### Return

`APIResponseBodyBase` containing `MoneyTransactionHistory` in `data` property
