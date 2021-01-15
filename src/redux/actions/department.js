import axios from '../../services/axios'
const URL = 'http://localhost:21212/'

const getDepartment = () => ({
  type: 'DEPARTMENT',
  payload: axios().get(`${URL}api/v1/department`),
})

const getUserDepartment = (id) => ({
  type: 'DEPARTMENTUSER',
  payload: axios().get(`${URL}api/v1/permit/${id}`),
})

export { getDepartment, getUserDepartment }
