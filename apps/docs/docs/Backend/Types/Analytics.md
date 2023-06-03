## Interfaces

### `GetAnalyticsForFormRequestBody`

```ts
export class GetAnalyticsForFormRequestBody {
	minDate: string;
	maxDate: string;
}
```

### `AnalyticsFormItem`

```ts
export interface AnalyticsFormItem {
	date: string;
	value: number | boolean;
}
```

### `GetAnalyticsForFormParams`

```ts
export interface GetAnalyticsForFormParams extends GetAnalyticsForFormRequestBody {
	formDefinitionId: string;
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