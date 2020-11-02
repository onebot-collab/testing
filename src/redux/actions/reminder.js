import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://10.5.2.38:5000/'

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

export { getReminder, getReminderByDay, createReminder }
