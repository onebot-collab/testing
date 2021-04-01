import axios from '../../services/axios'
const URL = 'http://10.7.9.6:8443/node/'

const getInventory = (sort) => ({
  type: 'GETINVENTORY',
  payload: axios().get(`${URL}api/v1/inventory?${sort}=1`),
})

const getInventoryHome = (token, search, page) => ({
  type: 'GETINVENTORY',
  payload: axios(token).get(`${URL}api/v1/inventory?sort=0&limit=15&search=${search}&page=${page}`),
})

const postInventory = (dataSubmit, token) => ({
  type: 'INVENTORYSTATUS',
  payload: axios(token).post(`${URL}api/v1/inventory`, dataSubmit),
})

const patchInventory = (dataSubmit, id, token) => ({
  type: 'INVENTORYSTATUS',
  payload: axios(token).patch(`${URL}api/v1/inventory/${id}`, dataSubmit),
})

const deleteInventory = (id, token) => ({
  type: 'INVENTORYSTATUS',
  payload: axios(token).delete(`${URL}api/v1/inventory/${id}`),
})

const exportInventory = (token) => ({
  type: 'INVENTORYSTATUS',
  payload: axios(token).get(`${URL}api/v1/inventory?downloadPdf=1`, {responseType: 'blob'}),
})

export {
  getInventory,
  getInventoryHome,
  postInventory,
  patchInventory,
  deleteInventory,
  exportInventory,
}
