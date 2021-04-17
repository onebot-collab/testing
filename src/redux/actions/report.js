import axios from '../../services/axios'
const URL = 'http://10.7.10.6:8443/node/'

const getAllReport = (token, search, page, department, start, end) => ({
  type: 'GETALLREPORT',
  payload: axios(token).get(
    `${URL}api/v1/report?limit=15&search=${search}&page=${page}&departmentId=${department}&startDate=${start}&endDate=${end}`,
  ),
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

const statsReport = (token) => ({
  type: 'STATSREPORT',
  payload: axios(token).get(`${URL}api/v1/stats/report/allusers?type=2`),
})

const exportReportDetail = (token, id) => ({
  type: 'REPORT',
  payload: axios(token).get(
    `${URL}api/v1/report/reportbyid/${id}?downloadPdf=1`,
    {
      responseType: 'blob',
    },
  ),
})

export {
  getAllReport,
  getUserReport,
  createReport,
  deleteReport,
  statsReport,
  exportReportDetail,
}
