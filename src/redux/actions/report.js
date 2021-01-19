import axios from '../../services/axios'
const URL = 'http://localhost:21212/'

const getAllReport = (token, search, page) => ({
  type: 'GETALLREPORT',
  payload: axios(token).get(`${URL}api/v1/report?limit=15&search=${search}&page=${page}`),
})

const getUserReport = (id) => ({
  type: 'GETUSERREPORT',
  payload: axios().get(`${URL}api/v1/report/${id}`),
})

const createReport = (dataSubmit) => ({
  type: 'REPORT',
  payload: axios().post(`${URL}api/v1/report`, dataSubmit),
})

const deleteReport = (id) => ({
  type: 'REPORTDELETE',
  payload: axios().delete(`${URL}api/v1/report/${id}`),
})

export { getAllReport, getUserReport, createReport, deleteReport }
