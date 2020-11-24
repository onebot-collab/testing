import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://10.7.1.38:5000/'

const getReminder = () => ({
  type: 'REMINDER',
  payload: axios().get(`${URL}api/v1/reminder`),
})

const getReminderByDay = (dataSubmit) => ({
  type: 'REMINDERTODAY',
  payload: axios().post(
    `${URL}api/v1/reminder/remindertoday`,
    qs.stringify(dataSubmit),
  ),
})

const createReminder = (dataSubmit) => ({
  type: 'REMINDERSTATUS',
  payload: axios().post(`${URL}api/v1/reminder`, qs.stringify(dataSubmit)),
})

const updateReminder = (id, dataSubmit) => ({
  type: 'REMINDERSTATUS',
  payload: axios().patch(
    `${URL}api/v1/reminder/${id}`,
    qs.stringify(dataSubmit),
  ),
})

const deleteReminder = (id) => ({
  type: 'REMINDERSTATUS',
  payload: axios().delete(`${URL}api/v1/reminder/${id}`),
})

export {
  getReminder,
  getReminderByDay,
  createReminder,
  updateReminder,
  deleteReminder,
}
