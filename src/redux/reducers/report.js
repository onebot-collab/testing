const initialState = {
  isLoading: false,
  isLoadingDelete: false,
  isError: false,
  dataAllReport: [],
  infoAllReport: [],
  dataUserReport: [],
  statsReport: [],
}

const report = (state = initialState, action) => {
  switch (action.type) {
    case 'GETALLREPORT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'GETALLREPORT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'GETALLREPORT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataAllReport: action.payload.data.data,
        infoAllReport: action.payload.data.pageInfo,
      }
    }
    case 'GETUSERREPORT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'GETUSERREPORT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'GETUSERREPORT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataUserReport: action.payload.data.data,
      }
    }
    case 'REPORT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'REPORT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'REPORT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
      }
    }
    case 'REPORTDELETE_PENDING': {
      return {
        ...state,
        isLoadingDelete: true,
        isError: false,
      }
    }
    case 'REPORTDELETE_REJECTED': {
      return {
        ...state,
        isLoadingDelete: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'REPORTDELETE_FULFILLED': {
      return {
        ...state,
        isLoadingDelete: false,
        isError: false,
      }
    }
    case 'STATSREPORT_PENDING': {
      return {
        ...state,
        isLoadingDelete: true,
        isError: false,
      }
    }
    case 'STATSREPORT_REJECTED': {
      return {
        ...state,
        isLoadingDelete: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'STATSREPORT_FULFILLED': {
      return {
        ...state,
        isLoadingDelete: false,
        isError: false,
        statsReport: action.payload.data.data,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default report
