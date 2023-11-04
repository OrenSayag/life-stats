### FormItemControlParams

```ts
export interface FormItemControlParams {
	isTargetDisplay: boolean; // when true, value-modification buttons are hidden.
}
```

### NumericFormItemControlParams

```ts
export interface NumericFormItemControlParams extends FormItemControlParams {
	value: number;
	onChange: (increment: boolean) => void;
}
```

### BooleanFormItemControlParams

```ts
export interface BooleanFormItemControlParams extends FormItemControlParams {
	value: boolean;
	onChange: () => void;
}
```

### FormModificationModeOptions

```ts
export interface FormModificationModeOptions {
	formDefinitionId: string;
	k;
}
```

### FormParams

```ts
export interface FormParams {
	form: FormLog;
	modificationMode?: FormModificationModeOptions; // when provided, the component displays input boxes which provide the ability to modify the form
}
```

### FormItemContainerParams

```ts
export interface FormItemContainerParams {
	formItem: FormItem;
	targetMode: boolean;
	onChange: () => void;
	isCurrentSelectedTask?: boolean;
	onClick: () => void;
}
```
