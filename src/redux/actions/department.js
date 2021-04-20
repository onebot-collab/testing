import axios from '../../services/axios'
const URL = `${process.env.REACT_APP_URL}`

const getDepartment = (token) => ({
  type: 'DEPARTMENT',
  payload: axios(token).get(`${URL}api/v1/department`),
})

const getUserDepartment = (id, token) => ({
  type: 'DEPARTMENTUSER',
  payload: axios(token).get(`${URL}api/v1/permit/${id}`),
})

export { getDepartment, getUserDepartment }
