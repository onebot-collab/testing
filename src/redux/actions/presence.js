import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://localhost:21212/'

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

const userLogHistory = (id, token, page) => ({
  type: 'USERLOG',
  payload: axios(token).get(`${URL}api/v1/absent/allinout/${id}?limit=15&page=${page}`),
})

const exportUserLogHistory = (id, token) => ({
  type: 'CHECKLOG',
  payload: axios(token).get(`${URL}api/v1/absent/allinout/${id}?downloadPdf=1`),
})

const allLog = (token, search, page) => ({
  type: 'ALLLOG',
  payload: axios(token).get(`${URL}api/v1/absent/allinout?limit=15&search=${search}&page=${page}`),
})

const exportAllLog = (token) => ({
  type: 'CHECKLOG',
  payload: axios(token).get(`${URL}api/v1/absent/allinout?downloadPdf=1`),
})

const statsAttendance = (token) => ({
  type: 'STATSATTENDANCE',
  payload: axios(token).get(`${URL}api/v1/stats/attendances/allusers?type=4`),
})

const statsUserAttendance = (token, id) => ({
  type: 'STATSUSERATTENDANCE',
  payload: axios(token).get(`${URL}api/v1/stats/attendances/byuser?type=2&userId=${id}`),
})

export {
  checkIn,
  checkOut,
  createIzin,
  presenceList,
  userLogHistory,
  lastCheck,
  allLog,
  statsAttendance,
  statsUserAttendance,
  exportUserLogHistory,
  exportAllLog,
}
