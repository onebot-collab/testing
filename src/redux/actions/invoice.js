import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://localhost:21212/'

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

const invoiceWaiting = (token, search, page) => ({
  type: 'INVOICEWAITING',
  payload: axios(token).get(`${URL}api/v1/invoice/bystatus/0?limit=15&search=${search}&page=${page}`),
})

const invoiceApproved = (token, search, page) => ({
  type: 'INVOICEAPPROVED',
  payload: axios(token).get(`${URL}api/v1/invoice/bystatus/1?limit=15&search=${search}&page=${page}`),
})

const invoiceRejected = (token, search, page) => ({
  type: 'INVOICEREJECTED',
  payload: axios(token).get(`${URL}api/v1/invoice/bystatus/2?limit=15&search=${search}&page=${page}`),
})

const invoiceProcessed = (token, search, page) => ({
  type: 'INVOICEPROCESSED',
  payload: axios(token).get(`${URL}api/v1/invoice/bystatus/3?limit=15&search=${search}&page=${page}`),
})

const invoiceClosed = (token, search, page) => ({
  type: 'INVOICECLOSED',
  payload: axios(token).get(`${URL}api/v1/invoice/bystatus/4?limit=15&search=${search}&page=${page}`),
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
}
