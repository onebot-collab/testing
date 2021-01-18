import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://localhost:21212/'

const getReminder = () => ({
  type: 'REMINDER',
  payload: axios().get(`${URL}api/v1/reminder`),
})

const getReminderByDay = (dataSubmit, token, search, page) => ({
  type: 'REMINDERTODAY',
  payload: axios(token).post(
    `${URL}api/v1/reminder/remindertoday?limit=15&search=${search}&page=${page}`,
    qs.stringify(dataSubmit),
  ),
})

const createReminder = (dataSubmit, token) => ({
  type: 'REMINDERSTATUS',
  payload: axios(token).post(`${URL}api/v1/reminder`, qs.stringify(dataSubmit)),
})

const updateReminder = (id, dataSubmit, token) => ({
  type: 'REMINDERSTATUS',
  payload: axios(token).patch(
    `${URL}api/v1/reminder/${id}`,
    qs.stringify(dataSubmit),
  ),
})

const deleteReminder = (id, token) => ({
  type: 'REMINDERSTATUS',
  payload: axios(token).delete(`${URL}api/v1/reminder/${id}`),
})

export {
  getReminder,
  getReminderByDay,
  createReminder,
  updateReminder,
  deleteReminder,
}
