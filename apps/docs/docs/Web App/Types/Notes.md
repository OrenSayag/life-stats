### CreateNoteRequestBody

```ts
export interface CreateNoteRequestBody {
	objectId: string;
	date: string;
	title: string;
	content?: string;
	rtl: boolean;
}
```

### UseNotesReturn

```ts
export interface UseNotesReturn {
	isLoading: boolean;
	isError: boolean;
	notes: Note[];
	changeDateRange: (dateRange: DateRange | DateRangeSelection) => void;
	selectedDateRangeOption: { value: DateRangeSelection; label: string };
	dateRangeOptions: { value: DateRangeSelection; label: string }[];
	setSelectedDateRangeOption: (option: { value: DateRangeSelection; label: string }) => void;
}
```
