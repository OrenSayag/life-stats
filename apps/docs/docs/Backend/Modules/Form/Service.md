## Public Methods

### getHistoryByDate

Gets forms and money transactions for the day.

#### Params

`date: string`

#### Return

_This is an object grouping the forms by keys. Each key contains a form_
`any`

### getFormLogByDate

Gets the `FormLog` for the date. If not exists, creates a new `FormLog` and returns it, by the `definitionId`.

#### Params

`GetFormLogByDateParams`

#### Return

`Promise<FormLog>`

### updateFormLogItemValues

Update the form log item values.

The `isPerfectDay` property is updated based on the items' `value` vs target value.

#### Params

`UpdateFormLogParams`

#### Return

`Promise<void>`

### getFormDefinition

Gets the form definition

#### Params

`definitionId: string`

#### Return

`Promise<Form>`

### updateFormDefinition

Updates the form definition

#### Params

`UpdateFormDefinitionParams`

#### Return

`Promise<void>`
