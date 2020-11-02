const initialState = {
  isLoading: false,
  isLoadingFcm: false,
  isLoadingNotif: false,
  isError: false,
  dataFcm: [],
  dataAllNotif: [],
}

const fcm = (state = initialState, action) => {
  switch (action.type) {
    case 'ALLFCM_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'ALLFCM_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'ALLFCM_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataFcm: action.payload.data.data,
      }
    }
    case 'FCMSTATUS_PENDING': {
      return {
        ...state,
        isLoadingFcm: true,
        isError: false,
      }
    }
    case 'FCMSTATUS_REJECTED': {
      return {
        ...state,
        isLoadingFcm: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'FCMSTATUS_FULFILLED': {
      return {
        ...state,
        isLoadingFcm: false,
        isError: false,
      }
    }
    case 'ALLNOTIF_PENDING': {
      return {
        ...state,
        isLoadingNotif: true,
        isError: false,
      }
    }
    case 'ALLNOTIF_REJECTED': {
      return {
        ...state,
        isLoadingNotif: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'ALLNOTIF_FULFILLED': {
      return {
        ...state,
        isLoadingNotif: false,
        isError: false,
        dataAllNotif: action.payload.data.data,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default fcm
