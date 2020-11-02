const initialState = {
  isLoading: false,
  isLoadingItem: false,
  isLoadingStatus: false,
  isError: false,
  dataInvoice: [],
  dataInvoiceItem: [],
}

const invoice = (state = initialState, action) => {
  switch (action.type) {
    case 'INVOICELIST_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'INVOICELIST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'INVOICELIST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataInvoice: action.payload.data.data,
      }
    }
    case 'INVOICEITEM_PENDING': {
      return {
        ...state,
        isLoadingItem: true,
        isError: false,
      }
    }
    case 'INVOICEITEM_REJECTED': {
      return {
        ...state,
        isLoadingItem: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'INVOICEITEM_FULFILLED': {
      return {
        ...state,
        isLoadingItem: false,
        isError: false,
        dataInvoiceItem: action.payload.data.data,
      }
    }
    case 'INVOICESTATUS_PENDING': {
      return {
        ...state,
        isLoadingStatus: true,
        isError: false,
      }
    }
    case 'INVOICESTATUS_REJECTED': {
      return {
        ...state,
        isLoadingStatus: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'INVOICESTATUS_FULFILLED': {
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

export default invoice
