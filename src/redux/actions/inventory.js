import axios from '../../services/axios'
const URL = 'http://localhost:21212/'

const getInventory = (sort) => ({
  type: 'GETINVENTORY',
  payload: axios().get(`${URL}api/v1/inventory?${sort}=1`),
})

const getInventoryHome = (token) => ({
  type: 'GETINVENTORY',
  payload: axios(token).get(`${URL}api/v1/inventory?sort=0`),
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

export {
  getInventory,
  getInventoryHome,
  postInventory,
  patchInventory,
  deleteInventory,
}
