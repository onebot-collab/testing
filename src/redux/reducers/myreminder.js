const initialState = {
  isLoading: false,
  isLoadingToday: false,
  isLoadingTodayCount: false,
  isLoadingStatus: false,
  isError: false,
  dataMyReminder: [],
  dataMyReminderToday: [],
  dataMyReminderTodayCount: [],
}

const myreminder = (state = initialState, action) => {
  switch (action.type) {
    case 'MYREMINDER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'MYREMINDER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'MYREMINDER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataMyReminder: action.payload.data.data,
      }
    }
    case 'MYREMINDERTODAY_PENDING': {
      return {
        ...state,
        isLoadingToday: true,
        isError: false,
      }
    }
    case 'MYREMINDERTODAY_REJECTED': {
      return {
        ...state,
        isLoadingToday: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'MYREMINDERTODAY_FULFILLED': {
      return {
        ...state,
        isLoadingToday: false,
        isError: false,
        dataMyReminderToday: action.payload.data.data,
      }
    }
    case 'COUNTMYREMINDER_PENDING': {
      return {
        ...state,
        isLoadingTodayCount: true,
        isError: false,
      }
    }
    case 'COUNTMYREMINDER_REJECTED': {
      return {
        ...state,
        isLoadingTodayCount: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'COUNTMYREMINDER_FULFILLED': {
      return {
        ...state,
        isLoadingTodayCount: false,
        isError: false,
        dataMyReminderTodayCount: action.payload.data.data.length,
      }
    }
    case 'MYREMINDERSTATUS_PENDING': {
      return {
        ...state,
        isLoadingStatus: true,
        isError: false,
      }
    }
    case 'MYREMINDERSTATUS_REJECTED': {
      return {
        ...state,
        isLoadingStatus: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'MYREMINDERSTATUS_FULFILLED': {
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

export default myreminder
