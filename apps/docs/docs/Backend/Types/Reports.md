### GetReportRequestBody

```ts
export interface GetReportRequestBody {
	minDate: string;
	maxDate: string;
	formId: string; // objectId
}
```

### ReportFormStateItem

```ts
export class ReportFormItem {
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
export class Report {
	creationTimestamp: string;
	formName: string;
	formItems: {
		[formItemId: string]: ReportFormItem;
	};
}
```
