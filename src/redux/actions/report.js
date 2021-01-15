import axios from '../../services/axios'
const URL = 'http://localhost:21212/'

const getAllReport = () => ({
  type: 'GETALLREPORT',
  payload: axios().get(`${URL}api/v1/report`),
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
