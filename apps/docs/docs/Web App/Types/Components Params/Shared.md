### PreviousNextButtonParams

```ts
export interface PreviousNextButtonParams {
	onClick: () => void;
}
```

### ViewModeToggleParams

```ts
export interface ViewModeToggleParams {
	label1: string;
	label2: string;
	onChange: (label: string) => void;
}
```

### MoneyTransactionLogItemParams

```ts
export interface MoneyTransactionLogItemParams {
	moneyTransaction: MoneyTransaction;
	onDelete: () => void;
	currency: number;
}
```
