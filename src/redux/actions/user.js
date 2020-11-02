import axios from '../../services/axios'
const URL = 'http://10.5.2.38:5000/'

const getAdmin = () => ({
  type: 'GETADMIN',
  payload: axios().get(`${URL}api/v1/user/allbyadmin`),
})

export { getAdmin }
