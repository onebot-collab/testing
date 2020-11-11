import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://10.5.1.38:5000/'

const getAllCampaign = () => ({
  type: 'GETCAMPAIGN',
  payload: axios().get(`${URL}api/v1/broadcast/`),
})

const getCampaign = (id) => ({
  type: 'GETCAMPAIGN',
  payload: axios().get(`${URL}api/v1/broadcast/all/${id}`),
})

const postCampaign = (dataSubmit) => ({
  type: 'CAMPAIGNSTATUS',
  payload: axios().post(`${URL}api/v1/broadcast`, qs.stringify(dataSubmit)),
})

const putCampaign = (dataSubmit, token, id) => ({
  type: 'CAMPAIGNSTATUS',
  payload: axios(token).put(`${URL}api/announcements/${id}`, dataSubmit),
})

const deleteCampaign = (id) => ({
  type: 'CAMPAIGNSTATUS',
  payload: axios().delete(`${URL}api/v1/broadcast/${id}`),
})

export {
  getAllCampaign,
  getCampaign,
  postCampaign,
  putCampaign,
  deleteCampaign,
}
