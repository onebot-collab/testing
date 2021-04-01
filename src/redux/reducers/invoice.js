const initialState = {
  isLoading: false,
  isLoadingItem: false,
  isLoadingStatus: false,
  isLoadingWaiting: false,
  isLoadingApproved: false,
  isLoadingRejected: false,
  isLoadingProcessed: false,
  isLoadingClosed: false,
  isError: false,
  dataInvoice: [],
  dataInvoiceWaiting: [],
  dataInvoiceApproved: [],
  dataInvoiceRejected: [],
  dataInvoiceProcessed: [],
  dataInvoiceClosed: [],
  infoInvoiceWaiting: [],
  infoInvoiceApproved: [],
  infoInvoiceRejected: [],
  infoInvoiceProcessed: [],
  infoInvoiceClosed: [],
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
    case 'INVOICEWAITING_PENDING': {
      return {
        ...state,
        isLoadingWaiting: true,
        isError: false,
      }
    }
    case 'INVOICEWAITING_REJECTED': {
      return {
        ...state,
        isLoadingWaiting: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'INVOICEWAITING_FULFILLED': {
      return {
        ...state,
        isLoadingWaiting: false,
        isError: false,
        dataInvoiceWaiting: action.payload.data.data,
        infoInvoiceWaiting: action.payload.data.pageInfo,
      }
    }
    case 'INVOICEAPPROVED_PENDING': {
      return {
        ...state,
        isLoadingApproved: true,
        isError: false,
      }
    }
    case 'INVOICEAPPROVED_REJECTED': {
      return {
        ...state,
        isLoadingApproved: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'INVOICEAPPROVED_FULFILLED': {
      return {
        ...state,
        isLoadingApproved: false,
        isError: false,
        dataInvoiceApproved: action.payload.data.data,
        infoInvoiceApproved: action.payload.data.pageInfo,
      }
    }
    case 'INVOICEREJECTED_PENDING': {
      return {
        ...state,
        isLoadingRejected: true,
        isError: false,
      }
    }
    case 'INVOICEREJECTED_REJECTED': {
      return {
        ...state,
        isLoadingRejected: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'INVOICEREJECTED_FULFILLED': {
      return {
        ...state,
        isLoadingRejected: false,
        isError: false,
        dataInvoiceRejected: action.payload.data.data,
        infoInvoiceRejected: action.payload.data.pageInfo,
      }
    }
    case 'INVOICEPROCESSED_PENDING': {
      return {
        ...state,
        isLoadingProcessed: true,
        isError: false,
      }
    }
    case 'INVOICEPROCESSED_REJECTED': {
      return {
        ...state,
        isLoadingProcessed: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'INVOICEPROCESSED_FULFILLED': {
      return {
        ...state,
        isLoadingProcessed: false,
        isError: false,
        dataInvoiceProcessed: action.payload.data.data,
        infoInvoiceProcessed: action.payload.data.pageInfo,
      }
    }
    case 'INVOICECLOSED_PENDING': {
      return {
        ...state,
        isLoadingClosed: true,
        isError: false,
      }
    }
    case 'INVOICECLOSED_REJECTED': {
      return {
        ...state,
        isLoadingClosed: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'INVOICECLOSED_FULFILLED': {
      return {
        ...state,
        isLoadingClosed: false,
        isError: false,
        dataInvoiceClosed: action.payload.data.data,
        infoInvoiceClosed: action.payload.data.pageInfo,
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
