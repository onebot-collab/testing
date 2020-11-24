import axios from '../../services/axios'
const URL = 'http://10.7.1.38:5000/'

const getInventory = (sort) => ({
  type: 'GETINVENTORY',
  payload: axios().get(`${URL}api/v1/inventory?${sort}=1`),
})

const getInventoryHome = () => ({
  type: 'GETINVENTORY',
  payload: axios().get(`${URL}api/v1/inventory?sort=0`),
})

const postInventory = (dataSubmit) => ({
  type: 'INVENTORYSTATUS',
  payload: axios().post(`${URL}api/v1/inventory`, dataSubmit),
})

const patchInventory = (dataSubmit, id) => ({
  type: 'INVENTORYSTATUS',
  payload: axios().patch(`${URL}api/v1/inventory/${id}`, dataSubmit),
})

const deleteInventory = (id) => ({
  type: 'INVENTORYSTATUS',
  payload: axios().delete(`${URL}api/v1/inventory/${id}`),
})

export {
  getInventory,
  getInventoryHome,
  postInventory,
  patchInventory,
  deleteInventory,
}
