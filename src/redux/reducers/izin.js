const initialState = {
  isLoading: false,
  isLoadingIzin: false,
  isLoadingStatus: false,
  isLoadingStats: false,
  isError: false,
  dataIzin: [],
  dataIzinUser: [],
  dataMonthly: [],
}

const izin = (state = initialState, action) => {
  switch (action.type) {
    case 'GETIZIN_PENDING': {
      return {
        ...state,
        isLoadingIzin: true,
        isError: false,
      }
    }
    case 'GETIZIN_REJECTED': {
      return {
        ...state,
        isLoadingIzin: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'GETIZIN_FULFILLED': {
      return {
        ...state,
        isLoadingIzin: false,
        isError: false,
        dataIzin: action.payload.data.data,
      }
    }
    case 'GETIZINUSER_PENDING': {
      return {
        ...state,
        isLoadingIzin: true,
        isError: false,
      }
    }
    case 'GETIZINUSER_REJECTED': {
      return {
        ...state,
        isLoadingIzin: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'GETIZINUSER_FULFILLED': {
      return {
        ...state,
        isLoadingIzin: false,
        isError: false,
        dataIzinUser: action.payload.data.data,
      }
    }
    case 'STATS_PENDING': {
      return {
        ...state,
        isLoadingStats: true,
        isError: false,
      }
    }
    case 'STATS_REJECTED': {
      return {
        ...state,
        isLoadingStats: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'STATS_FULFILLED': {
      return {
        ...state,
        isLoadingStats: false,
        isError: false,
        dataMonthly: action.payload.data.data,
      }
    }
    case 'STATUSIZIN_PENDING': {
      return {
        ...state,
        isLoadingStatus: true,
        isError: false,
      }
    }
    case 'STATUSIZIN_REJECTED': {
      return {
        ...state,
        isLoadingStatus: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'STATUSIZIN_FULFILLED': {
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

export default izin