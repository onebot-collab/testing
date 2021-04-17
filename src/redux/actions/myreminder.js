import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://10.7.10.6:8443/node/'

const getMyReminder = (id) => ({
  type: 'MYREMINDER',
  payload: axios().get(`${URL}api/v1/reminderpersonal/${id}`),
})

const getMyReminderByDay = (dataSubmit) => ({
  type: 'MYREMINDERTODAY',
  payload: axios().post(
    `${URL}api/v1/reminderpersonal/remindertoday`,
    qs.stringify(dataSubmit),
  ),
})

const countTodayReminder = (dataSubmit) => ({
  type: 'COUNTMYREMINDER',
  payload: axios().post(
    `${URL}api/v1/reminderpersonal/remindertoday`,
    qs.stringify(dataSubmit),
  ),
})

const createMyReminder = (dataSubmit) => ({
  type: 'MYREMINDERSTATUS',
  payload: axios().post(
    `${URL}api/v1/reminderpersonal`,
    qs.stringify(dataSubmit),
  ),
})

export {
  getMyReminder,
  countTodayReminder,
  getMyReminderByDay,
  createMyReminder,
}
