const initialState = {
  isLoadingInventory: false,
  isLoadingInventoryStatus: false,
  isError: false,
  errorMsg: '',
  dataInventory: [],
}

const inventory = (state = initialState, action) => {
  switch (action.type) {
    case 'GETINVENTORY_PENDING': {
      return {
        ...state,
        isLoadingInventory: true,
        isError: false,
      }
    }
    case 'GETINVENTORY_REJECTED': {
      return {
        ...state,
        isLoadingInventory: false,
        isError: true,
        errorMsg: 'Unauthorized',
      }
    }
    case 'GETINVENTORY_FULFILLED': {
      return {
        ...state,
        isLoadingInventory: false,
        isError: false,
        dataInventory: action.payload.data.data,
      }
    }
    case 'INVENTORYSTATUS_PENDING': {
      return {
        ...state,
        isLoadingInventoryStatus: true,
        isError: false,
      }
    }
    case 'INVENTORYSTATUS_REJECTED': {
      return {
        ...state,
        isLoadingInventoryStatus: false,
        isError: action.payload,
      }
    }
    case 'INVENTORYSTATUS_FULFILLED': {
      return {
        ...state,
        isLoadingInventoryStatus: false,
        isError: false,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLoadingInventory: false,
        isError: false,
        dataInventory: false,
        dataINVENTORYSTATUS: false,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default inventory
