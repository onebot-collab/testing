const initialState = {
  isLoading: false,
  isLoadingDepartmentUser: false,
  isError: false,
  dataDepartment: [],
  dataDepartmentUser: [],
}

const department = (state = initialState, action) => {
  switch (action.type) {
    case 'DEPARTMENT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'DEPARTMENT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'DEPARTMENT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataDepartment: action.payload.data.data,
      }
    }
    case 'DEPARTMENTUSER_PENDING': {
      return {
        ...state,
        isLoadingDepartmentUser: true,
        isError: false,
      }
    }
    case 'DEPARTMENTUSER_REJECTED': {
      return {
        ...state,
        isLoadingDepartmentUser: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'DEPARTMENTUSER_FULFILLED': {
      return {
        ...state,
        isLoadingDepartmentUser: false,
        isError: false,
        dataDepartmentUser: action.payload.data.data,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default department
