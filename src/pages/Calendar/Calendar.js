/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import moment from 'react-moment'
import Calendar from 'react-calendar'
import Select from 'react-select'
import swal from 'sweetalert2'
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
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
// @material-ui/icons components
import Add from '@material-ui/icons/Add'
import Visibility from '@material-ui/icons/Visibility'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
// core components
import { createReminder } from '../../redux/actions/reminder'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

const options = [
  { value: 1, label: 'Once' },
  { value: 2, label: 'Monthly' },
  { value: 0, label: 'Annually' },
]

class CalendarScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      showAddModal: false,
      title: '',
      dateAdd: '',
      description: '',
      type: 0,
      isLoadingAddReminder: false,
    }
    this.onChange = this.onChange.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addReminder = this.addReminder.bind(this)
  }

  onChange(date) {
    this.setState({ date })
    console.log(this.state.date)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onDateChange(date) {
    this.setState({ date: moment(date).format('YYYY-MM-DD') })
  }

  handleTypeChange(e) {
    this.setState({ type: e.value })
  }

  redirect() {
    this.props.history.push('/login')
  }

  addReminder() {
    this.setState({ isLoadingAddReminder: true })
    const dataSubmit = {
      title: this.state.title,
      date: this.state.dateAdd,
      description: this.state.description,
      type: this.state.type,
    }

    this.props
      .createReminder(dataSubmit)
      .then(() => {
        this.setState({
          showAddModal: false,
          isLoadingAddReminder: false,
          title: '',
          dateAdd: '',
          description: '',
          type: 0,
        })
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Event successfully created',
        })
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to create event',
        })
      })
  }

  toggleAddModal() {
    this.setState({
      showAddModal: !this.state.showAddModal,
    })
  }

  componentDidMount() {}

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    return (
      <div>
        {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <>
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
                    {/* <p className="cardCategoryWhite">by Admin</p> */}
                  </CardHeader>
                  <CardBody>
                    <Table className={classesHead.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell component="th">
                            <h6 className="textPrimaryColor">Title</h6>
                          </TableCell>
                          <TableCell component="th">
                            <h6 className="textPrimaryColor">Description</h6>
                          </TableCell>
                          <TableCell component="th">
                            <h6 className="textPrimaryColor">Date</h6>
                          </TableCell>
                          <TableCell component="th">
                            <h6 className="textPrimaryColor">Action</h6>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow className={classes.tableRow}>
                          <TableCell component="th">
                            <p className="textPrimaryColor">Title</p>
                          </TableCell>
                          <TableCell component="th">
                            <p className="textPrimaryColor">Desc</p>
                          </TableCell>
                          <TableCell component="th">
                            <p className="textPrimaryColor">17 Agustus 1945</p>
                          </TableCell>
                          <TableCell className={classesBody.tableActions}>
                            <Tooltip
                              id="tooltip-top"
                              title="Edit Task"
                              placement="top"
                              classes={{ tooltip: classesBody.tooltip }}
                            >
                              <IconButton
                                aria-label="Edit"
                                className={classesBody.tableActionButton}
                              >
                                <Link to="/admin/calendar/detail">
                                  <Visibility className="iconWhiteColor" />
                                </Link>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div className="d-flex flex-row justify-content-end">
                      <div className="p-2 d-flex align-items-center align-self-center">
                        <h6>1 - 5 of 20</h6>
                      </div>
                      <div className="p-2">
                        <IconButton>
                          <ArrowLeft
                            className="iconWhiteColor"
                            fontSize="large"
                          />
                        </IconButton>
                      </div>
                      <div className="p-2">
                        <IconButton>
                          <ArrowRight
                            className="iconWhiteColor"
                            fontSize="large"
                          />
                        </IconButton>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter></CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card profile>
                  <CardHeader color="danger">
                    <h4 className="cardTitleWhite">Calendar</h4>
                    {/* <p className="cardCategoryWhite">by Admin</p> */}
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
              <ModalHeader className="h1">Add Event</ModalHeader>
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
                    name="dateAdd"
                    className="mb-2 shadow-none"
                    onChange={this.handleChange}
                  />
                  <h6>Type</h6>
                  <Select onChange={this.handleTypeChange} options={options} />
                </ModalBody>
                <ModalFooter>
                  {this.state.isLoadingAddReminder ? (
                    <Button color="primary">
                      <div
                        className="spinner-border spinner-border-sm text-danger"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </Button>
                  ) : (
                    <Button color="secondary" onClick={this.addReminder}>
                      Submit
                    </Button>
                  )}
                  <Button color="secondary" onClick={this.toggleAddModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </Modal>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  reminder: state.reminder,
  login: state.login,
})
const mapDispatchToProps = { createReminder }

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
