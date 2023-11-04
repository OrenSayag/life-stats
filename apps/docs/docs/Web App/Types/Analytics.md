### UseFormAnalyticsDataReturn

```ts
export interface UseFormAnalyticsDataReturn {
	query: UseQueryResult<FormAnalytics>;
	changeDateRange: (dateRange: DateRange | DateRangeSelection) => void;
	selectedDateRangeOption: { value: DateRangeSelection; label: string };
	dateRangeOptions: { value: DateRangeSelection; label: string }[];
	setSelectedDateRangeOption: (option: { value: DateRangeSelection; label: string }) => void;
}
```

### GetAnalyticsForFormRequestBody

```ts
export interface GetAnalyticsForFormRequestBody {
	minDate: string;
	maxDate: string;
}
```

### `FormAnalytics`

```ts
export interface FormAnalytics {
	items: any; // object containing form item names as keys, each includes an array of AnalyticsFormItem
	form: Form; // the form definition
	minDate: string;
	maxDate: string;
}
```
