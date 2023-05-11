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

### FormParams

```ts
export interface FormParams {
	form: FormLog;
}
```

### FormItemContainerParams

```ts
export interface FormItemContainerParams {
	formItem: FormItem;
	targetMode: boolean;
	onChange: () => void;
}
```
