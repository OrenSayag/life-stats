### FormDefinitionIdParamDto

```ts
export class FormDefinitionIdParamDto {
	definitionId: string; // id of the form definition
}
```

### PatchFormStateRequestBodyDto

```ts
export class PatchFormStateRequestBodyDto {
	items: FormItem[];
	date: string;
}
```

### GetFormLogByDateParams

```ts
export interface GetFormLogByDateParams {
	items: FormItem[];
	date: string;
	definitionId: string; // id of the form definition
}
```

### UpdateFormLogParams

```ts
export interface UpdateFormLogParams {
	items: FormItem[];
	logId: string;
}
```

### FormItemNumericTargetDto

```ts
export class FormItemNumericTargetDto {
	amount?: number;
	isMinimum?: boolean;
}
```

### FormDefinitionItemDto

```ts
export class FormDefinitionItemDto {
	defaultValue?: boolean | number;
	label?: string;
	isDaily?: boolean;
	numericTarget?: FormItemNumericTargetDto;
	booleanTarget?: boolean;
	objectId: string;
}
```

### PatchFormDefinitionRequestBodyDto

```ts
export class PatchFormDefinitionRequestBodyDto {
	name?: string;
	items?: FormDefinitionItemDto;
	isActive?: boolean;
}
```

### UpdateFormDefinitionParams

```ts
export interface UpdateFormDefinitionParams extends PatchFormDefinitionRequestBodyDto {
	definitionId: string;
}
```

### FormDefinitionItemNumericTargetDto

```ts
export class FormDefinitionItemNumericTargetDto {
	amount: number;
	isMinimum: boolean;
}
```

### CreateFormDItemDefinitionDto

```ts
export class CreateFormDItemDefinitionDto {
	defaultValue: boolean | number;
	label: string;
	isDaily: boolean;
	numericTarget: FormItemNumericTargetDto;
	booleanTarget: boolean;
}
```

### CreateFormDefinitionDto

```ts
export class CreateFormDefinitionDto {
	name: string;
	items: CreateFormItemDefinitionDto[];
	isActive: boolean = true;
}
```