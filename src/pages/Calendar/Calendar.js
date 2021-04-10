/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Select from 'react-select'
import swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from 'reactstrap'
import './Calendar.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
// @material-ui/core components
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
// @material-ui/icons components
import Add from '@material-ui/icons/Add'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Visibility from '@material-ui/icons/Visibility'
import Delete from '@material-ui/icons/Delete'
// core components
import {
  createReminder,
  getReminderByDay,
  deleteReminder,
  getReminder,
} from '../../redux/actions/reminder'
import { sendNotif } from '../../redux/actions/fcm'
import { newToken } from '../../redux/actions/login'

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
const localizer = momentLocalizer(moment)
const options = [
  { value: 1, label: 'Once' },
  { value: 2, label: 'Monthly' },
  { value: 0, label: 'Annually' },
]

class CalendarScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // date: new Date(),
      showAddModal: false,
      title: '',
      dateAdd: '',
      description: '',
      type: 0,
      isLoadingAddReminder: false,
      deleteId: 0,
      showDeleteModal: false,
      isLoadingDelete: false,
      search: '',
      page: 1,
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.addReminder = this.addReminder.bind(this)
    this.deleteAct = this.deleteAct.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      const date = moment().format().slice(0, 10)
      this.fetchReminder(date)
    }, 100)
  }

  nextPage() {
    if (this.state.page < this.props.reminder.infoReminderToday.totalPage) {
      this.setState({ page: this.state.page + 1 })
      setTimeout(() => {
        const date = moment().format().slice(0, 10)
        this.fetchReminder(date)
      }, 100)
    }
  }

  prevPage() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
      setTimeout(() => {
        const date = moment().format().slice(0, 10)
        this.fetchReminder(date)
      }, 100)
    }
  }

  redirect() {
    this.props.history.push('/login')
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  pressed() {
    const dataSubmit = {
      to: '/topics/gmi',
      notification: {
        title: 'New Reminder',
        body: `${this.state.title}`,
        mutable_content: true,
        sound: 'Tri-tone',
      },
      data: {
        route: 'Reminder',
        initialRoute: 'Reminder',
      },
    }

    this.props.sendNotif(dataSubmit)
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
      .createReminder(dataSubmit, this.props.login.token)
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
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
        const date = moment().format().slice(0, 10)
        this.fetchReminder(date)
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to create event',
        })
      })
  }

  deleteAct() {
    console.log(this.state.deleteId)
    this.setState({ isLoadingDelete: true })
    this.props
      .deleteReminder(this.state.deleteId, this.props.login.token)
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        this.setState({ isLoadingDelete: false, showDeleteModal: false })
        const date = moment().format().slice(0, 10)
        this.fetchReminder(date)
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Event successfully deleted',
        })
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to delete event',
        })
      })
  }

  toggleAddModal() {
    this.setState({
      showAddModal: !this.state.showAddModal,
    })
  }

  toggleDeleteModal(id) {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      deleteId: id,
    })
  }

  onClickDay(e) {
    this.fetchReminder(moment(e).format('YYYY-MM-DD'))
  }

  fetchReminder(day) {
    this.setState({ isLoadingFetchReminder: true })
    const dataSubmit = {
      date: day,
    }

    this.props
      .getReminderByDay(
        dataSubmit,
        this.props.login.token,
        this.state.search,
        this.state.page,
      )
      .then((res) => {
        this.setState({ isLoadingFetchReminder: false })
        this.props.newToken(res.action.payload.data.newToken)
      })
  }

  componentDidMount() {
    const date = moment().format().slice(0, 10)
    // const final = date.toString().slice(0, 10)
    this.props.getReminder(this.props.login.token).then((res) => {
      this.props.newToken(res.action.payload.data.newToken)
      this.fetchReminder(date)
    })
  }

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    const events = this.props.reminder.dataReminder

    return (
      <div>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <nav className="navbar navbar-light bg-light">
              <Button
                onClick={this.toggleAddModal}
                variant="contained"
                color="primary"
                // className="buttonAdd"
                startIcon={<Add />}
              >
                Add
              </Button>
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  name="search"
                  onChange={this.handleSearch}
                  placeholder="Type Something ..."
                  aria-label="Search"
                ></input>
                <button
                  className="btn btn-outline-danger my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </nav>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className="cardTitleWhite">Event</h4>
                    {/* <p className="cardCategoryWhite">by Admin</p> */}
                  </CardHeader>
                  <CardBody>
                    <div style={{ height: '500px' }}>
                      <Calendar
                        selectable={true}
                        onNavigate={(e) => console.log(e)}
                        // onSelectEvent={(e) => console.log(e)}
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                      />
                    </div>
                  </CardBody>
                  <CardFooter></CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className="cardTitleWhite">Today Events</h4>
                    {/* <p className="cardCategoryWhite">by Admin</p> */}
                  </CardHeader>
                  <CardBody>
                    <TableContainer>
                      <Table className={classesHead.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell component="th">
                              <h6 className="textPrimaryColor">Title</h6>
                            </TableCell>
                            {/* <TableCell component="th">
                            <h6 className="textPrimaryColor">Description</h6>
                          </TableCell> */}
                            <TableCell component="th">
                              <h6 className="textPrimaryColor">Category</h6>
                            </TableCell>
                            <TableCell component="th">
                              <h6 className="textPrimaryColor">Action</h6>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.isLoadingFetchReminder ? (
                            <center>
                              <div
                                className="d-flex align-self-center spinner-border text-white mt-2 mb-3"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            </center>
                          ) : (
                            <>
                              {this.props.reminder.dataReminderToday.length <
                              1 ? (
                                <TableRow className={classes.tableRow}>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                </TableRow>
                              ) : (
                                <>
                                  {this.props.reminder.dataReminderToday.map(
                                    (res, i) => (
                                      <TableRow
                                        className={classes.tableRow}
                                        key={i}
                                      >
                                        <TableCell component="th">
                                          <p className="textPrimaryColor">
                                            {res.title}
                                          </p>
                                        </TableCell>
                                        {/* <TableCell component="th">
                                        <p className="textPrimaryColor">
                                          {res.description}
                                        </p>
                                      </TableCell> */}
                                        <TableCell component="th">
                                          <p className="textPrimaryColor">
                                            {res.type_reminder === null
                                              ? 'Event'
                                              : res.type_reminder}
                                          </p>
                                        </TableCell>
                                        <TableCell
                                          className={classesBody.tableActions}
                                        >
                                          <Tooltip
                                            id="tooltip-top"
                                            title="Edit Task"
                                            placement="top"
                                            classes={{
                                              tooltip: classesBody.tooltip,
                                            }}
                                          >
                                            <IconButton
                                              aria-label="Edit"
                                              className={
                                                classesBody.tableActionButton
                                              }
                                            >
                                              <Link
                                                to={{
                                                  pathname: `/admin/calendar/detail`,
                                                  state: {
                                                    id: `${res.id}`,
                                                    date: `${res.date}`,
                                                    title: `${res.title}`,
                                                    type_reminder: `${res.type_reminder}`,
                                                    description: `${res.description}`,
                                                  },
                                                }}
                                              >
                                                <Visibility className="iconWhiteColor" />
                                              </Link>
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip
                                            id="tooltip-top-start"
                                            title="Remove"
                                            placement="top"
                                            classes={{
                                              tooltip: classesBody.tooltip,
                                            }}
                                          >
                                            <IconButton
                                              onClick={() =>
                                                this.toggleDeleteModal(res.id)
                                              }
                                              aria-label="Close"
                                              className={
                                                classesBody.tableActionButton
                                              }
                                            >
                                              <Delete className="iconWhiteColor" />
                                            </IconButton>
                                          </Tooltip>
                                        </TableCell>
                                      </TableRow>
                                    ),
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {this.state.isLoadingFetchReminder ? (
                      <center>
                        <div
                          className="d-flex align-self-center spinner-border text-white mt-2 mb-3"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </center>
                    ) : (
                      <div className="d-flex flex-row justify-content-end">
                        <div className="p-2 d-flex align-items-center align-self-center">
                          <h6>
                            1 - 15 of{' '}
                            {this.props.reminder.infoReminderToday.totalData}
                          </h6>
                        </div>
                        <div className="p-2">
                          <IconButton onClick={this.prevPage}>
                            <ArrowLeft
                              className="iconWhiteColor"
                              fontSize="large"
                            />
                          </IconButton>
                        </div>
                        <div>
                          <p>{this.state.page}</p>
                        </div>
                        <div className="p-2">
                          <IconButton onClick={this.nextPage}>
                            <ArrowRight
                              className="iconWhiteColor"
                              fontSize="large"
                            />
                          </IconButton>
                        </div>
                      </div>
                    )}
                  </CardBody>
                  <CardFooter></CardFooter>
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
                  <Button color="primary" onClick={this.toggleAddModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </Modal>
            {/* Delete Modal */}
            <Modal isOpen={this.state.showDeleteModal}>
              <ModalBody className="h4">Are you sure?</ModalBody>
              <ModalFooter>
                {this.state.isLoadingDelete ? (
                  <Button color="secondary" onClick={this.deleteAct}>
                    <div
                      className="spinner-border spinner-border-sm text-white"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </Button>
                ) : (
                  <Button color="secondary" onClick={this.deleteAct}>
                    Delete
                  </Button>
                )}
                <Button
                  color="primary"
                  onClick={() => this.toggleDeleteModal(0)}
                >
                  Cancel
                </Button>
              </ModalFooter>
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
const mapDispatchToProps = {
  createReminder,
  getReminderByDay,
  deleteReminder,
  getReminder,
  sendNotif,
  newToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
