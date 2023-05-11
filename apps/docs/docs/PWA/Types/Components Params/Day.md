### MoneyTransactionDayLogParams

```ts
export interface MoneyTransactionDayLogParams {
	moneyTransactions: MoneyTransaction[];
	onChange: () => void; // When adding or removing money transactions, modify the state's values
	currency: number;
}
```

### AddMoneyTransactionFormParams

```ts
export interface AddMoneyTransactionFormParams {
	isRevenue: boolean;
	onSubmit: (requestBody: PostMoneyTransactionLogRequestBody) => void;
	onCancel: () => void;
	categories: MoneyTransactionCategory[];
	date: string;
}
```
