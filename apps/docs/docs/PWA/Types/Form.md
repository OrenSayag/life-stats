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
		delete?: string;
	}[];
	isActive?: boolean;
	formDefinitionId: string;
}
```

### UseFormDefinitionsReturn

```ts
export interface UseFormDefinitionsReturn {
	updateFormDefinitionMutation?: UseMutationResult;
	createFormDefinitionMutation?: UseMutationResult;
	deleteFormDefinitionMutation?: UseMutationResult;
	formDefinitions: Form[];
	getFormDefinition?: (definitionId: string) => Form;
	init: (formDefinitions: Form[]) => void;
}
```

### CreateFormDefinitionRequestBody

```ts
export interface CreateFormDefinitionRequestBody {
	name: string;
	items: {
		defaultValue: number | boolean;
		label: string;
		isDaily: boolean;
		numericTarget: NumericTarget;
		booleanTarget: boolean;
		objectId: string;
	}[];
	isActive: boolean;
	objectId: string;
}
```
