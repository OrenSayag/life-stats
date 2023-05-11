## Interfaces

### `GetAnalyticsForFormRequestBody`

```ts
export class GetAnalyticsForFormRequestBody {
	items: ObjectId[]; // referring to the FormDefinitionItems in the FormDefinition. Empty
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

### `FormAnalytics`

```ts
export interface GetAnalyticsForFormResponseBody {
	items: any; // object containing form item names as keys, each includes an array of AnalyticsFormItem
	form: Form; // the form definition
	minDate: string;
	maxDate: string;
}
```

### `GetAnalyticsForFormParams`

```ts
export interface GetAnalyticsForFormParams extends GetAnalyticsForFormRequestBody {
	formDefinitionId: string;
}
```
