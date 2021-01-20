const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  dataPresence: [],
  dataLastCheck: [],
  isLoadingLastCheck: false,
  dataUserLog: [],
  infoUserLog: [],
  isLoadingUserLog: false,
  isLoadingAllLog: false,
  dataAllLog: [],
  infoAllLog: [],
  statsAttendance: [],
  statsUserAttendance: [],
}

const presence = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECKLOG_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'CHECKLOG_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'CHECKLOG_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
      }
    }
    case 'PRESENCELIST_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'PRESENCELIST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'PRESENCELIST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataPresence: action.payload.data.data,
      }
    }
    case 'LASTCHECK_PENDING': {
      return {
        ...state,
        isLoadingLastCheck: true,
        isError: false,
      }
    }
    case 'LASTCHECK_REJECTED': {
      return {
        ...state,
        isLoadingLastCheck: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'LASTCHECK_FULFILLED': {
      return {
        ...state,
        isLoadingLastCheck: false,
        isError: false,
        dataLastCheck: action.payload.data.data,
      }
    }
    case 'USERLOG_PENDING': {
      return {
        ...state,
        isLoadingUserLog: true,
        isError: false,
      }
    }
    case 'USERLOG_REJECTED': {
      return {
        ...state,
        isLoadingUserLog: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'USERLOG_FULFILLED': {
      return {
        ...state,
        isLoadingUserLog: false,
        isError: false,
        dataUserLog: action.payload.data.data,
        infoUserLog: action.payload.data.pageInfo,
      }
    }
    case 'ALLLOG_PENDING': {
      return {
        ...state,
        isLoadingAllLog: true,
        isError: false,
      }
    }
    case 'ALLLOG_REJECTED': {
      return {
        ...state,
        isLoadingAllLog: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'ALLLOG_FULFILLED': {
      return {
        ...state,
        isLoadingAllLog: false,
        isError: false,
        dataAllLog: action.payload.data.data,
        infoAllLog: action.payload.data.pageInfo,
      }
    }
    case 'STATSATTENDANCE_PENDING': {
      return {
        ...state,
        isLoadingAllLog: true,
        isError: false,
      }
    }
    case 'STATSATTENDANCE_REJECTED': {
      return {
        ...state,
        isLoadingAllLog: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'STATSATTENDANCE_FULFILLED': {
      return {
        ...state,
        isLoadingAllLog: false,
        isError: false,
        statsAttendance: action.payload.data.data,
      }
    }
    case 'STATSUSERATTENDANCE_PENDING': {
      return {
        ...state,
        isLoadingAllLog: true,
        isError: false,
      }
    }
    case 'STATSUSERATTENDANCE_REJECTED': {
      return {
        ...state,
        isLoadingAllLog: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'STATSUSERATTENDANCE_FULFILLED': {
      return {
        ...state,
        isLoadingAllLog: false,
        isError: false,
        statsUserAttendance: action.payload.data.data,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default presence
