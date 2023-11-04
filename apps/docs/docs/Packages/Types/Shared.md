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
	notes: NotesUserSettings;
}
```

### NotesUserSettings

```ts
export interface NotesUserSettings { 
	rtlDefaultDirection: boolean;
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

### MoneyTransaction

```ts
export interface MoneyTransaction {
	timestamp: string;
	category?: string; // id, find the category from the UserData param (retrieved in getserversideprops of the page)
	isRevenue: boolean;
	label: string;
	amount: number;
	objectId: string;
}
```

### Note

```ts
export interface Note {
	objectId: string;
	date: string;
	creationTime: string;
	title: string;
	content?: string;
	rtl: boolean;
}
```

### MoneyTransactionsByCategory

```ts
export interface MoneyTransactionsByCategory {
	[categoryId: string]: MoneyTransaction[];
	uncategorized: MoneyTransaction[];
}
```

### MoneyTransactionsByDate

```ts
export interface MoneyTransactionsByDate {
	[date: string]: MoneyTransaction[];
}
```

### CalendarDate

```ts
export interface CalendarDate {
	isPerfectDay: boolean;
	date: string;
}
```
