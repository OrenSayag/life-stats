## Atoms

### Select

#### Params

`SelectParams`

### Burger

### LoginButton

Used in view Login.

#### Params

`SocialProviderLoginType`

### AppLogo

Contains SVG of app logo.

### NextButton

Button to increment.

#### Params

`PreviousNextButtonParams`

### PreviousButton

Button to decrement.

#### Params

`PreviousNextButtonParams`

### AddButton

Button to increment.

#### Params

`PreviousNextButtonParams`

### TrashButton

Button to delete.

#### Params

`{ onClick: () => void, className?: string }`

### SubtractButton

Button to decrement.

#### Params

`PreviousNextButtonParams`

### NavBarPageLink

Label of the page with link to it.

#### Params

`NavBarPageLinkParams`

### UserProfileAvatar

Displays image of the user.

### Card

Container

#### Params

`CardParams`

### Divider

#### Params

`DividerParams`

### TargetButton

Used in the form card.

#### Params

`onClick: ()=>void, targetMode: boolean`

### NumericFormItemControl

Displays the numeric value of a numeric form item. Has buttons to increment/decrement the value.

#### Params

`NumericFormItemControlParams`

### BooleanFormItemControl

Contains a toggler to toggle value of the form item.

#### Params

`BooleanFormItemControlParams`

### IconButton

#### Params

`IconButtonParams`

## Molecules

### DateRangeSelector

#### Params

`DateRangeSelectorParams`

### AnalyticsItemSwitch

Used in Analytics page. Switches between form item analytics display.

#### Params

`{ itemLabel: string, onChange: (dir: "next" | "previous") => void }`

### PageTitle

Used for mobile mode. Contains the page title, highlighted, and a divider.

### DayNavigator

Displays the day and date, contains buttons to switch day (next and previous).

#### Params

`DayNavigatorParams`

### ViewModeToggle

Toggle between modes of a view.

#### Params

`ViewModeToggleParams`

### FormItemContainer

Displays the form item value, control.

Target mode displays the target value instead of control.

#### Params

`FormItemContainerParams`

### MoneyTransactionLogItem

#### Params

`MoneyTransactionLogItemParams`

### AddMoneyTransactionForm

#### Params

`AddMoneyTransactionFormParams`

### InputLabel

Display a label with a value. Clicking on it, turns the label to an input.

#### Params

`InputLabelParams`

## Organisms

### AnalyticsItem

### HeaderBar

Contains app logo and user avatar, on mobile: burger menu that opens the navbar.

#### Params

`HeaderBarParams`

### NavBar

Contains links to the pages of the application.

### Form

Displays the form log.

#### Params

`FormLog`

### MoneyTransactionDayLog

#### Params

`MoneyTransactionDayLogParams`

### LineChart

#### Params

`ChartParams`

### PieChart

#### Params

`ChartParams`

## Templates

### Layout

The app layout.
Contains the HeaderBar, NavBar (desktop only, unless burger is active ), PageTitle, and the page's view.

`LayoutParams`

### DayView

Displays the forms and money transactions for the date.

## Pages

### DayPage

`Layout` with `DayView`

#### Params

`UserData`
