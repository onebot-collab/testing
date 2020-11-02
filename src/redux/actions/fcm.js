import qs from 'querystring'
import axios from '../../services/axios'
import fcm from '../../services/fcm'
const URL = 'http://10.5.2.38:5000/'

const getAllFcm = () => ({
  type: 'ALLFCM',
  payload: axios().get(`${URL}api/v1/fcm`),
})

const postFcm = (dataSubmit) => ({
  type: 'FCMSTATUS',
  payload: axios().post(`${URL}api/v1/fcm`, qs.stringify(dataSubmit)),
})

const sendNotif = (dataSubmit) => ({
  type: 'FCMSTATUS',
  payload: fcm().post('https://fcm.googleapis.com/fcm/send', dataSubmit),
})

const saveNotif = (dataSubmit) => ({
  type: 'FCMSTATUS',
  payload: axios().post(`${URL}api/v1/alert`, qs.stringify(dataSubmit)),
})

const getNotif = () => ({
  type: 'ALLNOTIF',
  payload: axios().get(`${URL}api/v1/alert`),
})

export { getAllFcm, postFcm, sendNotif, saveNotif, getNotif }
