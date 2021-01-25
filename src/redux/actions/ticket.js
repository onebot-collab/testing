import qs from 'querystring'
import axios from '../../services/axios'
const URL = 'http://localhost:21212/'

const createTicket = (dataSubmit) => ({
  type: 'TICKET',
  payload: axios().post(`${URL}api/v1/ticket`, qs.stringify(dataSubmit)),
})

const getTicketSent = (id) => ({
  type: 'TICKETSENT',
  payload: axios().get(`${URL}api/v1/ticket/request/${id}`),
})

const getTicketDepartment = (id) => ({
  type: 'TICKETDEPARTMENT',
  payload: axios().get(`${URL}api/v1/ticket/groupby/${id}`),
})

const getMyTicket = (id) => ({
  type: 'TICKETMY',
  payload: axios().get(`${URL}api/v1/ticket/myticket/${id}`),
})

const getTicketObserve = (id) => ({
  type: 'TICKETOBSERVE',
  payload: axios().get(`${URL}api/v1/ticket/observe/${id}`),
})

const updateTicketStatus = (id, dataSubmit) => ({
  type: 'TICKET',
  payload: axios().patch(`${URL}api/v1/ticket/${id}`, qs.stringify(dataSubmit)),
})

const ticketScoring = (dataSubmit) => ({
  type: 'TICKET',
  payload: axios().post(`${URL}api/v1/score/request`, qs.stringify(dataSubmit)),
})

const ticketPoint = (dataSubmit) => ({
  type: 'TICKET',
  payload: axios().post(`${URL}api/v1/score/observe`, qs.stringify(dataSubmit)),
})

const getTicketScore = (ticketId, assignId, token) => ({
  type: 'TICKETSCORE',
  payload: axios(token).get(`${URL}api/v1/score/request/${ticketId}/${assignId}`),
})

const getTicketPoint = (ticketId, assignId) => ({
  type: 'TICKETPOINT',
  payload: axios().get(`${URL}api/v1/score/observe/${ticketId}/${assignId}`),
})

const ticketComment = (dataSubmit) => ({
  type: 'TICKET',
  payload: axios().post(`${URL}api/v1/ticketcomment`, qs.stringify(dataSubmit)),
})

const getTicketComment = (ticketId) => ({
  type: 'TICKETCOMMENT',
  payload: axios().get(`${URL}api/v1/ticketcomment/${ticketId}`),
})

const getTicketClosed = () => ({
  type: 'TICKETCLOSED',
  payload: axios().get(`${URL}api/v1/ticket/closed`),
})

const getAllTicket = (token, search, page) => ({
  type: 'ALLTICKET',
  payload: axios(token).get(`${URL}api/v1/ticket?limit=15&search=${search}&page=${page}`),
})

const getTicketStats = (token) => ({
  type: 'TICKETSTATS',
  payload: axios(token).get(`${URL}api/v1/ticket/stats`),
})

const statsTicketClosed = (token) => ({
  type: 'TICKETSTATSCLOSED',
  payload: axios(token).get(`${URL}api/v1/stats/ticketclosed/allusers?type=2`),
})

const exportAllTicket = (token) => ({
  type: 'TICKETSENT',
  payload: axios(token).get(`${URL}api/v1/ticket?downloadPdf=1`, {responseType: 'blob'}),
})

const exportDetailTicket = (token, ticketId) => ({
  type: 'TICKETSENT',
  payload: axios(token).get(`${URL}api/v1/ticket/detailticket/${ticketId}?downloadPdf=1`, {responseType: 'blob'}),
})

export {
  createTicket,
  getTicketSent,
  getTicketDepartment,
  getMyTicket,
  getTicketObserve,
  updateTicketStatus,
  ticketScoring,
  ticketPoint,
  getTicketScore,
  getTicketPoint,
  ticketComment,
  getTicketComment,
  getTicketClosed,
  getAllTicket,
  getTicketStats,
  statsTicketClosed,
  exportAllTicket,
  exportDetailTicket,
}
