export default {
  day: {
    GET_DATE_SUCCESS: 'Successfully got day data for date ',
  },
  form: {
    PATCH_FORM_STATE_SUCCESS: 'Successfully updated form ',
    FAILED_TO_GET_FORM_BY_INPUT_ID: 'Error: no such form',
    FAILED_TO_GET_FORM_ITEM_BY_INPUT_ID:
      'Error: failed to retrieve form item by id',
    FAILED_TO_GET_FORM_LOG_BY_INPUT_ID:
      'Error: failed to retrieve form log by id',
    RECEIVED_INVALID_VALUE_TYPE_FOR_LOG_ITEM_UPDATE:
      'Error: received invalid item update value type',
    SUCCESSFULLY_GOT_FORM_DEFINITION: 'Successfully got form definition',
    SUCCESSFULLY_UPDATED_FORM_DEFINITION:
      'Successfully updated form definition',
    SUCCESSFULLY_DELETED_FORM_DEFINITION_AND_LOGS:
      'Successfully deleted form definition and logs',
    SUCCESSFULLY_CREATED_FORM_DEFINITION:
      'Successfully created a new form definition',
    INVALID_FORM_ITEM_DEFINITION_VALUE_FOR_TYPE:
      'Error: Received invalid form item definition value for type',
    DELETE_FORM_ERROR_YOU_MUST_HAVE_ONE_FORM:
      'Error: you must have at least one form. Failed to delete only form',
  },
  analytics: {
    GET_ANALYTICS_FOR_FORM_SUCCESS_MESSAGE:
      'Successfully got analytic data for form ',
  },
  calendar: {
    SUCCESSFULLY_GOT_CALENDAR_DATES: 'Successfully got calendar dates',
  },
  moneyTransactions: {
    SUCCESSFULLY_GOT_MONEY_TRANSACTION_HISTORY:
      'Successfully got money transaction history',
    SUCCESSFULLY_CREATED_MONEY_TRANSACTION:
      'Successfully logged a money transaction',
    SUCCESSFULLY_UPDATED_MONEY_TRANSACTION:
      'Successfully updated money transaction',
    SUCCESSFULLY_DELETED_MONEY_TRANSACTION:
      'Successfully deleted money transaction ',
    SUCCESSFULLY_CREATED_MONEY_TRANSACTION_CATEGORY:
      'Successfully created a money transaction category',
    SUCCESSFULLY_UPDATED_MONEY_TRANSACTION_CATEGORY:
      'Successfully updated money transaction category',
    SUCCESSFULLY_DELETED_MONEY_TRANSACTION_CATEGORY:
      'Successfully deleted money transaction category. All transactions with this category were set to no category.',
    INVALID_MONEY_CATEGORY_ID_RECEIVED:
      'Error: Invalid money category ID received',
    MONEY_TRANSACTION_NOT_FOUND: 'Error: Money transaction not found',
  },
  reports: {
    SUCCESSFULLY_GOT_REPORT: 'Successfully got report',
  },
  user: {
    SUCCESSFULLY_UPDATED_USER_SETTINGS: 'Successfully updated user settings',
    SUCCESSFULLY_GOT_USER_DATA: 'Successfully got user data',
  },
  notes: {
    SUCCESSFULLY_CREATED_NOTE: 'Successfully created note',
    SUCCESSFULLY_UPDATED_NOTE: 'Successfully updated note',
    SUCCESSFULLY_DELETED_NOTE: 'Successfully deleted note',
    NOTE_NOT_FOUND: 'Error: Note not found',
  },
};
