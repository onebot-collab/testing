/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-case-declarations */
import _ from 'lodash'
import {
  // CREATE_EVENT,
  READ_EVENTS,
  DELETE_EVENT,
  READ_EVENT,
  UPDATE_EVENT,
} from '../actions'

const events = (events = {}, action) => {
  switch (action.type) {
    case UPDATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      const { data } = action.response
      return {
        ...events,
        [data.id]: data,
      }
    case READ_EVENTS:
      return _.mapKeys(action.response.data, 'id')
    case DELETE_EVENT:
      delete events[action.id]
      return { ...events }
    default:
      return events
  }
}

export default events
