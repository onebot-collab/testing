const initialState = {
  isLoading: false,
  isLoadingScore: false,
  isLoadingPoint: false,
  isLoadingComment: false,
  isLoadingClosed: false,
  isError: false,
  dataTicket: [],
  dataAllTicket: [],
  dataTicketSent: [],
  dataTicketDepartment: [],
  dataMyTicket: [],
  dataTicketObserve: [],
  dataTicketScore: [],
  dataTicketPoint: [],
  dataTicketComment: [],
  dataTicketCLosed: [],
}

const ticket = (state = initialState, action) => {
  switch (action.type) {
    case 'ALLTICKET_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'ALLTICKET_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'ALLTICKET_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataAllTicket: action.payload.data.data,
      }
    }
    case 'GETTICKET_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'GETTICKET_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'GETTICKET_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataTicket: action.payload.data.data,
      }
    }
    case 'TICKETSENT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'TICKETSENT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'TICKETSENT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataTicket: action.payload.data.data,
      }
    }
    case 'TICKETDEPARTMENT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'TICKETDEPARTMENT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'TICKETDEPARTMENT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataTicket: action.payload.data.data,
      }
    }
    case 'TICKETMY_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'TICKETMY_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'TICKETMY_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataTicket: action.payload.data.data,
      }
    }
    case 'TICKETOBSERVE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'TICKETOBSERVE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'TICKETOBSERVE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataTicket: action.payload.data.data,
      }
    }
    case 'TICKETSCORE_PENDING': {
      return {
        ...state,
        isLoadingScore: true,
        isError: false,
      }
    }
    case 'TICKETSCORE_REJECTED': {
      return {
        ...state,
        isLoadingScore: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'TICKETSCORE_FULFILLED': {
      return {
        ...state,
        isLoadingScore: false,
        isError: false,
        dataTicketScore: action.payload.data.data,
      }
    }
    case 'TICKETPOINT_PENDING': {
      return {
        ...state,
        isLoadingPoint: true,
        isError: false,
      }
    }
    case 'TICKETPOINT_REJECTED': {
      return {
        ...state,
        isLoadingPoint: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'TICKETPOINT_FULFILLED': {
      return {
        ...state,
        isLoadingPoint: false,
        isError: false,
        dataTicketPoint: action.payload.data.data,
      }
    }
    case 'TICKETCOMMENT_PENDING': {
      return {
        ...state,
        isLoadingComment: true,
        isError: false,
      }
    }
    case 'TICKETCOMMENT_REJECTED': {
      return {
        ...state,
        isLoadingComment: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'TICKETCOMMENT_FULFILLED': {
      return {
        ...state,
        isLoadingComment: false,
        isError: false,
        dataTicketComment: action.payload.data.data,
      }
    }
    case 'TICKETCLOSED_PENDING': {
      return {
        ...state,
        isLoadingClosed: true,
        isError: false,
      }
    }
    case 'TICKETCLOSED_REJECTED': {
      return {
        ...state,
        isLoadingClosed: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'TICKETCLOSED_FULFILLED': {
      return {
        ...state,
        isLoadingClosed: false,
        isError: false,
        dataTicketClosed: action.payload.data.data,
      }
    }
    case 'TICKET_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'TICKET_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.data,
      }
    }
    case 'TICKET_FULFILLED': {
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

export default ticket
