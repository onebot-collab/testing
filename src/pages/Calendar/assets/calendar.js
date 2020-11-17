import React, { Component } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import events from './event'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// https://www.npmjs.com/package/react-big-calendar
// http://intljusticemission.github.io/react-big-calendar/examples/index.html#intro

const localizer = momentLocalizer(moment)

export default class CalendarScreen extends Component {
  render() {
    return (
      <div style={{ height: '500px' }}>
        <h1>calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    )
  }
}
