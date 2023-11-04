## Public Methods

### static useDayData

Gets from backend, the day view data by date.

#### Params

`date: string`

#### Return

`DayViewDateData`

### static getFormStateData

Returns the form state data by the `selectedFromDefinitionId`

#### Params

```ts
{
	selectedFormDefinitionId: string;
	dayData: DayViewDateData;
}
```

#### Return

`FormLog`

### static calcOverallExpenses

Calculates the expenses.

#### Params

`moneyTransactions: MoneyTransactions[]`

#### Return

`number`
