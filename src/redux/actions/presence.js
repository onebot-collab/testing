import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://10.7.1.38:5000/'

const checkIn = (dataSubmit) => ({
  type: 'CHECKLOG',
  payload: axios().post(
    `${URL}api/v1/absent/checkin`,
    qs.stringify(dataSubmit),
  ),
})

const checkOut = (dataSubmit) => ({
  type: 'CHECKLOG',
  payload: axios().post(
    `${URL}api/v1/absent/checkout`,
    qs.stringify(dataSubmit),
  ),
})

const createIzin = (dataSubmit) => ({
  type: 'CHECKLOG',
  payload: axios().post(`${URL}api/v1/permit`, dataSubmit),
})

const presenceList = () => ({
  type: 'PRESENCELIST',
  payload: axios().get(`${URL}api/v1/absent/allinouttoday`),
})

const lastCheck = (id) => ({
  type: 'LASTCHECK',
  payload: axios().get(`${URL}api/v1/absent/lastcheck/${id}`),
})

const userLogHistory = (id) => ({
  type: 'USERLOG',
  payload: axios().get(`${URL}api/v1/absent/allinout/${id}`),
})

const allLog = () => ({
  type: 'ALLLOG',
  payload: axios().get(`${URL}api/v1/absent/allinout/`),
})

export {
  checkIn,
  checkOut,
  createIzin,
  presenceList,
  userLogHistory,
  lastCheck,
  allLog,
}
