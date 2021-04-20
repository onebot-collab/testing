import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://10.7.10.15:8443/node/'

const getAllCampaign = (token, search, page, startDate, endDate) => ({
  type: 'GETCAMPAIGN',
  payload: axios(token).get(
    `${URL}api/v1/broadcast?limit=15&search=${search}&page=${page}&startDate=${startDate}&endDate=${endDate}`,
  ),
})

const getCampaign = (token, id, startDate, endDate) => ({
  type: 'GETCAMPAIGN',
  payload: axios(token).get(
    `${URL}api/v1/broadcast/all/${id}?startDate=${startDate}&endDate=${endDate}`,
  ),
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
