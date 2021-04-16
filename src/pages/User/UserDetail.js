/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable block-scoped-var */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// @material-ui/core components
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
// import InputLabel from '@material-ui/core/InputLabel'

import Email from '@material-ui/icons/Email'
import Phone from '@material-ui/icons/Phone'
import Today from '@material-ui/icons/Today'
import Cake from '@material-ui/icons/Cake'
import Timer from '@material-ui/icons/Timer'
import Delete from '@material-ui/icons/Delete'
import Home from '@material-ui/icons/Home'
import AccountTree from '@material-ui/icons/AccountTree'
// core components
import {
  Col,
  Row,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  CustomInput,
} from 'reactstrap'
import swal from 'sweetalert2'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import events from './events'
import { getProfile, deleteUser, updateUser } from '../../redux/actions/user'
import { getDepartment } from '../../redux/actions/department'
import { newToken } from '../../redux/actions/login'
import { sendNotif } from '../../redux/actions/fcm'
import { getRosterByUser, updateRosterUser } from '../../redux/actions/presence'
// import avatar from '../../assets/img/faces/marc.jpg'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
// import CustomInput from '../../components/CustomInput/CustomInput'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardAvatar from '../../components/Card/CardAvatar'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: `${this.props.location.state.name}`,
      email: `${this.props.location.state.email}`,
      phone: `${this.props.location.state.phone}`,
      password: '',
      passcode: '',
      birthDate: `${moment(this.props.location.state.birthdate).format(
        'YYYY-MM-DD',
      )}`,
      joined_date: `${moment(this.props.location.state.joined_date).format(
        'YYYY-MM-DD',
      )}`,
      address: `${this.props.location.state.address}`,
      role: `${this.props.location.state.role}`,
      department_id: `${this.props.location.state.department_id}`,
      showUpdateModal: false,
      showRosterModal: false,
      showAddRosterModal: false,
      showDeleteRosterModal: false,
      showDeleteModal: false,
      showEditRoster: false,
      isLoadingFetch: true,
      isLoadingDelete: false,
      isLoadingUpdate: false,
      nameInput: `${this.props.location.state.name}`,
      emailInput: `${this.props.location.state.email}`,
      passwordInput: '',
      passcodeInput: '',
      phoneInput: `${this.props.location.state.phone}`,
      roleInput: `${this.props.location.state.role}`,
      departmentInput: `${this.props.location.state.department_id}`,
      timeTypeInput: '',
      joinedDateInput: `${moment(this.props.location.state.joined_date).format(
        'YYYY-MM-DD',
      )}`,
      birthDateInput: `${moment(this.props.location.state.birthdate).format(
        'YYYY-MM-DD',
      )}`,
      addressInput: `${this.props.location.state.address}`,
      avatar: null,
      dateRoster: `${moment().format('YYYY-MM-DD')}`,
      isLoadingRoster: false,
      editDate: '',
      editCheckIn: '',
      editCheckOut: '',
      editCheckInOvertime: '',
      editCheckOutOvertime: '',
      editOvertime: false,
      addRosterType: 1,
      addRosterMonday: false,
      addRosterTuesday: false,
      addRosterWednesday: false,
      addRosterThursday: false,
      addRosterFriday: false,
      addRosterSaturday: false,
      addRosterSunday: false,
      addRosterStartDate: '',
      addRosterEndDate: '',
      addRosterCheckIn: '',
      addRosterCheckOut: '',
      addRosterOvertime: false,
      addRosterCheckInOvertime: '',
      addRosterCheckOutOvertime: '',
      deleteOption: 1,
      deleteStartDate: '',
      deleteEndDate: '',
    }
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.toggleAddRosterModal = this.toggleAddRosterModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fetchProfile = this.fetchProfile.bind(this)
    this.toggleRosterModal = this.toggleRosterModal.bind(this)
    this.nextMonthData = this.nextMonthData.bind(this)
    this.toggleEditRoster = this.toggleEditRoster.bind(this)
    this.onClickEvent = this.onClickEvent.bind(this)
    this.updateRoster = this.updateRoster.bind(this)
    this.addRoster = this.addRoster.bind(this)
    this.toggleDeleteRosterModal = this.toggleDeleteRosterModal.bind(this)
    this.deleteRoster = this.deleteRoster.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleUpdateModal() {
    this.setState({
      showUpdateModal: !this.state.showUpdateModal,
    })
  }

  toggleRosterModal() {
    this.setState({
      showRosterModal: !this.state.showRosterModal,
    })
  }

  toggleAddRosterModal() {
    this.setState({
      showAddRosterModal: !this.state.showAddRosterModal,
    })
  }

  toggleEditRoster() {
    this.setState({
      showEditRoster: !this.state.showEditRoster,
    })
  }

  toggleDeleteModal() {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
    })
  }

  toggleDeleteRosterModal() {
    this.setState({
      showDeleteRosterModal: !this.state.showDeleteRosterModal,
    })
  }

  redirect() {
    this.props.history.push('/login')
  }

  fetchProfile() {
    this.setState({ isLoadingFetch: true })
    this.props
      .getProfile(this.props.location.state.id, this.props.login.token)
      .then((res) => {
        this.props
          .getDepartment(res.action.payload.data.newToken)
          .then((res) => {
            this.props
              .getRosterByUser(
                res.action.payload.data.newToken,
                parseInt(this.props.location.state.id),
                `${moment().format('YYYY-MM')}-01`,
              )
              .then((res) => {
                this.setState({ isLoadingFetch: false })
                this.props.newToken(res.action.payload.data.newToken)
              })
          })
      })
  }

  pressedDelete() {
    const dataSubmit = {
      to: '/topics/gmiadmin',
      notification: {
        title: 'A User has been removed',
        body: `${this.props.login.dataLogin.name} removed ${this.props.user.dataProfile[0].name}`,
        mutable_content: true,
        sound: 'Tri-tone',
      },
      data: {
        route: 'HomeDrawer',
        initialRoute: 'HomeDrawer',
      },
    }

    this.props.sendNotif(dataSubmit)
  }

  delete() {
    this.setState({ isLoadingDelete: true })
    const id = `${this.props.location.state.id}`
    this.props
      .deleteUser(id, this.props.login.token)
      .then((res) => {
        this.setState({ isLoadingDelete: false })
        this.props.history.push('/admin/user')
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User successsfully deleted',
        })
        this.props.newToken(res.action.payload.data.newToken)
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to delete user',
        })
      })
  }

  updateRoster() {
    this.setState({ isLoadingFetch: true, showEditRoster: false })
    if (this.state.editOvertime) {
      var dataSubmit = {
        date: this.state.editDate,
        type: 1,
        checkIn: this.state.editCheckIn,
        checkOut: this.state.editCheckOut,
        earlyCheckIn:
          this.state.editCheckInOvertime === ''
            ? '0'
            : this.state.editCheckInOvertime,
        lateCheckOut:
          this.state.editCheckOutOvertime === ''
            ? '0'
            : this.state.editCheckOutOvertime,
      }
    } else {
      var dataSubmit = {
        date: this.state.editDate,
        type: 1,
        checkIn: this.state.editCheckIn,
        checkOut: this.state.editCheckOut,
        earlyCheckIn: '0',
        lateCheckOut: '0',
      }
    }

    this.props
      .updateRosterUser(
        this.props.login.token,
        dataSubmit,
        this.props.location.state.id,
      )
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Roster Deleted',
        })
        this.props
          .getRosterByUser(
            res.action.payload.data.newToken,
            parseInt(this.props.location.state.id),
            moment().format().slice(0, 10),
          )
          .then((res) => {
            this.setState({ isLoadingFetch: false })
            this.props.newToken(res.action.payload.data.newToken)
          })
      })
      .catch((res) => {
        this.setState({ isLoadingFetch: false })
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: `${res.response.data.message}`,
        })
      })
  }

  addRoster() {
    this.setState({ isLoadingFetch: true, showAddRosterModal: false })
    var dataSubmit = {
      type: parseInt(this.state.addRosterType),
      date: this.state.addRosterStartDate,
      checkIn: this.state.addRosterCheckIn,
      checkOut: this.state.addRosterCheckOut,
      earlyCheckIn:
        this.state.addRosterCheckInOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckInOvertime,
      lateCheckOut:
        this.state.addRosterCheckOutOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckOutOvertime,
    }

    var mondayData = {
      day: 1,
      type: 3,
      startDate: this.state.addRosterStartDate,
      endDate: this.state.addRosterEndDate,
      checkIn: this.state.addRosterMonday ? this.state.addRosterCheckIn : '0',
      checkOut: this.state.addRosterMonday ? this.state.addRosterCheckOut : '0',
      earlyCheckIn:
        this.state.addRosterCheckInOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckInOvertime,
      lateCheckOut:
        this.state.addRosterCheckOutOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckOutOvertime,
    }

    var tuesdayData = {
      day: 2,
      type: 3,
      startDate: this.state.addRosterStartDate,
      endDate: this.state.addRosterEndDate,
      checkIn: this.state.addRosterTuesday ? this.state.addRosterCheckIn : '0',
      checkOut: this.state.addRosterTuesday
        ? this.state.addRosterCheckOut
        : '0',
      earlyCheckIn:
        this.state.addRosterCheckInOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckInOvertime,
      lateCheckOut:
        this.state.addRosterCheckOutOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckOutOvertime,
    }

    var wednesdayData = {
      day: 3,
      type: 3,
      startDate: this.state.addRosterStartDate,
      endDate: this.state.addRosterEndDate,
      checkIn: this.state.addRosterWednesday
        ? this.state.addRosterCheckIn
        : '0',
      checkOut: this.state.addRosterWednesday
        ? this.state.addRosterCheckOut
        : '0',
      earlyCheckIn:
        this.state.addRosterCheckInOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckInOvertime,
      lateCheckOut:
        this.state.addRosterCheckOutOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckOutOvertime,
    }

    var thursdayData = {
      day: 4,
      type: 3,
      startDate: this.state.addRosterStartDate,
      endDate: this.state.addRosterEndDate,
      checkIn: this.state.addRosterThursday ? this.state.addRosterCheckIn : '0',
      checkOut: this.state.addRosterThursday
        ? this.state.addRosterCheckOut
        : '0',
      earlyCheckIn:
        this.state.addRosterCheckInOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckInOvertime,
      lateCheckOut:
        this.state.addRosterCheckOutOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckOutOvertime,
    }

    var fridayData = {
      day: 5,
      type: 3,
      startDate: this.state.addRosterStartDate,
      endDate: this.state.addRosterEndDate,
      checkIn: this.state.addRosterFriday ? this.state.addRosterCheckIn : '0',
      checkOut: this.state.addRosterFriday ? this.state.addRosterCheckOut : '0',
      earlyCheckIn:
        this.state.addRosterCheckInOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckInOvertime,
      lateCheckOut:
        this.state.addRosterCheckOutOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckOutOvertime,
    }

    var saturdayData = {
      day: 6,
      type: 3,
      startDate: this.state.addRosterStartDate,
      endDate: this.state.addRosterEndDate,
      checkIn: this.state.addRosterSaturday ? this.state.addRosterCheckIn : '0',
      checkOut: this.state.addRosterSaturday
        ? this.state.addRosterCheckOut
        : '0',
      earlyCheckIn:
        this.state.addRosterCheckInOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckInOvertime,
      lateCheckOut:
        this.state.addRosterCheckOutOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckOutOvertime,
    }

    var sundayData = {
      day: 0,
      type: 3,
      startDate: this.state.addRosterStartDate,
      endDate: this.state.addRosterEndDate,
      checkIn: this.state.addRosterSunday ? this.state.addRosterCheckIn : '0',
      checkOut: this.state.addRosterSunday ? this.state.addRosterCheckOut : '0',
      earlyCheckIn:
        this.state.addRosterCheckInOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckInOvertime,
      lateCheckOut:
        this.state.addRosterCheckOutOvertime === '' ||
        this.state.addRosterOvertime === false
          ? '0'
          : this.state.addRosterCheckOutOvertime,
    }

    if (this.state.addRosterType != 3) {
      this.props
        .updateRosterUser(
          this.props.login.token,
          dataSubmit,
          parseInt(this.props.location.state.id),
        )
        .then((res) => {
          swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Roster Updated',
          })
          this.props
            .getRosterByUser(
              res.action.payload.data.newToken,
              parseInt(this.props.location.state.id),
              `${moment().format('YYYY-MM')}-01`,
            )
            .then((res) => {
              this.props.newToken(res.action.payload.data.newToken)
              this.setState({
                isLoadingFetch: false,
                addRosterStartDate: '',
                addRosterEndDate: '',
                addRosterCheckIn: '',
                addRosterCheckOut: '',
                addRosterCheckInOvertime: '',
                addRosterCheckOutOvertime: '',
                addRosterOvertime: false,
                addRosterType: 1,
                addRosterMonday: false,
                addRosterTuesday: false,
                addRosterWednesday: false,
                addRosterThursday: false,
                addRosterFriday: false,
                addRosterSaturday: false,
                addRosterSunday: false,
              })
            })
            .catch((res) => {
              this.setState({ isLoadingFetch: false })
            })
        })
        .catch((res) => {
          swal.fire({
            icon: 'error',
            title: 'Failed',
            text: `${res.response.data.message}`,
          })
          this.setState({ isLoadingFetch: false })
        })
    } else {
      this.props
        .updateRosterUser(
          this.props.login.token,
          mondayData,
          parseInt(this.props.location.state.id),
        )
        .then((res) => {
          this.props
            .updateRosterUser(
              res.action.payload.data.newToken,
              tuesdayData,
              parseInt(this.props.location.state.id),
            )
            .then((res) => {
              this.props
                .updateRosterUser(
                  res.action.payload.data.newToken,
                  wednesdayData,
                  parseInt(this.props.location.state.id),
                )
                .then((res) => {
                  this.props
                    .updateRosterUser(
                      res.action.payload.data.newToken,
                      thursdayData,
                      parseInt(this.props.location.state.id),
                    )
                    .then((res) => {
                      this.props
                        .updateRosterUser(
                          res.action.payload.data.newToken,
                          fridayData,
                          parseInt(this.props.location.state.id),
                        )
                        .then((res) => {
                          this.props
                            .updateRosterUser(
                              res.action.payload.data.newToken,
                              saturdayData,
                              parseInt(this.props.location.state.id),
                            )
                            .then((res) => {
                              this.props
                                .updateRosterUser(
                                  res.action.payload.data.newToken,
                                  sundayData,
                                  parseInt(this.props.location.state.id),
                                )
                                .then((res) => {
                                  swal.fire({
                                    icon: 'success',
                                    title: 'Success',
                                    text: 'Roster Updated',
                                  })
                                  this.props
                                    .getRosterByUser(
                                      res.action.payload.data.newToken,
                                      parseInt(this.props.location.state.id),
                                      `${moment().format('YYYY-MM')}-01`,
                                    )
                                    .then((res) => {
                                      this.props.newToken(
                                        res.action.payload.data.newToken,
                                      )
                                      this.setState({
                                        isLoadingFetch: false,
                                        addRosterStartDate: '',
                                        addRosterEndDate: '',
                                        addRosterCheckIn: '',
                                        addRosterCheckOut: '',
                                        addRosterCheckInOvertime: '',
                                        addRosterCheckOutOvertime: '',
                                        addRosterOvertime: false,
                                        addRosterType: 1,
                                        addRosterMonday: false,
                                        addRosterTuesday: false,
                                        addRosterWednesday: false,
                                        addRosterThursday: false,
                                        addRosterFriday: false,
                                        addRosterSaturday: false,
                                        addRosterSunday: false,
                                      })
                                    })
                                    .catch((res) => {
                                      this.setState({ isLoadingFetch: false })
                                    })
                                })
                                .catch((res) => {
                                  swal.fire({
                                    icon: 'error',
                                    title: 'Failed',
                                    text: `${res.response.data.message}`,
                                  })
                                  this.setState({ isLoadingFetch: false })
                                })
                            })
                            .catch((res) => {
                              swal.fire({
                                icon: 'error',
                                title: 'Failed',
                                text: `${res.response.data.message}`,
                              })
                              this.setState({ isLoadingFetch: false })
                            })
                        })
                        .catch((res) => {
                          swal.fire({
                            icon: 'error',
                            title: 'Failed',
                            text: `${res.response.data.message}`,
                          })
                          this.setState({ isLoadingFetch: false })
                        })
                    })
                    .catch((res) => {
                      swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: `${res.response.data.message}`,
                      })
                      this.setState({ isLoadingFetch: false })
                    })
                })
                .catch((res) => {
                  swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: `${res.response.data.message}`,
                  })
                  this.setState({ isLoadingFetch: false })
                })
            })
            .catch((res) => {
              swal.fire({
                icon: 'error',
                title: 'Failed',
                text: `${res.response.data.message}`,
              })
              this.setState({ isLoadingFetch: false })
            })
        })
        .catch((res) => {
          swal.fire({
            icon: 'error',
            title: 'Failed',
            text: `${res.response.data.message}`,
          })
          this.setState({ isLoadingFetch: false })
        })
    }
  }

  nextMonthData(e) {
    this.setState({ isLoadingRoster: true })
    const year = e.toString().slice(11, 15)
    const monthStr = e.toString().slice(4, 7)
    if (monthStr === 'Jan') {
      var month = '01'
    } else if (monthStr === 'Feb') {
      var month = '02'
    } else if (monthStr === 'Mar') {
      var month = '03'
    } else if (monthStr === 'Apr') {
      var month = '04'
    } else if (monthStr === 'May') {
      var month = '05'
    } else if (monthStr === 'Jun') {
      var month = '06'
    } else if (monthStr === 'Jul') {
      var month = '07'
    } else if (monthStr === 'Aug') {
      var month = '08'
    } else if (monthStr === 'Sep') {
      var month = '09'
    } else if (monthStr === 'Oct') {
      var month = '10'
    } else if (monthStr === 'Nov') {
      var month = '11'
    } else if (monthStr === 'Dec') {
      var month = '12'
    }

    const finalDate = `${year}-${month}-01`

    this.props
      .getRosterByUser(
        this.props.login.token,
        this.props.location.state.id,
        finalDate,
      )
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        this.setState({ isLoadingRoster: false })
      })
  }

  deleteRoster() {
    this.setState({
      isLoadingFetch: true,
      showEditRoster: false,
      showDeleteRosterModal: false,
    })
    if (this.state.deleteOption == 1) {
      var dataSubmit = {
        type: 1,
        date: this.state.editDate,
        checkIn: '0',
        checkOut: '0',
        earlyCheckIn: '0',
        lateCheckOut: '0',
      }
    } else if (this.state.deleteOption == 2) {
      var dataSubmit = {
        type: 4,
        date: this.state.editDate,
        checkIn: '0',
        checkOut: '0',
        earlyCheckIn: '0',
        lateCheckOut: '0',
      }
    } else {
      var dataSubmit = {
        type: 4,
        startDate: this.state.deleteStartDate,
        endDate: this.state.deleteEndDate,
        checkIn: '0',
        checkOut: '0',
        earlyCheckIn: '0',
        lateCheckOut: '0',
      }
    }

    this.props
      .updateRosterUser(
        this.props.login.token,
        dataSubmit,
        parseInt(this.props.location.state.id),
      )
      .then((res) => {
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Roster Updated',
        })
        this.props
          .getRosterByUser(
            res.action.payload.data.newToken,
            parseInt(this.props.location.state.id),
            `${moment().format('YYYY-MM')}-01`,
          )
          .then((res) => {
            this.setState({ isLoadingFetch: false })
            this.props.newToken(res.action.payload.data.newToken)
          })
          .catch((res) => {
            swal.fire({
              icon: 'error',
              title: 'Failed',
              text: `${res.response.data.message}`,
            })
            this.setState({ isLoadingFetch: false })
          })
      })
      .catch((res) => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: `${res.response.data.message}`,
        })
        this.setState({ isLoadingFetch: false })
      })
  }

  onClickEvent(e) {
    this.setState({
      editDate: e.start,
      editCheckIn: e.checkIn,
      editCheckOut: e.checkOut,
      editCheckInOvertime: e.earlyCheckIn,
      editCheckOutOvertime: e.lateCheckOut,
      editOvertime: e.overtime === 1,
    })
    this.toggleEditRoster()
  }

  componentDidMount() {
    this.fetchProfile()
  }

  render() {
    const localizer = momentLocalizer(moment)
    const departmentData = this.props.department.dataDepartment
    const departmentList = departmentData.map((val) => (
      <option key={val.id} value={val.id}>
        {val.name}
      </option>
    ))
    return (
      <>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <div>
            {this.state.isLoadingFetch ? (
              <center>
                <div
                  className="d-flex align-self-center spinner-border text-dark mt-2 mb-3"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </center>
            ) : (
              <>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <Card>
                      <CardHeader color="danger">
                        <h4 className="cardTitleWhite">Edit Profile</h4>
                        <p className="cardCategoryWhite">
                          Customize user profile
                        </p>
                      </CardHeader>
                      <CardBody>
                        <Form>
                          <Row form>
                            <Col xs={12} sm={12} md={4}>
                              {' '}
                              <FormGroup>
                                <Label for="exampleEmail">Name</Label>
                                <Input
                                  value={this.state.nameInput}
                                  name="nameInput"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input
                                  value={this.state.emailInput}
                                  name="emailInput"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Phone</Label>
                                <Input
                                  value={this.state.phoneInput}
                                  name="phoneInput"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                  value={this.state.passwordInput}
                                  type="password"
                                  name="passwordInput"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="examplePassword">Passcode</Label>
                                <Input
                                  value={this.state.passcodeInput}
                                  type="password"
                                  name="passcodeInput"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleSelect">Role</Label>
                                <Input
                                  value={this.state.roleInput}
                                  type="select"
                                  name="roleInput"
                                  id="exampleSelect"
                                  onChange={this.handleChange}
                                >
                                  <option key={1} value={1}>
                                    Admin
                                  </option>
                                  <option key={2} value={2}>
                                    User
                                  </option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleSelect">Department</Label>
                                <Input
                                  value={this.state.departmentInput}
                                  type="select"
                                  name="departmentInput"
                                  onChange={this.handleChange}
                                  id="exampleSelect"
                                >
                                  {departmentList}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleCheckbox">Time Type</Label>
                                <div className="d-flex flex-column">
                                  <CustomInput
                                    type="radio"
                                    id="exampleCustomRadio2"
                                    name="timeTypeInput"
                                    label="Free Hours"
                                    value={1}
                                    onChange={(e) => this.handleChange(e)}
                                    inline
                                  />
                                  <CustomInput
                                    type="radio"
                                    id="exampleCustomRadio"
                                    name="timeTypeInput"
                                    label="Office Hours"
                                    value={3}
                                    onChange={(e) => this.handleChange(e)}
                                    inline
                                  />
                                  <CustomInput
                                    type="radio"
                                    id="exampleCustomRadio3"
                                    name="timeTypeInput"
                                    label="Security"
                                    value={2}
                                    onChange={(e) => this.handleChange(e)}
                                    inline
                                  />
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleDate">Joined Date</Label>
                                <Input
                                  value={this.state.joinedDateInput}
                                  type="date"
                                  name="joinedDateInput"
                                  id="exampleDate"
                                  placeholder="date placeholder"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleDate">Birth Date</Label>
                                <Input
                                  value={this.state.birthDateInput}
                                  type="date"
                                  name="birthDateInput"
                                  onChange={(e) => this.handleChange(e)}
                                  id="exampleDate"
                                  placeholder="date placeholder"
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              {' '}
                              <FormGroup>
                                <Label for="exampleEmail">Address</Label>
                                <Input
                                  value={this.state.addressInput}
                                  name="addressInput"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col xs={12} sm={12} md={12}>
                              {' '}
                              <FormGroup>
                                <Label for="exampleCustomFileBrowser">
                                  Profile Picture
                                </Label>
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="avatar"
                                  onChange={(e) =>
                                    this.setState({
                                      avatar: e.target.files[0],
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button
                          onClick={this.toggleUpdateModal}
                          color="primary"
                        >
                          Update Profile
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                      <CardAvatar profile>
                        <a
                          target="_blank"
                          href={`http://10.7.10.15:8443/node/${this.props.user.dataProfile[0].photo_url}?boAgRwlfX5=${this.props.login.token}`}
                        >
                          <img
                            src={`http://10.7.10.15:8443/node/${this.props.user.dataProfile[0].photo_url}?boAgRwlfX5=${this.props.login.token}`}
                            alt="img"
                          />
                        </a>
                      </CardAvatar>
                      <CardBody profile>
                        <h2 className="cardTitle">
                          {this.props.user.dataProfile[0].name}
                        </h2>
                        <h6 className="cardCategory">
                          {this.props.user.dataProfile[0].departmentName}
                        </h6>
                        <div>
                          <List>
                            <ListItem>
                              <ListItemIcon>
                                <Email />
                              </ListItemIcon>
                              <ListItemText>
                                {this.props.user.dataProfile[0].email}
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Phone />
                              </ListItemIcon>
                              <ListItemText>
                                {this.props.user.dataProfile[0].phone}
                              </ListItemText>
                            </ListItem>
                            {/* <ListItem>
                              <ListItemIcon>
                                <Today />
                              </ListItemIcon>
                              <ListItemText>
                                {this.props.user.dataProfile[0].joined_date.slice(
                                  0,
                                  10,
                                )}
                              </ListItemText>
                            </ListItem> */}
                            <ListItem>
                              <ListItemIcon>
                                <Cake />
                              </ListItemIcon>
                              <ListItemText>
                                {this.props.user.dataProfile[0].birthdate.slice(
                                  0,
                                  10,
                                )}
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Timer />
                              </ListItemIcon>
                              <ListItemText>
                                {this.props.user.dataProfile[0].typeTime}
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Home />
                              </ListItemIcon>
                              <ListItemText>
                                {this.props.user.dataProfile[0].address}
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <AccountTree />
                              </ListItemIcon>
                              <ListItemText>
                                {this.props.user.dataProfile[0].role === 1
                                  ? 'Admin'
                                  : 'User'}
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <AccountTree />
                              </ListItemIcon>
                              <ListItemText>
                                <Link
                                  to="/admin/user/resume"
                                  className="btn btn-danger m-2 my-sm-0"
                                >
                                  Download Resume
                                </Link>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <AccountTree />
                              </ListItemIcon>
                              <ListItemText>
                                <Link
                                  to="/admin/user/editPersonal"
                                  className="btn btn-danger m-2 my-sm-0"
                                >
                                  EDIT
                                </Link>
                              </ListItemText>
                            </ListItem>
                          </List>
                        </div>
                      </CardBody>
                      <CardFooter>
                        <Button
                          onClick={this.toggleDeleteModal}
                          color="primary"
                        >
                          Delete {this.props.user.dataProfile[0].name}
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="danger">
                        <h4 className="cardTitleWhite">
                          Roster {this.props.user.dataProfile[0].name}
                        </h4>
                        <p className="cardCategoryWhite">
                          Customize user profile
                        </p>
                      </CardHeader>
                      <CardBody>
                        <div style={{ height: '700px' }}>
                          <Calendar
                            selectable={true}
                            onSelectEvent={(e) => this.onClickEvent(e)}
                            onNavigate={(e) => this.nextMonthData(e)}
                            localizer={localizer}
                            events={this.props.presence.dataUserRoster}
                            startAccessor="start"
                            endAccessor="end"
                          />
                        </div>
                      </CardBody>
                      <CardFooter>
                        <Button
                          onClick={this.toggleAddRosterModal}
                          color="primary"
                        >
                          Add Roster
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </GridContainer>

                {/* Update Modal */}
                <Modal isOpen={this.state.showUpdateModal}>
                  <ModalBody className="h4">
                    Update Profile {this.props.user.dataProfile[0].name} ?
                  </ModalBody>
                  <ModalFooter>
                    {this.state.isLoadingUpdate ? (
                      <Button color="secondary">
                        <div
                          className="spinner-border spinner-border-sm text-danger"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </Button>
                    ) : (
                      <Button
                        color="secondary"
                        onClick={() => {
                          this.toggleUpdateModal(0)
                          this.update()
                        }}
                      >
                        Submit
                      </Button>
                    )}
                    <Button
                      color="primary"
                      onClick={() => this.toggleUpdateModal(0)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>

                {/* Roster Modal */}
                <Modal isOpen={this.state.showRosterModal}>
                  <ModalBody className="h4">
                    Roster Detail {this.props.user.dataProfile[0].name} ?
                  </ModalBody>
                  <ModalFooter>
                    {this.state.isLoadingUpdate ? (
                      <Button color="secondary">
                        <div
                          className="spinner-border spinner-border-sm text-danger"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </Button>
                    ) : (
                      <Button
                        color="secondary"
                        onClick={() => {
                          this.toggleRosterModal()
                          this.updateRoster()
                        }}
                      >
                        Submit
                      </Button>
                    )}
                    <Button
                      color="primary"
                      onClick={() => this.toggleRosterModal()}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>

                {/* Delete Modal */}
                <Modal isOpen={this.state.showDeleteModal}>
                  <ModalBody className="h4">
                    Are you sure to Delete {this.props.user.dataProfile[0].name}{' '}
                    ?
                  </ModalBody>
                  <ModalFooter>
                    {this.state.isLoadingDelete ? (
                      <Button color="secondary">
                        <div
                          className="spinner-border spinner-border-sm text-danger"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </Button>
                    ) : (
                      <Button color="secondary" onClick={() => this.delete()}>
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

                {/* Delete Roster Modal */}
                <Modal isOpen={this.state.showDeleteRosterModal}>
                  <ModalHeader className="h4">Delete Option</ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <div className="d-flex flex-column">
                        <CustomInput
                          type="radio"
                          id="exampleCustomRadio4"
                          name="deleteOption"
                          label="Only this"
                          value={1}
                          onChange={(e) => this.handleChange(e)}
                        />
                        <CustomInput
                          type="radio"
                          id="exampleCustomRadio5"
                          name="deleteOption"
                          label="All current"
                          value={2}
                          onChange={(e) => this.handleChange(e)}
                        />
                        <CustomInput
                          type="radio"
                          id="exampleCustomRadio6"
                          name="deleteOption"
                          label="Custom"
                          value={3}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </FormGroup>
                    {parseInt(this.state.deleteOption) === 3 ? (
                      <Row>
                        <Col>
                          <Label for="exampleSelect">Start Date</Label>
                          <Input
                            value={this.state.deleteStartDate}
                            type="date"
                            name="deleteStartDate"
                            className="mb-2 shadow-none"
                            onChange={this.handleChange}
                          />
                        </Col>
                        <Col>
                          <Label for="exampleSelect">End Date</Label>
                          <Input
                            value={this.state.deleteEndDate}
                            type="date"
                            name="deleteEndDate"
                            className="mb-2 shadow-none"
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                    ) : (
                      <></>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.deleteRoster}>
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      onClick={this.toggleDeleteRosterModal}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>

                {/* EDIT MODAL */}
                <Modal isOpen={this.state.showEditRoster}>
                  <div className="d-flex justify-content-between row px-4 pt-4">
                    <div>Roster Scedhule</div>
                    <div>
                      <Delete onClick={this.toggleDeleteRosterModal} />
                    </div>
                  </div>
                  <Form>
                    <ModalBody>
                      <Row>
                        <Col>
                          <Label for="exampleSelect">Check In</Label>
                          <Input
                            value={this.state.editCheckIn}
                            type="time"
                            name="editCheckIn"
                            className="mb-2 shadow-none"
                            onChange={this.handleChange}
                          />
                        </Col>
                        <Col>
                          <Label for="exampleSelect">Check Out</Label>
                          <Input
                            value={this.state.editCheckOut}
                            type="time"
                            name="editCheckOut"
                            className="mb-2 shadow-none"
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="ml-3">
                          <Label check>
                            <Input
                              checked={this.state.editOvertime}
                              type="checkbox"
                              onChange={() => {
                                this.setState({
                                  editOvertime: !this.state.editOvertime,
                                })
                              }}
                            />{' '}
                            Overtime
                          </Label>
                        </Col>
                      </Row>
                      {this.state.editOvertime ? (
                        <Row>
                          <Col>
                            <Label for="exampleSelect">Check In Overtime</Label>
                            <Input
                              value={this.state.editCheckInOvertime}
                              type="time"
                              name="editCheckInOvertime"
                              className="mb-2 shadow-none"
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col>
                            <Label for="exampleSelect">
                              Check Out Overtime
                            </Label>
                            <Input
                              value={this.state.editCheckOutOvertime}
                              type="time"
                              name="editCheckOutOvertime"
                              className="mb-2 shadow-none"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                      ) : (
                        <></>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.updateRoster}>
                        Submit
                      </Button>
                      {/* <Button
                        color="secondary"
                        onClick={this.toggleDeleteRosterModal}
                      >
                        Delete
                      </Button> */}
                      <Button color="primary" onClick={this.toggleEditRoster}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Form>
                </Modal>

                {/* ADD ROSTER */}
                <Modal isOpen={this.state.showAddRosterModal}>
                  <ModalHeader className="h1">Add Roster</ModalHeader>
                  <Form>
                    <ModalBody>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="exampleSelect">Type</Label>
                            <Input
                              value={this.state.addRosterType}
                              type="select"
                              name="addRosterType"
                              id="exampleSelect"
                              onChange={this.handleChange}
                            >
                              <option key={1} value={1}>
                                Once
                              </option>
                              <option key={2} value={2}>
                                Monthly
                              </option>
                              <option key={3} value={3}>
                                Custom
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      {parseInt(this.state.addRosterType) === 3 ? (
                        <>
                          <Row>
                            <Col>
                              <Label for="exampleSelect">Start Date</Label>
                              <Input
                                value={this.state.addRosterStartDate}
                                type="date"
                                name="addRosterStartDate"
                                className="mb-2 shadow-none"
                                onChange={this.handleChange}
                              />
                            </Col>
                            <Col>
                              <Label for="exampleSelect">End Date</Label>
                              <Input
                                value={this.state.addRosterEndDate}
                                type="date"
                                name="addRosterEndDate"
                                className="mb-2 shadow-none"
                                onChange={this.handleChange}
                              />
                            </Col>
                          </Row>
                          <Row form className="mb-3">
                            <Col className="ml-4">
                              <div className="d-flex align-items-center">
                                <Input
                                  checked={this.state.addRosterMonday}
                                  type="checkbox"
                                  onChange={() => {
                                    this.setState({
                                      addRosterMonday: !this.state
                                        .addRosterMonday,
                                    })
                                  }}
                                />
                                <div>Monday</div>
                              </div>
                            </Col>
                            <Col>
                              <div className="d-flex align-items-center">
                                <Input
                                  checked={this.state.addRosterTuesday}
                                  type="checkbox"
                                  onChange={() => {
                                    this.setState({
                                      addRosterTuesday: !this.state
                                        .addRosterTuesday,
                                    })
                                  }}
                                />
                                <div>Tuesday</div>
                              </div>
                            </Col>
                            <Col>
                              <div className="d-flex align-items-center">
                                <Input
                                  checked={this.state.addRosterWednesday}
                                  type="checkbox"
                                  onChange={() => {
                                    this.setState({
                                      addRosterWednesday: !this.state
                                        .addRosterWednesday,
                                    })
                                  }}
                                />
                                <div>Wednesday</div>
                              </div>
                            </Col>
                          </Row>
                          <Row form className="mb-3">
                            <Col className="ml-4">
                              <div className="d-flex align-items-center">
                                <Input
                                  checked={this.state.addRosterThursday}
                                  type="checkbox"
                                  onChange={() => {
                                    this.setState({
                                      addRosterThursday: !this.state
                                        .addRosterThursday,
                                    })
                                  }}
                                />
                                <div>Thursday</div>
                              </div>
                            </Col>
                            <Col>
                              <div className="d-flex align-items-center">
                                <Input
                                  checked={this.state.addRosterFriday}
                                  type="checkbox"
                                  onChange={() => {
                                    this.setState({
                                      addRosterFriday: !this.state
                                        .addRosterFriday,
                                    })
                                  }}
                                />
                                <div>Friday</div>
                              </div>
                            </Col>
                            <Col>
                              <div className="d-flex align-items-center">
                                <Input
                                  checked={this.state.addRosterSaturday}
                                  type="checkbox"
                                  onChange={() => {
                                    this.setState({
                                      addRosterSaturday: !this.state
                                        .addRosterSaturday,
                                    })
                                  }}
                                />
                                <div>Saturday</div>
                              </div>
                            </Col>
                          </Row>
                          <Row form className="mb-3">
                            <Col className="ml-4">
                              <div className="d-flex align-items-center">
                                <Input
                                  checked={this.state.addRosterSunday}
                                  type="checkbox"
                                  onChange={() => {
                                    this.setState({
                                      addRosterSunday: !this.state
                                        .addRosterSunday,
                                    })
                                  }}
                                />
                                <div>Sunday</div>
                              </div>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <Row>
                          <Col>
                            <Label for="exampleSelect">Date</Label>
                            <Input
                              value={this.state.addRosterStartDate}
                              type="date"
                              name="addRosterStartDate"
                              className="mb-2 shadow-none"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col>
                          <Label for="exampleSelect">Check In</Label>
                          <Input
                            value={this.state.addRosterCheckIn}
                            type="time"
                            name="addRosterCheckIn"
                            className="mb-2 shadow-none"
                            onChange={this.handleChange}
                          />
                        </Col>
                        <Col>
                          <Label for="exampleSelect">Check Out</Label>
                          <Input
                            value={this.state.addRosterCheckOut}
                            type="time"
                            name="addRosterCheckOut"
                            className="mb-2 shadow-none"
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="ml-4">
                          <Label check>
                            <Input
                              checked={this.state.addRosterOvertime}
                              type="checkbox"
                              onChange={() => {
                                this.setState({
                                  addRosterOvertime: !this.state
                                    .addRosterOvertime,
                                })
                              }}
                            />{' '}
                            Overtime
                          </Label>
                        </Col>
                      </Row>
                      {this.state.addRosterOvertime ? (
                        <Row>
                          <Col>
                            <Label for="exampleSelect">Check In Overtime</Label>
                            <Input
                              value={this.state.addRosterCheckInOvertime}
                              type="time"
                              name="addRosterCheckInOvertime"
                              className="mb-2 shadow-none"
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col>
                            <Label for="exampleSelect">
                              Check Out Overtime
                            </Label>
                            <Input
                              value={this.state.addRosterCheckOutOvertime}
                              type="time"
                              name="addRosterCheckOutOvertime"
                              className="mb-2 shadow-none"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                      ) : (
                        <></>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.addRoster}>
                        Submit
                      </Button>
                      <Button
                        color="primary"
                        onClick={this.toggleAddRosterModal}
                      >
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Form>
                </Modal>
              </>
            )}
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  department: state.department,
  login: state.login,
  presence: state.presence,
})
const mapDispatchToProps = {
  getProfile,
  getDepartment,
  deleteUser,
  sendNotif,
  updateUser,
  newToken,
  getRosterByUser,
  updateRosterUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
