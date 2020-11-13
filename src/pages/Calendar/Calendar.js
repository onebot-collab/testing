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
import RevoCalendar from 'revo-calendar'
import momentjs from 'moment'
import 'revo-calendar/dist/index.css'
// @material-ui/core components
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
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
// core components
import { createReminder, getReminderByDay } from '../../redux/actions/reminder'
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

const reso1 = new Date()
reso1.setHours(17, 0, 0)

const reso2 = new Date()
reso2.setHours(18, 15, 0)

const reso3 = new Date()
reso3.setHours(19, 30, 0)

const reso4 = new Date()
reso4.setHours(20, 45, 0)

const lunchWithKevin = new Date()
lunchWithKevin.setDate(lunchWithKevin.getDate() + 1)
lunchWithKevin.setHours(13, 0, 0)

const meetingWithVito = new Date()
meetingWithVito.setDate(meetingWithVito.getDate() + 1)
meetingWithVito.setHours(16, 30, 0)

const dinnerWithFredo = new Date()
dinnerWithFredo.setDate(dinnerWithFredo.getDate() + 1)
dinnerWithFredo.setHours(20, 0, 0)

const dayAfterTomorrow = new Date()
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

const eventsToday = [
  {
    name: 'Homer Simpson',
    date: '2020-11-19',
    allday: false,
    extra: {
      icon:
        'M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z',
      text: 'party of 5',
    },
  },
  {
    name: 'Han Solo',
    date: '2020-11-09',
    allday: false,
    extra: {
      icon:
        'M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z',
      text: 'party of 2',
    },
  },
  {
    name: 'Gandalf, the Grey',
    date: '2020-11-09',
    allday: false,
    extra: {
      icon:
        'M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z',
      text: 'party of 9',
    },
  },
  {
    name: 'Britta Perry',
    date: '2020-11-09',
    allday: false,
    extra: {
      icon:
        'M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z',
      text: 'party of 7',
    },
  },
  {
    name: 'Lunch with Michael',
    date: '2020-11-09',
    allday: false,
  },
  {
    name: 'Meeting with Vito',
    date: +meetingWithVito,
    allday: false,
  },
  {
    name: 'Dinner with Fredo',
    date: +dinnerWithFredo,
    allday: false,
  },
  {
    name: 'Day after Tomorrow',
    date: +dayAfterTomorrow,
    allday: true,
    extra: {
      icon:
        'M12 9.312l-1.762.491 1.562.881-.491.871-1.562-.881.491 1.762-.963.268-.76-2.724-2.015-1.126v1.939l2 2-.707.707-1.293-1.293v1.793h-1v-1.793l-1.293 1.293-.707-.707 2-2v-1.939l-2.015 1.126-.761 2.724-.963-.268.491-1.762-1.562.882-.491-.871 1.562-.881-1.761-.492.269-.962 2.725.76 1.982-1.11-1.983-1.109-2.724.759-.269-.962 1.762-.491-1.563-.882.491-.871 1.562.881-.49-1.762.963-.269.76 2.725 2.015 1.128v-1.94l-2-2 .707-.707 1.293 1.293v-1.793h1v1.793l1.293-1.293.707.707-2 2v1.94l2.016-1.127.76-2.725.963.269-.492 1.761 1.562-.881.491.871-1.562.881 1.762.492-.269.962-2.725-.76-1.982 1.11 1.982 1.109 2.725-.76.269.963zm4-5.812v7.525c0 1.57-.514 2.288-1.41 3.049-1.011.859-1.59 2.107-1.59 3.426 0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5c0-1.319-.579-2.567-1.589-3.426-.897-.762-1.411-1.48-1.411-3.049v-7.525c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5zm5 0v7.525c0 .587.258 1.145.705 1.525 1.403 1.192 2.295 2.966 2.295 4.95 0 3.59-2.909 6.5-6.5 6.5s-6.5-2.91-6.5-6.5c0-1.984.892-3.758 2.295-4.949.447-.381.705-.94.705-1.526v-7.525c0-1.934 1.567-3.5 3.5-3.5s3.5 1.566 3.5 3.5zm0 14c0 1.934-1.567 3.5-3.5 3.5s-3.5-1.566-3.5-3.5c0-1.141.599-2.084 1.393-2.781 1.01-.889 1.607-1.737 1.607-3.221v-.498h1v.498c0 1.486.595 2.33 1.607 3.221.794.697 1.393 1.64 1.393 2.781z',
      text: '-30º C',
    },
  },
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
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.addReminder = this.addReminder.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  redirect() {
    this.props.history.push('/login')
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
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

  onClickDay(e) {
    console.log(e)
    this.fetchReminder(momentjs(e).format('YYYY-MM-DD'))
  }

  fetchReminder(day) {
    this.setState({ isLoadingFetchReminder: true })
    const dataSubmit = {
      date: day,
    }

    this.props.getReminderByDay(dataSubmit).then(() => {
      this.setState({ isLoadingFetchReminder: false })
    })
  }

  componentDidMount() {
    const date = momentjs().format().slice(0, 10)
    // const final = date.toString().slice(0, 10)
    this.fetchReminder(date)
  }

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
                    <RevoCalendar
                      events={eventsToday}
                      style={{
                        borderRadius: '5px',

                        border: '5px solid var(--primaryColor)',
                      }}
                      highlightToday
                      lang="en"
                      primaryColor="#ef5350"
                      secondaryColor="#303030"
                      todayColor="#b71c1c"
                      textColor="#f5f5f5"
                      indicatorColor="orange"
                      animationSpeed={300}
                      sidebarWidth={180}
                      detailWidth={280}
                      showDetailToggler={false}
                      showSidebarToggler
                      onePanelAtATime={false}
                      allowDeleteEvent
                      allowAddEvent
                      openDetailsOnDateSelection={false}
                      timeFormat24
                      dateSelected={(e) => this.onClickDay(e)}
                      showAllDayLabel={false}
                      detailDateFormat="DD/MM/YYYY"
                      // deleteEvent={deleteEvent}
                      // addEvent={addEvent}
                    />
                  </CardBody>
                  <CardFooter></CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
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
                                <TableCell className={classesBody.tableActions}>
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
                                      <TableCell component="th">
                                        <p className="textPrimaryColor">
                                          {res.description}
                                        </p>
                                      </TableCell>
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
                                                  date: `${res.date}`,
                                                  title: `${res.title}`,
                                                  type_reminder: `${res.type_reminder}`,
                                                },
                                              }}
                                            >
                                              <Visibility className="iconWhiteColor" />
                                            </Link>
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
const mapDispatchToProps = { createReminder, getReminderByDay }

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
