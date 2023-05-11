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
