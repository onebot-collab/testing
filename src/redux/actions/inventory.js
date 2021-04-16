import axios from '../../services/axios'
const URL = 'http://10.7.10.15:8443/node/'

const getInventory = (sort) => ({
  type: 'GETINVENTORY',
  payload: axios().get(`${URL}api/v1/inventory?${sort}=1`),
})

const getInventoryHome = (token, search, page, filter) => ({
  type: 'GETINVENTORY',
  payload: axios(token).get(
    `${URL}api/v1/inventory?sort=0&limit=15&search=${search}&page=${page}&${filter}`,
  ),
})

const postInventory = (dataSubmit, token) => ({
  type: 'INVENTORYSTATUS',
  payload: axios(token).post(`${URL}api/v1/inventory`, dataSubmit),
})

const patchInventory = (dataSubmit, id, token) => ({
  type: 'INVENTORYSTATUS',
  payload: axios(token).post(`${URL}api/v1/inventory/edit/${id}`, dataSubmit),
})

const deleteInventory = (id, token) => ({
  type: 'INVENTORYSTATUS',
  payload: axios(token).delete(`${URL}api/v1/inventory/${id}`),
})

const exportInventory = (token) => ({
  type: 'INVENTORYSTATUS',
  payload: axios(token).get(`${URL}api/v1/inventory?downloadPdf=1`, {
    responseType: 'blob',
  }),
})

const inventoryCategory = (token) => ({
  type: 'INVENTORYCATEGORY',
  payload: axios(token).get(`${URL}api/v1/getAll/allInventoryCategory`),
})

export {
  getInventory,
  getInventoryHome,
  postInventory,
  patchInventory,
  deleteInventory,
  exportInventory,
  inventoryCategory,
}
