import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://10.5.1.38:5000/'

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

const listInvoiceItem = (id) => ({
  type: 'INVOICEITEM',
  payload: axios().get(`${URL}api/v1/invoiceitem/${id}`),
})

const uploadInvoiceImage = (dataSubmit, id) => ({
  type: 'INVOICESTATUS',
  payload: axios().patch(`${URL}api/v1/invoice/upload/${id}`, dataSubmit),
})

const invoiceWaiting = () => ({
  type: 'INVOICEWAITING',
  payload: axios().get(`${URL}api/v1/invoice/bystatus/0`),
})

const invoiceApproved = () => ({
  type: 'INVOICEAPPROVED',
  payload: axios().get(`${URL}api/v1/invoice/bystatus/1`),
})

const invoiceRejected = () => ({
  type: 'INVOICEREJECTED',
  payload: axios().get(`${URL}api/v1/invoice/bystatus/2`),
})

const invoiceProcessed = () => ({
  type: 'INVOICEPROCESSED',
  payload: axios().get(`${URL}api/v1/invoice/bystatus/3`),
})

const invoiceClosed = () => ({
  type: 'INVOICECLOSED',
  payload: axios().get(`${URL}api/v1/invoice/bystatus/4`),
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
