### NumericTarget

```ts
export interface NumericTarget {
	amount: number;
	isMinimum: boolean;
}
```

### FormItem

```ts
export interface FormItem {
	isDaily: boolean;
	label: string;
	type: 'numeric' | 'boolean';
	numericTarget?: NumericTarget;
	booleanTarget?: boolean;
	defaultValue: number | boolean;
	objectId: string;
	value: number | boolean;
}
```


### PatchFormStateItem

```ts
export interface PatchFormStateItem {
	objectId: string;
	value: number | boolean;
}
```

### PatchFormStateRequestBody

```ts
export interface PatchFormStateRequestBody {
	items: PatchFormStateItem[];
	date: string;
}
```

### PatchFormDefinitionRequestBody

```ts
export interface PatchFormDefinitionRequestBody {
	name?: string;
	items?: {
		defaultValue?: number | boolean;
		label?: string;
		isDaily?: boolean;
		numericTarget?: NumericTarget;
		booleanTarget?: boolean;
		objectId: string;
	}[];
	isActive?: boolean;
	formDefinitionId: string;
}
```