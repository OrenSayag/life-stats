### SelectParams

```ts
export interface SelectParams {
	selectedOption: { value: any; label: string } | { value: any; label: string }[];
	label: string;
	onChange: (event: SelectChangeEvent) => void;
	options: { value: any; label: string }[];
	labelId: string;
	className?: string;
	multiple?: boolean;
	native?: boolean;
}
```

### DateRangeSelectorParams

```ts
export interface DateRangeSelectorParams {
	selectedDateRangeOption: { value: DateRangeSelection; label: string };
	dateRangeOptions: { value: DateRangeSelection; label: string }[];
	setSelectedDateRangeOption: (option: { value: DateRangeSelection; label: string }) => void;
	selectInputLabel: string;
	selectInputLabelId: string;
}
```

### LayoutParams

```ts
export interface LayoutParams {
	profilePicUrl: string;
}
```

### HeaderBarParams

```ts
export interface HeaderBarParams {
	profilePicUrl: string;
	toggleDisplayMobileNavbar: () => void; // For the burger
	isBurgerOpen: boolean;
}
```

### BurgerParams

```ts
export interface BurgerParams {
	toggleDisplayMobileNavbar: () => void; // For the burger
	isOpen: boolean;
}
```

### UserAvatarParams

```ts
export interface UserAvatarParams {
	profilePicUrl: string;
}
```

### AppLogoParams

```ts
export interface AppLogoParams {
	dimensions?: Dimensions;
}
```

### NavBarPageLinkParams

```ts
export interface NavBarPageLinkParams {
	pageName: string;
}
```

### DayNavigatorParams

```ts
export interface DayNavigatorParams {
	date: string;
	onChange: (next: boolean) => void;
}
```

### CardParams

```ts
export interface CardParams {
	children: ReactNode;
	className?: string;
}
```

### DividerParams

```ts
export interface DividerParams {
	className?: string;
}
```

### SubmitButtonParams

```ts
export interface SubmitButtonParams {
	onClick: () => void;
	className?: string;
	dimensions?: Dimensions;
	fill?: string;
}
```

### InputLabelType

```ts
export enum InputLabelType {
	SELECT = 'select',
	TEXT = 'text',
	BOOLEAN = 'boolean',
	NUMBER = 'number',
}
```

### InputLabelParams

```ts
export type InputLabelParams = {
	onInputChange: (value: any) => void;
	className?: string;
	value: number | boolean | string | { label: string; value: string }[];
	widthByValue?: boolean;
} & (
	| { type: InputLabelType.TEXT; value: string }
	| { type: InputLabelType.NUMBER; value: number }
	| { type: InputLabelType.BOOLEAN; value: boolean }
	| { type: InputLabelType.SELECT; value: { label: string; value: string }[] }
);
```

### ChartParams

```ts
export interface ChartParams {
	data: { key: string; value: number }[];
	renderLabel?: (item: { key: string; value: number }) => string;
	className?: string;
}
```
