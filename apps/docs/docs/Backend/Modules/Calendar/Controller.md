Base endpoint: `calendar`

## Endpoints

### `/`

#### `GET`

Gets the dates data for the calendar view.

##### Query Params

| name    | type     |
| ------- | -------- |
| minDate | `string` |
| maxDate | `string` |

##### Return

`APIResponseBodyBase` containing `CalendarDate[]` in `data` property
