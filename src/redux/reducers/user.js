const initialState = {
  isLoading: false,
  isError: false,
  dataAdmin: [],
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GETADMIN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'GETADMIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'GETADMIN_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataAdmin: action.payload.data.data,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default user
