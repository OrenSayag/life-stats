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

### UseMoneyTransactionsReturn

```ts
export interface UseMoneyTransactionsReturn {
	isLoading: boolean;
	isError: boolean;
	moneyTransactionsByCategory: MoneyTransactionsByCategory;
	moneyTransactionsByDate: MoneyTransactionsByDate;
	changeDateRange: (dateRange: DateRange | DateRangeSelection) => void;
	selectedDateRangeOption: { value: DateRangeSelection; label: string };
	dateRangeOptions: { value: DateRangeSelection; label: string }[];
	setSelectedDateRangeOption: (option: { value: DateRangeSelection; label: string }) => void;
}
```

### GetMoneyTransactionHistoryRequestBody

```ts
export interface GetMoneyTransactionHistoryRequestBody {
	minDate: string;
	maxDate: string;
}
```
