### DisplayMobileNavbarControl

```ts
export interface DisplayMobileNavbarControl {
	displayMobileNavbar: boolean;
	toggleMobileNavbar?: () => void;
}
```

### DateFormat

```ts
export type DateFormat = 'israel' | 'computer';
```

### AppContext

```ts
export interface AppContext {
	formDefinitions?: Form[];
	settings?: UserSettings;
}
```

### DateRangeSelection

```ts
export enum DateRangeSelection {
	THIS_MONTH = 1,
	LAST_MONTH = 2,
	LAST_3_MONTHS = 3,
	LAST_6_MONTHS = 4,
	LAST_YEAR = 5,
	CUSTOM = 6,
}
```
