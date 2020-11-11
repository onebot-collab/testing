import axios from '../../services/axios'
const URL = 'http://10.5.1.38:5000/'

const getAdmin = () => ({
  type: 'GETADMIN',
  payload: axios().get(`${URL}api/v1/user/allbyadmin`),
})

const getUser = () => ({
  type: 'GETUSER',
  payload: axios().get(`${URL}api/v1/chat/allcontact`),
})

const registerUser = (dataSubmit) => ({
  type: 'REGISTER',
  payload: axios().post(`${URL}api/v1/auth/register`, dataSubmit),
})

export { getAdmin, getUser, registerUser }
