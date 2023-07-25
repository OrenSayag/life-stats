### UseReportReturn

```ts
export interface UseReportReturn {
	monthLabel: string;
	onSwitchMonth: (increment: boolean) => void;
	query: UseQueryResult<Report>;
}
```

### GetReportRequestBody

```ts
export interface GetReportRequestBody {
	minDate: string;
	maxDate: string;
	formId: string;
}
```

### ReportFormStateItem

```ts
export interface ReportFormItem {
	value: {
		success: number;
		total: number;
	};
	isDaily: boolean;
	label: string;
}
```

### Report

```ts
export interface Report {
	creationTimestamp: string;
	formName: string;
	formItems: {
		[formItemId: string]: ReportFormItem;
	};
}
```
