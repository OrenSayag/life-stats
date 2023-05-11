## Interfaces

### `CreateMoneyTransactionRequestBody`

```ts
export class CreateMoneyTransactionRequestBody {
	categoryId?: string;
	isRevenue: boolean;
	label: string;
	amount: number;
	objectId: string;
	timestamp: string;
}
```

### `PatchMoneyTransactionRequestBody`

```ts
export class PatchMoneyTransactionRequestBody {
	categoryId?: string;
	isRevenue?: boolean;
	label?: string;
	amount?: number;
}
```

### `UpdateMoneyTransactionParams`

```ts
export class UpdateMoneyTransactionParams extends PatchMoneyTransactionRequestBody {
	moneyTransactionId: string;
}
```

### `GetMoneyTransactionHistoryDto`

```ts
export interface GetMoneyTransactionHistoryDto {
	moneyCategories?: string[]; // objectId of the category
	minDate?: string;
	maxDate?: string;
}
```

### `MoneyTransactionHistory`

```ts
export interface MoneyTransactionHistory {
	moneyCategories: any; // object containing form item names as keys, each includes an array of MoneyTransaction
}
```

### `PatchMoneyCategoryRequestBody`

```ts
export class PatchMoneyCategoryRequestBody {
	name?: string;
}
```

### `UpdateMoneyCategoryParams`

```ts
export class UpdateMoneyCategoryParams extends PatchMoneyCategoryRequestBody {
	moneyTransactionCategoryId: string;
}
```

### `CreateMoneyTransactionCategoryRequestBody`

```ts
export class CreateMoneyTransactionCategoryRequestBody {
	name: string;
}
```

### `MoneyCategoryIdParamDto`

```ts
export class MoneyCategoryIdParamDto {
	@IsString()
	moneyTransactionCategoryId: string;
}
```
