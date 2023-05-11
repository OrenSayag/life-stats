### MoneyTransaction

```ts
export interface MoneyTransaction {
	timestamp: string;
	category?: string; // id, find the category from the UserAuthenticData object that is in the access_token
	isRevenue: boolean;
	label: string;
	amount: number;
	objectId: string;
}
```



### PostMoneyTransactionLogRequestBody

```ts
export interface PostMoneyTransactionLogRequestBody {
	isRevenue: boolean;
	label: string;
	amount: number;
	categoryId: string; // objectId
	objectId: string;
	timestamp: string;
}
```
