const initialState = {
  isLoadingCampaign: false,
  isLoadingCampaignStatus: false,
  isError: false,
  errorMsg: '',
  dataCampaign: [],
}

const campaign = (state = initialState, action) => {
  switch (action.type) {
    case 'GETCAMPAIGN_PENDING': {
      return {
        ...state,
        isLoadingCampaign: true,
        isError: false,
      }
    }
    case 'GETCAMPAIGN_REJECTED': {
      return {
        ...state,
        isLoadingCampaign: false,
        isError: true,
        errorMsg: 'Unauthorized',
      }
    }
    case 'GETCAMPAIGN_FULFILLED': {
      return {
        ...state,
        isLoadingCampaign: false,
        isError: false,
        dataCampaign: action.payload.data.data,
      }
    }
    case 'CAMPAIGNSTATUS_PENDING': {
      return {
        ...state,
        isLoadingCampaignStatus: true,
        isError: false,
      }
    }
    case 'CAMPAIGNSTATUS_REJECTED': {
      return {
        ...state,
        isLoadingCampaignStatus: false,
        isError: action.payload,
      }
    }
    case 'CAMPAIGNSTATUS_FULFILLED': {
      return {
        ...state,
        isLoadingCampaignStatus: false,
        isError: false,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLoadingCampaign: false,
        isError: false,
        dataCampaign: false,
        dataCampaignStatus: false,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default campaign
