### UseCalendarReturn

```ts
export interface UseCalendarReturn {
	monthLabel: string;
	onSwitchMonth: (increment: boolean) => void;
	query: UseQueryResult<CalendarDate[]>;
	totalDaysInMonth: number;
}
```

### CalendarWeekData

```ts
export type CalendarWeekData = (CalendarDate | undefined)[];
```
