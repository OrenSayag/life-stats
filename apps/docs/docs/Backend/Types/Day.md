## Interfaces

### UserFormMeta

```ts
export interface UserFormMeta {
	objectId: string;
	label: string;
	isDefaultForm: boolean;
}
```

### UserBaseData

```ts
export interface UserBaseData {
	forms: UserFormMeta;
}
```

### FormState

```ts
export interface FormState extends UserFormMeta {
	formItems: FormItem[];
}
```

### FormLogs

```ts
export interface FormLogs {
	[logId: string]: Form;
}
```

### DayViewDateData

```ts
export interface DayViewDateData {
	forms: FormLogs;
	moneyTransactions: MoneyTransaction[];
}
```
