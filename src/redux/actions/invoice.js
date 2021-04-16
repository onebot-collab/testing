import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://10.7.10.15:8443/node/'

const listInvoice = () => ({
  type: 'INVOICELIST',
  payload: axios().get(`${URL}api/v1/invoice`),
})

const listInvoiceUser = (id) => ({
  type: 'INVOICELIST',
  payload: axios().get(`${URL}api/v1/invoice/byuser/${id}`),
})

const updateStatus = (dataSubmit, id) => ({
  type: 'INVOICESTATUS',
  payload: axios().patch(
    `${URL}api/v1/invoice/status/${id}`,
    qs.stringify(dataSubmit),
  ),
})

const createInvoice = (dataSubmit) => ({
  type: 'INVOICESTATUS',
  payload: axios().post(`${URL}api/v1/invoice`, qs.stringify(dataSubmit)),
})

const createInvoiceItem = (dataSubmit) => ({
  type: 'INVOICESTATUS',
  payload: axios().post(`${URL}api/v1/invoiceitem`, qs.stringify(dataSubmit)),
})

const listInvoiceItem = (id, token) => ({
  type: 'INVOICEITEM',
  payload: axios(token).get(`${URL}api/v1/invoiceitem/${id}`),
})

const uploadInvoiceImage = (dataSubmit, id) => ({
  type: 'INVOICESTATUS',
  payload: axios().patch(`${URL}api/v1/invoice/upload/${id}`, dataSubmit),
})

const invoiceWaiting = (token, search, page, sort, start, end) => ({
  type: 'INVOICEWAITING',
  payload: axios(token).get(
    `${URL}api/v1/invoice/bystatus/0?limit=15&search=${search}&page=${page}&sort=${sort}&startDate=${start}&endDate=${end}`,
  ),
})

const invoiceApproved = (token, search, page, sort, start, end) => ({
  type: 'INVOICEAPPROVED',
  payload: axios(token).get(
    `${URL}api/v1/invoice/bystatus/1?limit=15&search=${search}&page=${page}&sort=${sort}&startDate=${start}&endDate=${end}`,
  ),
})

const invoiceRejected = (token, search, page, sort, start, end) => ({
  type: 'INVOICEREJECTED',
  payload: axios(token).get(
    `${URL}api/v1/invoice/bystatus/2?limit=15&search=${search}&page=${page}&sort=${sort}&startDate=${start}&endDate=${end}`,
  ),
})

const invoiceProcessed = (token, search, page, sort, start, end) => ({
  type: 'INVOICEPROCESSED',
  payload: axios(token).get(
    `${URL}api/v1/invoice/bystatus/3?limit=15&search=${search}&page=${page}&sort=${sort}&startDate=${start}&endDate=${end}`,
  ),
})

const invoiceClosed = (token, search, page, sort, start, end) => ({
  type: 'INVOICECLOSED',
  payload: axios(token).get(
    `${URL}api/v1/invoice/bystatus/4?limit=15&search=${search}&page=${page}&sort=${sort}&startDate=${start}&endDate=${end}`,
  ),
})

const exportAllInvoice = (token) => ({
  type: 'INVOICESTATUS',
  payload: axios(token).get(`${URL}api/v1/invoice?downloadPdf=1`, {
    responseType: 'blob',
  }),
})

const exportInvoiceDetail = (token, id) => ({
  type: 'INVOICESTATUS',
  payload: axios(token).get(`${URL}api/v1/invoiceitem/${id}?downloadPdf=1`, {
    responseType: 'blob',
  }),
})

const allInvoiceId = (token) => ({
  type: 'ALLINVOICEID',
  payload: axios(token).get(`${URL}api/v1/getAll/allInvoiceNo`),
})

export {
  listInvoice,
  listInvoiceUser,
  updateStatus,
  createInvoice,
  createInvoiceItem,
  listInvoiceItem,
  uploadInvoiceImage,
  invoiceWaiting,
  invoiceApproved,
  invoiceRejected,
  invoiceProcessed,
  invoiceClosed,
  exportAllInvoice,
  exportInvoiceDetail,
  allInvoiceId,
}
