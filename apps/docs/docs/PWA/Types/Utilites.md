### Dimensions

```ts
export interface Dimensions {
	width: number;
	height: number;
}
```

### UseDateRangeSelectionReturn

```ts
export interface UseDateRangeSelectionReturn {
	dateRange: DateRange;
	changeDateRange: (dateRange: DateRange | DateRangeSelection) => void;
	selectedDateRangeOption: { value: DateRangeSelection; label: string };
	dateRangeOptions: { value: DateRangeSelection; label: string }[];
	setSelectedDateRangeOption: (option: { value: DateRangeSelection; label: string }) => void;
}
```
