import axios from '../../services/axios'
const URL = 'http://10.5.1.38:5000/'

const getAdmin = () => ({
  type: 'GETADMIN',
  payload: axios().get(`${URL}api/v1/user/allbyadmin`),
})

const getUser = () => ({
  type: 'GETUSER',
  payload: axios().get(`${URL}api/v1/user/allbyusers/0`),
})

const registerUser = (dataSubmit) => ({
  type: 'REGISTER',
  payload: axios().post(`${URL}api/v1/auth/register`, dataSubmit),
})

const getProfile = (id) => ({
  type: 'PROFILE',
  payload: axios().get(`${URL}api/v1/profile/${id}`),
})

const deleteUser = (id) => ({
  type: 'POST',
  payload: axios().delete(`${URL}api/v1/user/${id}`),
})

export { getAdmin, getUser, registerUser, getProfile, deleteUser }
