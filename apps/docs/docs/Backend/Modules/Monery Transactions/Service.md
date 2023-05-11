## Public Methods

### getHistory

Gets money transaction history.

#### Params

`GetMoneyTransactionHistoryDto`

#### Return

`MoneyTransactionHistory`

### createMoneyTransaction

Creates a money transaction.

#### Params

`CreateMoneyTransactionRequestBody`

#### Return

`moneyTransactionId: string`

### updateMoneyTransaction

Updates a money transaction.

#### Params

`PatchMoneyTransactionRequestBody`

#### Return

`Promise<void>`

### createMoneyTransactionCategory

Creates a money transaction category.

#### Params

`CreateMoneyTransactionCategoryRequestBody`

#### Return

_The money transaction category ID_

`Promise<string>`

### updateMoneyTransactionCategory

Updates a money transaction category.

#### Params

`UpdateMoneyCategoryParams`

#### Return

`Promise<void>`

### deleteMoneyTransactionCategory

Deletes a money transaction category.

Deletes the `category` value of any of the money transaction logs containing this ID.

#### Params

`moneyTransactionCategoryId: string`

#### Return

`Promise<void>`
