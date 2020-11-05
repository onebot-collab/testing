const initialState = {
  isLoading: false,
  isError: false,
  dataAdmin: [],
  dataUser: [],
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
    case 'GETUSER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'GETUSER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'GETUSER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataUser: action.payload.data.data,
      }
    }
    case 'REGISTER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'REGISTER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Failed to register',
      }
    }
    case 'REGISTER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
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

export default user
