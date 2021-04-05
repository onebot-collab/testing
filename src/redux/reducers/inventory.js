const initialState = {
  isLoadingInventory: false,
  isLoadingInventoryStatus: false,
  isError: false,
  errorMsg: '',
  dataInventory: [],
  dataInventoryCategory: [],
  infoInventory: [],
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
        infoInventory: action.payload.data.pageInfo,
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
    case 'INVENTORYCATEGORY_PENDING': {
      return {
        ...state,
        isError: false,
      }
    }
    case 'INVENTORYCATEGORY_REJECTED': {
      return {
        ...state,
        isError: action.payload,
      }
    }
    case 'INVENTORYCATEGORY_FULFILLED': {
      return {
        ...state,
        isError: false,
        dataInventoryCategory: action.payload.data.data,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLoadingInventory: false,
        isError: false,
        dataInventory: false,
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
