## Public Methods

### static useUpdateFormState

#### Params

`formDefinitionId: string`

#### Return

Return from `useMutation` (react query)

### static useUpdateFormDefinition

Updates the form definition.

#### Return

Return from `useMutation` (react query)

### static useFormDefinitions

On page's init, saves the formDefinitions returned from the `UserData` injected from `getServerSideProps`.

Provides mutation for usage in views that modify the form definitions, or read them.

#### Params

`{ formDefinitions?: FormDefinition[] }`

#### Return

`UseFormDefinitionsReturn`
