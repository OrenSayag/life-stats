## Interfaces

### UserFormMeta

```ts
export interface FormDefinition {
	objectId: string;
	label: string;
	isDefaultForm: boolean;
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

### ReportsUserSettingsDto

```ts
export class ReportsUserSettingsDto {
	mailTo: string[];
	interval: number;
	forms: string[];
}
```

### FinanceUserSettingsDto

```ts
export class FinanceUserSettingsDto {
	currency: number;
}
```

### UserSettingsDto

```ts
export class UpdateUserSettingsRequestBody {
	reports: ReportsUserSettingsDto;
	finance: FinanceUserSettingsDto;
}
```
