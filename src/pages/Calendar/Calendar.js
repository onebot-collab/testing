/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import moment from 'react-moment'
import Calendar from 'react-calendar'
import Select from 'react-select'
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from 'reactstrap'
import './Calendar.css'
import 'react-calendar/dist/Calendar.css'
import 'react-pro-sidebar/dist/css/styles.css'
// @material-ui/core components
import Button from '@material-ui/core/Button'
// @material-ui/icons components
import Add from '@material-ui/icons/Add'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

const options = [
  { value: 1, label: 'Once' },
  { value: 2, label: 'Monthly' },
  { value: 3, label: 'Annually' },
]

export default class CalendarScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      showAddModal: false,
    }
    this.onChange = this.onChange.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
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

  toggleAddModal() {
    this.setState({
      showAddModal: !this.state.showAddModal,
    })
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {/* {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <> */}
        <Button
          onClick={this.toggleAddModal}
          variant="contained"
          color="primary"
          // className="buttonAdd"
          startIcon={<Add />}
        >
          Add
        </Button>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="danger">
                <h4 className="cardTitleWhite">Event</h4>
                <p className="cardCategoryWhite">by Admin</p>
              </CardHeader>
              <CardBody></CardBody>
              <CardFooter></CardFooter>
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
        {/* Add Modal */}
        <Modal isOpen={this.state.showAddModal}>
          <ModalHeader className="h1">Add Announcement</ModalHeader>
          <Form>
            <ModalBody>
              <h6>Title</h6>
              <Input
                type="text"
                name="title"
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Description</h6>
              <Input
                type="textarea"
                name="description"
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Date</h6>
              <Input
                value={this.state.birthDate}
                type="date"
                name="birthDate"
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Type</h6>
              <Select
                onChange={this.handleDepartmentChange}
                options={options}
              />
            </ModalBody>
            <ModalFooter>
              {this.state.isLoadingAddCampaign ? (
                <Button color="primary">
                  <div
                    className="spinner-border spinner-border-sm text-danger"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </Button>
              ) : (
                <Button color="secondary" onClick={this.addAnnouncement}>
                  Submit
                </Button>
              )}
              <Button color="secondary" onClick={this.toggleAddModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        {/* </>
        )} */}
      </div>
    )
  }
}
