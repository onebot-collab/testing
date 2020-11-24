import qs from 'querystring'
import axios from '../../services/axios'
const REACT_APP_URL = 'http://10.7.1.38:5000/'

const loginAuth = (dataSubmit) => ({
  type: 'LOGIN',
  payload: axios().post(
    `${REACT_APP_URL}api/v1/auth/login`,
    qs.stringify(dataSubmit),
  ),
})

const logoutAuth = () => ({
  type: 'LOGOUT',
  payload: '',
})

export { loginAuth, logoutAuth }
