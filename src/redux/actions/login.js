import qs from 'querystring'
import axios from '../../services/axios'
const REACT_APP_URL = 'http://localhost:21212/'

const loginAuth = (dataSubmit) => ({
  type: 'LOGIN',
  payload: axios().post(
    `${REACT_APP_URL}api/v1/auth/twofa`,
    qs.stringify(dataSubmit),
  ),
})

const logoutAuth = (token) => ({
  type: 'LOGOUT',
  payload: axios(token).get(`${REACT_APP_URL}api/v1/auth/logout`),
})

const noLogin = () => ({
  type: 'NOLOGIN',
  payload: '',
})

export { loginAuth, logoutAuth, noLogin }
