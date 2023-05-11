## Interfaces

### UserData

```ts
export interface UserData {
	formDefinitions: Form[];
	moneyTransactionCategories: MoneyTransactionCategory[];
	settings: UserSettings;
	profilePicUrl: string;
	name: string;
}
```

### GetUserDataResponseBody

```ts
export interface GetUserDataResponseBody extends APIResponseBodyBase {
	data: UserData;
}
```

### APIResponseBodyBase

```ts
export interface AppAPIResponseBodyBase {
	success: boolean;
	message: string;
	httpStatus: number;
	timestamp: string;
	data?: any;
}
```

### DateRange

```ts
export interface DateRange {
	minDate: string;
	maxDate: string;
}
```

### Form

```ts
export interface Form {
	name: string;

	items: FormItem[];
	isActive: boolean;

	objectId: string;
}
```

-- ALIGNED ---

### FormLog

```ts
export interface FormLog {
	name: string;
	objectId: string;
	items: FormItem[];
	isActive: boolean;
	date: string;
	isPerfect: boolean;
	definitionId: string;
}
```

### MoneyTransactionCategory

```ts
export interface MoneyTransactionCategory {
	name: string;
	objectId: string;
}
```

### UserSettings

```ts
export class UserSettings {
	reports: ReportsUserSettings;
	finance: FinanceUserSettings;
}
```

### ReportsUserSettings

```ts
export class ReportsUserSettings {
	mailTo: string[];
	interval: number;
	forms: string[];
}
```

### FinanceUserSettings

```ts
export class FinanceUserSettings {
	currency: number;
}
```

### UserAuthenticData

```ts
export interface UserAuthenticData {
	name: string;
	profilePicUrl: string;
	providerId: string;
}
```
