const initialState = {
  isLoading: false,
  isError: false,
  dataAdmin: [],
  dataUser: [],
  infoUser: [],
  dataProfile: [],
  dataFormOne: [],
  dataFormTwo: [],
  dataFormEditPersonal: [],
  dataFormEditBackground: [],
  dataFormEditAsset: [],
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
        infoUser: action.payload.data.pageInfo,
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
    case 'PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Failed to register',
      }
    }
    case 'PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataProfile: action.payload.data.data,
      }
    }
    case 'FORMONE': {
      return {
        ...state,
        dataFormOne: action.meta,
      }
    }
    case 'FORMTWO': {
      return {
        ...state,
        dataFormTwo: action.meta,
      }
    }
    case 'EDITFORMPERSONAL': {
      return {
        ...state,
        dataFormEditPersonal: action.meta,
      }
    }
    case 'EDITFORMBACKGROUND': {
      return {
        ...state,
        dataFormEditBackground: action.meta,
      }
    }
    case 'EDITFORMASSET': {
      return {
        ...state,
        dataFormEditAsset: action.meta,
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
