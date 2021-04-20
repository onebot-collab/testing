import qs from 'querystring'
import axios from '../../services/axios'
const URL = `${process.env.REACT_APP_URL}`

const loginAuth = (dataSubmit) => ({
  type: 'LOGIN',
  payload: axios().post(
    `${URL}api/v1/auth/twofa`,
    qs.stringify(dataSubmit),
  ),
})

const logoutAuth = (token) => ({
  type: 'LOGOUT',
  payload: axios(token).get(`${URL}api/v1/auth/logout`),
})

const noLogin = () => ({
  type: 'NOLOGIN',
  payload: '',
})

const newToken = (data) => ({
  type: 'NEWTOKEN',
  meta: data,
})

export { loginAuth, logoutAuth, noLogin, newToken }
