/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import moment from 'react-moment'
import Calendar from 'react-calendar'
import './Calendar.css'
import 'react-calendar/dist/Calendar.css'
import 'react-pro-sidebar/dist/css/styles.css'
// @material-ui/core components

// @material-ui/icons components
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Button from '../../components/CustomButtons/Button'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

export default class CalendarScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(date) {
    this.setState({ date })
    console.log(this.state.date)
  }

  onDateChange(date) {
    this.setState({ date: moment(date).format('YYYY-MM-DD') })
  }

  redirect() {
    this.props.history.push('/login')
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {/* {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <> */}
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="danger">
                <h4 className="cardTitleWhite">Event</h4>
                <p className="cardCategoryWhite">by Admin</p>
              </CardHeader>
              <CardBody></CardBody>
              <CardFooter>
                <Button color="danger">Submit</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardHeader color="danger">
                <h4 className="cardTitleWhite">Calendar</h4>
                <p className="cardCategoryWhite">by Admin</p>
              </CardHeader>
              <CardBody>
                <Calendar
                  className="widthCalendarRight"
                  onChange={this.onChange}
                  value={this.state.date}
                  onDateChange={this.onDateChange}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {/* </>
        )} */}
      </div>
    )
  }
}
