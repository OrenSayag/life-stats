The DB software is MongoDB.

## Documents

### UserReportsSettings

#### Schema

| name     | type         | default value | usage | is optional |
| -------- | ------------ | ------------- | ----- | ----------- |
| mailTo   | `string[]`   |
| interval | `number`     |
| forms    | `ObjectId[]` |

### UserNotesSettings

#### Schema

| name                | type      | default value | usage | is optional |
| ------------------- | --------- | ------------- | ----- | ----------- |
| rtlDefaultDirection | `boolean` | `false`       |
| passcode            | `string`  |               |       | Y           |

#### Interval Mapping

| index | meaning |
| ----- | ------- |
| 1     | weekly  |
| 2     | monthly |

### UserFinanceSettings

#### Schema

| name     | type     | default value | usage | is optional |
| -------- | -------- | ------------- | ----- | ----------- |
| currency | `number` | 0             |

#### Currency Mapping

| index | meaning |
| ----- | ------- |
| 0     | ILS     |
| 1     | USD     |
| 2     | EUR     |

### UserSettings

#### Schema

| name    | type                  | default value | usage | is optional |
| ------- | --------------------- | ------------- | ----- | ----------- |
| reports | `UserReportsSettings` |
| finance | `UserFinanceSettings` |
| notes   | `UserNotesSettings`   |

### User

#### Schema

| name                       | type                         | default value | usage | is optional |
| -------------------------- | ---------------------------- | ------------- | ----- | ----------- |
| provider                   | `'google'`                   |
| providerId                 | `string`                     |
| name                       | `string`                     |
| profilePicUrl              | `string`                     |               |       | Y           |
| mail                       | `string`                     |               |       | Y           |
| phone                      | `string`                     |               |       | Y           |
| forms                      | `Form[]`                     |               |       |             |
| formHistory                | `FormLog[]`                  |               |       |             |
| moneyTransactions          | `MoneyTransaction[]`         |               |       |             |
| notes                      | `Note[]`                     |               |       |             |
| moneyTransactionCategories | `MoneyTransactionCategory[]` |               |       |             |
| settings                   | `UserSettings`               |               |       |             |
| defaultForm                | `ObjectId`                   |               |       |             |

### FormLog

_Extends Form_

#### Schema

| name         | type       | default value | usage | is optional |
| ------------ | ---------- | ------------- | ----- | ----------- |
| date         | `string`   |               |       |             |
| isPerfect    | `boolean`  |               |       |             |
| definitionId | `ObjectId` |               |       |             |

### FormItem

#### Schema

| name          | type                                   | default value | usage                                                           | is optional |
| ------------- | -------------------------------------- | ------------- | --------------------------------------------------------------- | ----------- |
| value         | `boolean OR number`                    |               |                                                                 |             |
| defaultValue  | `boolean OR number`                    |               |                                                                 |             |
| label         | `string`                               |               |                                                                 |             |
| type          | `'boolean' OR 'numeric'`               |               |                                                                 |             |
| isDaily       | `boolean`                              |               |                                                                 |             |
| numericTarget | `{amount: number, isMinimum: boolean}` |               | e.g. minimum 5, will be success when the value for the day >= 5 | Y           |
| booleanTarget | `boolean`                              |               | e.g. if `true` and daily value is `false`, this is not success  | Y           |
| objectId      | `ObjectId`                             |

### Form

Form.

#### Schema

| name     | type         | default value | usage | is optional |
| -------- | ------------ | ------------- | ----- | ----------- |
| name     | `string`     |               |       |             |
| items    | `FormItem[]` |               |       |             |
| isActive | `boolean`    |               |       |             |
| objectId | `ObjectId`   |

### MoneyTransaction

#### Schema

| name      | type       | default value      | usage                                          | is optional |
| --------- | ---------- | ------------------ | ---------------------------------------------- | ----------- |
| timestamp | `string`   | Automatic datetime |                                                |             |
| category  | `ObjectID` |                    | Found within user's MoneyTransactionCategories | Y           |
| isRevenue | `boolean`  |                    | If `false`, this is an expense                 |             |
| label     | `string`   |                    |                                                |             |
| amount    | `number`   |                    |                                                |             |
| objectId  | `ObjectId` |

### Note

#### Schema

| name      | type       | default value | usage | is optional |
| --------- | ---------- | ------------- | ----- | ----------- |
| objectId  | `ObjectId` |
| updatedAt | `string`   | Automatic     |
| createdAt | `string`   | Automatic     |       |             |
| title     | `string`   |
| content   | `string`   |               |       | Y           |
| rtl       | `boolean`  |               |       |             |

### MoneyTransactionCategory

_When the user deletes a category, all moneyTransactions with this category must remove their category_

#### Schema

| name     | type       | default value | usage | is optional |
| -------- | ---------- | ------------- | ----- | ----------- |
| name     | `string`   |               |       |             |
| objectId | `ObjectId` |

## Collections

### Users
