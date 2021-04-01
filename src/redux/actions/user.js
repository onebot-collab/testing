import axios from '../../services/axios'
const URL = 'http://10.7.9.6:8443/node/'

const getAdmin = () => ({
  type: 'GETADMIN',
  payload: axios().get(`${URL}api/v1/user/allbyadmin`),
})

const getUser = (token, search, page) => ({
  type: 'GETUSER',
  payload: axios(token).get(`${URL}api/v1/user/allbyusers/0?limit=15&search=${search}&page=${page}`),
})

const registerUser = (dataSubmit, token) => ({
  type: 'REGISTER',
  payload: axios(token).post(`${URL}api/v1/auth/register`, dataSubmit),
})

const getProfile = (id, token) => ({
  type: 'PROFILE',
  payload: axios(token).get(`${URL}api/v1/profile/${id}`),
})

const deleteUser = (id, token) => ({
  type: 'POST',
  payload: axios(token).delete(`${URL}api/v1/user/${id}`),
})

const updateUser = (id, dataSubmit, token) => ({
  type: 'POST',
  payload: axios(token).post(`${URL}api/v1/user/updateuser/${id}`, dataSubmit),
})

export { getAdmin, getUser, registerUser, getProfile, deleteUser, updateUser }
