import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://10.7.9.6:8443/node/'

const getAllCampaign = (token, search, page) => ({
  type: 'GETCAMPAIGN',
  payload: axios(token).get(`${URL}api/v1/broadcast?limit=15&search=${search}&page=${page}`),
})

const getCampaign = (id) => ({
  type: 'GETCAMPAIGN',
  payload: axios().get(`${URL}api/v1/broadcast/all/${id}`),
})

const postCampaign = (dataSubmit, token) => ({
  type: 'CAMPAIGNSTATUS',
  payload: axios(token).post(
    `${URL}api/v1/broadcast`,
    qs.stringify(dataSubmit),
  ),
})

const patchCampaign = (id, dataSubmit, token) => ({
  type: 'CAMPAIGNSTATUS',
  payload: axios(token).patch(
    `${URL}api/v1/broadcast/${id}`,
    qs.stringify(dataSubmit),
  ),
})

const deleteCampaign = (id, token) => ({
  type: 'CAMPAIGNSTATUS',
  payload: axios(token).delete(`${URL}api/v1/broadcast/${id}`),
})

export {
  getAllCampaign,
  getCampaign,
  postCampaign,
  patchCampaign,
  deleteCampaign,
}
