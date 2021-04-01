const initialState = {
  isLoading: false,
  isLoadingToday: false,
  isLoadingStatus: false,
  isError: false,
  dataReminder: [],
  dataReminderToday: [],
  infoReminderToday: [],
}

const reminder = (state = initialState, action) => {
  switch (action.type) {
    case 'REMINDER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'REMINDER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'REMINDER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataReminder: action.payload.data.data,
      }
    }
    case 'REMINDERTODAY_PENDING': {
      return {
        ...state,
        isLoadingToday: true,
        isError: false,
      }
    }
    case 'REMINDERTODAY_REJECTED': {
      return {
        ...state,
        isLoadingToday: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'REMINDERTODAY_FULFILLED': {
      return {
        ...state,
        isLoadingToday: false,
        isError: false,
        dataReminderToday: action.payload.data.data,
        infoReminderToday: action.payload.data.pageInfo,
      }
    }
    case 'REMINDERSTATUS_PENDING': {
      return {
        ...state,
        isLoadingStatus: true,
        isError: false,
      }
    }
    case 'REMINDERSTATUS_REJECTED': {
      return {
        ...state,
        isLoadingStatus: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'REMINDERSTATUS_FULFILLED': {
      return {
        ...state,
        isLoadingStatus: false,
        isError: false,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default reminder
