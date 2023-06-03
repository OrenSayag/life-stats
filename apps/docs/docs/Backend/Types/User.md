## Interfaces

### UserFormMeta

```ts
export interface FormDefinition {
	objectId: string;
	label: string;
	isDefaultForm: boolean;
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
