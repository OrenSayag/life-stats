Base endpoint: `analytics`

## Endpoints

### `/get/:formDefinitionId`

#### `POST`

Gets analytics data for the `formDefinitionId` given the request body parameters.

##### Request Body

`GetAnalyticsForFormRequestBody`

##### Return

`APIResponseBodyBase` containing `FormAnalytics` in `data` property
