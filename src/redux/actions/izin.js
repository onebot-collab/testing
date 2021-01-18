import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://localhost:21212/'

const listIzin = (dataSubmit) => ({
  type: 'GETIZIN',
  payload: axios().post(`${URL}api/v1/permit/touser`, qs.stringify(dataSubmit)),
})

const listIzinByUser = (dataSubmit) => ({
  type: 'GETIZINUSER',
  payload: axios().post(`${URL}api/v1/permit/byuser`, qs.stringify(dataSubmit)),
})

const updateStatus = (dataSubmit, id) => ({
  type: 'STATUSIZIN',
  payload: axios().patch(
    `${URL}api/v1/permit/status/${id}`,
    qs.stringify(dataSubmit),
  ),
})

const uploadFile = (dataSubmit, id) => ({
  type: 'STATUSIZIN',
  payload: axios().patch(`${URL}api/v1/permit/upload/${id}`, dataSubmit),
})

const monthlyStats = (id, date) => ({
  type: 'STATS',
  payload: axios().get(`${URL}api/v1/permit/stats/${id}/${date}`),
})

const allIzin = (token) => ({
  type: 'ALLIZIN',
  payload: axios(token).get(`${URL}api/v1/permit?limit=15`),
})

export {
  listIzin,
  updateStatus,
  listIzinByUser,
  uploadFile,
  monthlyStats,
  allIzin,
}
