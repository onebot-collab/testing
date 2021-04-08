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
// @material-ui/core components
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
  Label,
  Input,
  CustomInput,
} from 'reactstrap'
import swal from 'sweetalert2'
import moment from 'moment'
import { getProfile, deleteUser, updateUser } from '../../redux/actions/user'
import { getDepartment } from '../../redux/actions/department'
import { newToken } from '../../redux/actions/login'
import { sendNotif } from '../../redux/actions/fcm'
import { getRosterByUser, updateRosterUser } from '../../redux/actions/presence'
// import avatar from '../../assets/img/faces/marc.jpg'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
// import CustomInput from '../../components/CustomInput/CustomInput'
import Button from '../../components/CustomButtons/Button'
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
      showDeleteModal: false,
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
      typeRoster: this.props.presence.dataUserRoster[7].type_roaster,
      overtimeMonday: false,
      overtimeTuesday: false,
      overtimeWednesday: false,
      overtimeThursday: false,
      overtimeFriday: false,
      overtimeSaturday: false,
      overtimeSunday: false,
      mondayCheck: this.props.presence.dataUserRoster[1].monday.checkIn !== '',
      tuesdayCheck:
        this.props.presence.dataUserRoster[2].tuesday.checkIn !== '',
      wednesdayCheck:
        this.props.presence.dataUserRoster[3].wednesday.checkIn !== '',
      thursdayCheck:
        this.props.presence.dataUserRoster[4].thursday.checkIn !== '',
      fridayCheck: this.props.presence.dataUserRoster[5].friday.checkIn !== '',
      saturdayCheck:
        this.props.presence.dataUserRoster[6].saturday.checkIn !== '',
      sundayCheck: this.props.presence.dataUserRoster[0].sunday.checkIn !== '',
      mondayCheckIn1: this.props.presence.dataUserRoster[1].monday.checkIn,
      mondayCheckOut1: this.props.presence.dataUserRoster[1].monday.checkOut,
      mondayCheckIn2: this.props.presence.dataUserRoster[1].monday.checkIn2,
      mondayCheckOut2: this.props.presence.dataUserRoster[1].monday.checkOut2,
      mondayCheckInEarly: this.props.presence.dataUserRoster[1].monday
        .earlyCheckIn,
      mondayCheckOutLate: this.props.presence.dataUserRoster[1].monday
        .lateCheckOut,
      tuesdayCheckIn1: this.props.presence.dataUserRoster[2].tuesday.checkIn,
      tuesdayCheckOut1: this.props.presence.dataUserRoster[2].tuesday.checkOut,
      tuesdayCheckIn2: this.props.presence.dataUserRoster[2].tuesday.checkIn2,
      tuesdayCheckOut2: this.props.presence.dataUserRoster[2].tuesday.checkOut2,
      tuesdayCheckInEarly: this.props.presence.dataUserRoster[2].tuesday
        .earlyCheckIn,
      tuesdayCheckOutLate: this.props.presence.dataUserRoster[2].tuesday
        .lateCheckOut,
      wednesdayCheckIn1: this.props.presence.dataUserRoster[3].wednesday
        .checkIn,
      wednesdayCheckOut1: this.props.presence.dataUserRoster[3].wednesday
        .checkOut,
      wednesdayCheckIn2: this.props.presence.dataUserRoster[3].wednesday
        .checkIn2,
      wednesdayCheckOut2: this.props.presence.dataUserRoster[3].wednesday
        .checkOut2,
      wednesdayCheckInEarly: this.props.presence.dataUserRoster[3].wednesday
        .earlyCheckIn,
      wednesdayCheckOutLate: this.props.presence.dataUserRoster[3].wednesday
        .lateCheckOut,
      thursdayCheckIn1: this.props.presence.dataUserRoster[4].thursday.checkIn,
      thursdayCheckOut1: this.props.presence.dataUserRoster[4].thursday
        .checkOut,
      thursdayCheckIn2: this.props.presence.dataUserRoster[4].thursday.checkIn2,
      thursdayCheckOut2: this.props.presence.dataUserRoster[4].thursday
        .checkOut2,
      thursdayCheckInEarly: this.props.presence.dataUserRoster[4].thursday
        .earlyCheckIn,
      thursdayCheckOutLate: this.props.presence.dataUserRoster[4].thursday
        .lateCheckOut,
      fridayCheckIn1: this.props.presence.dataUserRoster[5].friday.checkIn,
      fridayCheckOut1: this.props.presence.dataUserRoster[5].friday.checkOut,
      fridayCheckIn2: this.props.presence.dataUserRoster[5].friday.checkIn2,
      fridayCheckOut2: this.props.presence.dataUserRoster[5].friday.checkOut2,
      fridayCheckInEarly: this.props.presence.dataUserRoster[5].friday
        .earlyCheckIn,
      fridayCheckOutLate: this.props.presence.dataUserRoster[5].friday
        .lateCheckOut,
      saturdayCheckIn1: this.props.presence.dataUserRoster[6].saturday.checkIn,
      saturdayCheckOut1: this.props.presence.dataUserRoster[6].saturday
        .checkOut,
      saturdayCheckIn2: this.props.presence.dataUserRoster[6].saturday.checkIn2,
      saturdayCheckOut2: this.props.presence.dataUserRoster[6].saturday
        .checkOut2,
      saturdayCheckInEarly: this.props.presence.dataUserRoster[6].saturday
        .earlyCheckIn,
      saturdayCheckOutLate: this.props.presence.dataUserRoster[6].saturday
        .lateCheckOut,
      sundayCheckIn1: this.props.presence.dataUserRoster[0].sunday.checkIn,
      sundayCheckOut1: this.props.presence.dataUserRoster[0].sunday.checkOut,
      sundayCheckIn2: this.props.presence.dataUserRoster[0].sunday.checkIn2,
      sundayCheckOut2: this.props.presence.dataUserRoster[0].sunday.checkOut2,
      sundayCheckInEarly: this.props.presence.dataUserRoster[0].sunday
        .earlyCheckIn,
      sundayCheckOutLate: this.props.presence.dataUserRoster[0].sunday
        .lateCheckOut,
      isLoadingRoster: false,
    }
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fetchProfile = this.fetchProfile.bind(this)
    this.updateRoster = this.updateRoster.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleUpdateModal() {
    this.setState({
      showUpdateModal: !this.state.showUpdateModal,
    })
  }

  toggleDeleteModal() {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
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

  update() {
    this.setState({ isLoadingUpdate: true })
    const dataSubmit = new FormData()
    if (this.state.nameInput !== this.state.name) {
      dataSubmit.append('name', this.state.nameInput)
    }
    if (this.state.emailInput !== this.state.email) {
      dataSubmit.append('email', this.state.emailInput)
    }
    if (this.state.passwordInput !== '') {
      dataSubmit.append('password', this.state.passwordInput)
    }
    if (this.state.passcodeInput !== '') {
      dataSubmit.append('passcode', this.state.passcodeInput)
    }
    if (this.state.phoneInput !== this.state.phone) {
      dataSubmit.append('phone', this.state.phoneInput)
    }
    if (this.state.roleInput !== this.state.role) {
      dataSubmit.append('role', this.state.roleInput)
    }
    if (this.state.departmentId !== this.state.department_id) {
      dataSubmit.append('department_id', this.state.department_id)
    }
    if (this.state.addressInput !== this.state.address) {
      dataSubmit.append('address', this.state.addressInput)
    }
    if (this.state.timeTypeInput !== '') {
      dataSubmit.append('time_type_id', this.state.timeTypeInput)
    }
    if (this.state.joinedDateInput !== this.state.joined_date) {
      dataSubmit.append('joined_date', this.state.timeTypeInput)
    }
    if (this.state.birthDateInput !== this.state.birthDate) {
      dataSubmit.append('birthdate', this.state.birthDateInput)
    }
    if (this.state.avatar !== null) {
      dataSubmit.append('avatar', this.state.avatar)
    }

    this.props
      .updateUser(
        this.props.location.state.id,
        dataSubmit,
        this.props.login.token,
      )
      .then((res) => {
        this.setState({ isLoadingUpdate: false })
        this.props.history.push('/admin/user')
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User successsfully updated',
        })
        this.props.newToken(res.action.payload.data.newToken)
      })
      .catch((res) => {
        this.setState({ isLoadingUpdate: false })
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: `${res.response.data.message}`,
        })
      })
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
    if (this.state.mondayCheck) {
      var mondayData = {
        day: '1',
        userId: this.props.location.state.id,
        checkIn: this.state.mondayCheckIn1,
        checkOut: this.state.mondayCheckOut1,
        checkIn2: this.state.mondayCheckIn2,
        checkOut2: this.state.mondayCheckOut2,
        earlyCheckIn: this.state.mondayCheckInEarly,
        lateCheckOut: this.state.mondayCheckOutLate,
        type: this.state.typeRoster,
      }
    } else {
      var mondayData = {
        day: '1',
        userId: this.props.location.state.id,
        checkIn: '',
        checkOut: '',
        checkIn2: '',
        checkOut2: '',
        earlyCheckIn: '',
        lateCheckOut: '',
        type: this.state.typeRoster,
      }
    }

    if (this.state.tuesdayCheck) {
      var tuesdayData = {
        day: '2',
        userId: this.props.location.state.id,
        checkIn: this.state.tuesdayCheckIn1,
        checkOut: this.state.tuesdayCheckOut1,
        checkIn2: this.state.tuesdayCheckIn2,
        checkOut2: this.state.tuesdayCheckOut2,
        earlyCheckIn: this.state.tuesdayCheckInEarly,
        lateCheckOut: this.state.tuesdayCheckOutLate,
        type: this.state.typeRoster,
      }
    } else {
      var tuesdayData = {
        day: '2',
        userId: this.props.location.state.id,
        checkIn: '',
        checkOut: '',
        checkIn2: '',
        checkOut2: '',
        earlyCheckIn: '',
        lateCheckOut: '',
        type: this.state.typeRoster,
      }
    }

    if (this.state.wednesdayCheck) {
      var wednesdayData = {
        day: '3',
        userId: this.props.location.state.id,
        checkIn: this.state.wednesdayCheckIn1,
        checkOut: this.state.wednesdayCheckOut1,
        checkIn2: this.state.wednesdayCheckIn2,
        checkOut2: this.state.wednesdayCheckOut2,
        earlyCheckIn: this.state.wednesdayCheckInEarly,
        lateCheckOut: this.state.wednesdayCheckOutLate,
        type: this.state.typeRoster,
      }
    } else {
      var wednesdayData = {
        day: '3',
        userId: this.props.location.state.id,
        checkIn: '',
        checkOut: '',
        checkIn2: '',
        checkOut2: '',
        earlyCheckIn: '',
        lateCheckOut: '',
        type: this.state.typeRoster,
      }
    }

    if (this.state.thursdayCheck) {
      var thursdayData = {
        day: '4',
        userId: this.props.location.state.id,
        checkIn: this.state.thursdayCheckIn1,
        checkOut: this.state.thursdayCheckOut1,
        checkIn2: this.state.thursdayCheckIn2,
        checkOut2: this.state.thursdayCheckOut2,
        earlyCheckIn: this.state.thursdayCheckInEarly,
        lateCheckOut: this.state.thursdayCheckOutLate,
        type: this.state.typeRoster,
      }
    } else {
      var thursdayData = {
        day: '4',
        userId: this.props.location.state.id,
        checkIn: '',
        checkOut: '',
        checkIn2: '',
        checkOut2: '',
        earlyCheckIn: '',
        lateCheckOut: '',
        type: this.state.typeRoster,
      }
    }

    if (this.state.fridayCheck) {
      var fridayData = {
        day: '5',
        userId: this.props.location.state.id,
        checkIn: this.state.fridayCheckIn1,
        checkOut: this.state.fridayCheckOut1,
        checkIn2: this.state.fridayCheckIn2,
        checkOut2: this.state.fridayCheckOut2,
        earlyCheckIn: this.state.fridayCheckInEarly,
        lateCheckOut: this.state.fridayCheckOutLate,
        type: this.state.typeRoster,
      }
    } else {
      var fridayData = {
        day: '5',
        userId: this.props.location.state.id,
        checkIn: '',
        checkOut: '',
        checkIn2: '',
        checkOut2: '',
        earlyCheckIn: '',
        lateCheckOut: '',
        type: this.state.typeRoster,
      }
    }

    if (this.state.saturdayCheck) {
      var saturdayData = {
        day: '6',
        userId: this.props.location.state.id,
        checkIn: this.state.saturdayCheckIn1,
        checkOut: this.state.saturdayCheckOut1,
        checkIn2: this.state.saturdayCheckIn2,
        checkOut2: this.state.saturdayCheckOut2,
        earlyCheckIn: this.state.saturdayCheckInEarly,
        lateCheckOut: this.state.saturdayCheckOutLate,
        type: this.state.typeRoster,
      }
    } else {
      var saturdayData = {
        day: '6',
        userId: this.props.location.state.id,
        checkIn: '',
        checkOut: '',
        checkIn2: '',
        checkOut2: '',
        earlyCheckIn: '',
        lateCheckOut: '',
        type: this.state.typeRoster,
      }
    }

    if (this.state.sundayCheck) {
      var sundayData = {
        day: '0',
        userId: this.props.location.state.id,
        checkIn: this.state.sundayCheckIn1,
        checkOut: this.state.sundayCheckOut1,
        checkIn2: this.state.sundayCheckIn2,
        checkOut2: this.state.sundayCheckOut2,
        earlyCheckIn: this.state.sundayCheckInEarly,
        lateCheckOut: this.state.sundayCheckOutLate,
        type: this.state.typeRoster,
      }
    } else {
      var sundayData = {
        day: '0',
        userId: this.props.location.state.id,
        checkIn: '',
        checkOut: '',
        checkIn2: '',
        checkOut2: '',
        earlyCheckIn: '',
        lateCheckOut: '',
        type: this.state.typeRoster,
      }
    }

    this.setState({ isLoadingRoster: true })
    console.log('XXXXXXX', mondayData)
    this.props
      .updateRosterUser(
        this.props.login.token,
        mondayData,
        this.props.location.state.id,
      )
      .then((res) => {
        this.props
          .updateRosterUser(
            res.action.payload.data.newToken,
            tuesdayData,
            this.props.location.state.id,
          )
          .then((res) => {
            this.props
              .updateRosterUser(
                res.action.payload.data.newToken,
                wednesdayData,
                this.props.location.state.id,
              )
              .then((res) => {
                this.props
                  .updateRosterUser(
                    res.action.payload.data.newToken,
                    thursdayData,
                    this.props.location.state.id,
                  )
                  .then((res) => {
                    this.props
                      .updateRosterUser(
                        res.action.payload.data.newToken,
                        fridayData,
                        this.props.location.state.id,
                      )
                      .then((res) => {
                        this.props
                          .updateRosterUser(
                            res.action.payload.data.newToken,
                            saturdayData,
                            this.props.location.state.id,
                          )
                          .then((res) => {
                            this.props
                              .updateRosterUser(
                                res.action.payload.data.newToken,
                                sundayData,
                                this.props.location.state.id,
                              )
                              .then((res) => {
                                this.props.newToken(
                                  res.action.payload.data.newToken,
                                )
                                this.props.history.push('/admin/user')
                                swal.fire({
                                  icon: 'success',
                                  title: 'Success',
                                  text: 'User successsfully deleted',
                                })
                              })
                              .catch((res) => {
                                this.setState({ isLoadingRoster: false })
                                swal.fire({
                                  icon: 'error',
                                  title: 'Failed',
                                  text: `${res.response.data.message}`,
                                })
                              })
                          })
                          .catch((res) => {
                            this.setState({ isLoadingRoster: false })
                            swal.fire({
                              icon: 'error',
                              title: 'Failed',
                              text: `${res.response.data.message}`,
                            })
                          })
                      })
                      .catch((res) => {
                        this.setState({ isLoadingRoster: false })
                        swal.fire({
                          icon: 'error',
                          title: 'Failed',
                          text: `${res.response.data.message}`,
                        })
                      })
                  })
                  .catch((res) => {
                    this.setState({ isLoadingRoster: false })
                    swal.fire({
                      icon: 'error',
                      title: 'Failed',
                      text: `${res.response.data.message}`,
                    })
                  })
              })
              .catch((res) => {
                this.setState({ isLoadingRoster: false })
                swal.fire({
                  icon: 'error',
                  title: 'Failed',
                  text: `${res.response.data.message}`,
                })
              })
          })
          .catch((res) => {
            this.setState({ isLoadingRoster: false })
            swal.fire({
              icon: 'error',
              title: 'Failed',
              text: `${res.response.data.message}`,
            })
          })
      })
      .catch((res) => {
        this.setState({ isLoadingRoster: false })
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: `${res.response.data.message}`,
        })
      })
  }

  componentDidMount() {
    this.fetchProfile()
  }

  render() {
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
                        <Button onClick={this.toggleUpdateModal} color="danger">
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
                          href={`http://10.7.9.6:8443/node/${this.props.user.dataProfile[0].photo_url}?boAgRwlfX5=${this.props.login.token}`}
                        >
                          <img
                            src={`http://10.7.9.6:8443/node/${this.props.user.dataProfile[0].photo_url}?boAgRwlfX5=${this.props.login.token}`}
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
                            <ListItem>
                              <ListItemIcon>
                                <Today />
                              </ListItemIcon>
                              <ListItemText>
                                {this.props.user.dataProfile[0].joined_date.slice(
                                  0,
                                  10,
                                )}
                              </ListItemText>
                            </ListItem>
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
                          </List>
                        </div>
                      </CardBody>
                      <CardFooter>
                        <Button onClick={this.toggleDeleteModal} color="danger">
                          Delete {this.props.user.dataProfile[0].name}
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </GridContainer>

                {this.props.user.dataProfile[0].typeTime === 'Free Hours' ||
                this.state.timeTypeInput == '3' ? (
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
                          <Form>
                            <Row form>
                              <Col xs={12} sm={12} md={12}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">Type</Label>
                                  <Input
                                    value={this.state.typeRoster}
                                    type="select"
                                    name="typeRoster"
                                    id="exampleSelect"
                                    onChange={this.handleChange}
                                  >
                                    <option key={1} value={1}>
                                      Persist
                                    </option>
                                    <option key={2} value={2}>
                                      Shift
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row
                              form
                              className="d-flex justify-content-around my-2"
                            >
                              {/* SENIN */}
                              <Col
                                xs={12}
                                sm={12}
                                md={5}
                                className="p-4 border border-danger"
                              >
                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex align-items-center my-1"
                                >
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.mondayCheck}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            mondayCheck: !this.state
                                              .mondayCheck,
                                          })
                                        }}
                                      />{' '}
                                      Monday
                                    </Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.overtimeMonday}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            overtimeMonday: !this.state
                                              .overtimeMonday,
                                          })
                                        }}
                                      />{' '}
                                      Overtime
                                    </Label>
                                  </FormGroup>
                                </Row>

                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex justify-content-around my-1"
                                >
                                  <Row>
                                    <Label for="exampleEmail">Check In</Label>
                                    <Input
                                      value={this.state.mondayCheckIn1}
                                      type="time"
                                      name="mondayCheckIn1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>

                                  <Row>
                                    <Label for="exampleEmail">Check Out</Label>
                                    <Input
                                      value={this.state.mondayCheckOut1}
                                      type="time"
                                      name="mondayCheckOut1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>
                                </Row>

                                {parseInt(this.state.typeRoster) === 2 ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In#2
                                      </Label>
                                      <Input
                                        value={this.state.mondayCheckIn2}
                                        type="time"
                                        name="mondayCheckIn2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out#2
                                      </Label>
                                      <Input
                                        value={this.state.mondayCheckOut2}
                                        type="time"
                                        name="mondayCheckOut2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                                {this.state.overtimeMonday ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.mondayCheckInEarly}
                                        type="time"
                                        name="mondayCheckinEarly"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.mondayCheckOutLate}
                                        type="time"
                                        name="mondayCheckOutLate"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                              </Col>
                              {/* SELASA */}
                              <Col
                                xs={12}
                                sm={12}
                                md={5}
                                className="p-4 border border-danger"
                              >
                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex align-items-center my-1"
                                >
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.tuesdayCheck}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            tuesdayCheck: !this.state
                                              .tuesdayCheck,
                                          })
                                        }}
                                      />{' '}
                                      Tuesday
                                    </Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.overtimeTuesday}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            overtimeTuesday: !this.state
                                              .overtimeTuesday,
                                          })
                                        }}
                                      />{' '}
                                      Overtime
                                    </Label>
                                  </FormGroup>
                                </Row>

                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex justify-content-around my-1"
                                >
                                  <Row>
                                    <Label for="exampleEmail">Check In</Label>
                                    <Input
                                      value={this.state.tuesdayCheckIn1}
                                      type="time"
                                      name="tuesdayCheckIn1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>

                                  <Row>
                                    <Label for="exampleEmail">Check Out</Label>
                                    <Input
                                      value={this.state.tuesdayCheckOut1}
                                      type="time"
                                      name="tuesdayCheckOut1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>
                                </Row>

                                {parseInt(this.state.typeRoster) === 2 ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In#2
                                      </Label>
                                      <Input
                                        value={this.state.tuesdayCheckIn2}
                                        type="time"
                                        name="tuesdayCheckIn2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out#2
                                      </Label>
                                      <Input
                                        value={this.state.tuesdayCheckOut2}
                                        type="time"
                                        name="tuesdayCheckOut2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                                {this.state.overtimeTuesday ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.tuesdayCheckInEarly}
                                        type="time"
                                        name="tuesdayCheckInEarly"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.tuesdayCheckOutLate}
                                        type="time"
                                        name="tuesdayCheckOutLate"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                              </Col>
                            </Row>
                            {/* RABU */}
                            <Row
                              form
                              className="d-flex justify-content-around my-2"
                            >
                              <Col
                                xs={12}
                                sm={12}
                                md={5}
                                className="p-4 border border-danger"
                              >
                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex align-items-center my-1"
                                >
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.wednesdayCheck}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            wednesdayCheck: !this.state
                                              .wednesdayCheck,
                                          })
                                        }}
                                      />{' '}
                                      Wednesday
                                    </Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.overtimeWednesday}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            overtimeWednesday: !this.state
                                              .overtimeWednesday,
                                          })
                                        }}
                                      />{' '}
                                      Overtime
                                    </Label>
                                  </FormGroup>
                                </Row>

                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex justify-content-around my-1"
                                >
                                  <Row>
                                    <Label for="exampleEmail">Check In</Label>
                                    <Input
                                      value={this.state.wednesdayCheckIn1}
                                      type="time"
                                      name="wednesdayCheckIn1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>

                                  <Row>
                                    <Label for="exampleEmail">Check Out</Label>
                                    <Input
                                      value={this.state.wednesdayCheckOut2}
                                      type="time"
                                      name="wednesdayCheckOut2"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>
                                </Row>

                                {parseInt(this.state.typeRoster) === 2 ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In#2
                                      </Label>
                                      <Input
                                        value={this.state.wednesdayCheckIn2}
                                        type="time"
                                        name="wednesdayCheckIn2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out#2
                                      </Label>
                                      <Input
                                        value={this.state.wednesdayCheckOut2}
                                        type="time"
                                        name="wednesdayCheckOut2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                                {this.state.overtimeWednesday ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.wednesdayCheckInEarly}
                                        type="time"
                                        name="wednesdayCheckInEarly"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.wednesdayCheckOutLate}
                                        type="time"
                                        name="wednesdayCheckOutLate"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                              </Col>
                              {/* KAMIS */}
                              <Col
                                xs={12}
                                sm={12}
                                md={5}
                                className="p-4 border border-danger"
                              >
                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex align-items-center my-1"
                                >
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.thursdayCheck}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            thursdayCheck: !this.state
                                              .thursdayCheck,
                                          })
                                        }}
                                      />{' '}
                                      Thursday
                                    </Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.overtimeThursday}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            overtimeThursday: !this.state
                                              .overtimeThursday,
                                          })
                                        }}
                                      />{' '}
                                      Overtime
                                    </Label>
                                  </FormGroup>
                                </Row>

                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex justify-content-around my-1"
                                >
                                  <Row>
                                    <Label for="exampleEmail">Check In</Label>
                                    <Input
                                      value={this.state.thursdayCheckIn1}
                                      type="time"
                                      name="thursdayCheckIn1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>

                                  <Row>
                                    <Label for="exampleEmail">Check Out</Label>
                                    <Input
                                      value={this.state.thursdayCheckOut1}
                                      type="time"
                                      name="thursdayCheckOut1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>
                                </Row>

                                {parseInt(this.state.typeRoster) === 2 ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In#2
                                      </Label>
                                      <Input
                                        value={this.state.thursdayCheckIn2}
                                        type="time"
                                        name="thursdayCheckIn2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out#2
                                      </Label>
                                      <Input
                                        value={this.state.thursdayCheckOut2}
                                        type="time"
                                        name="thursdayCheckOut2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                                {this.state.overtimeThursday ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.thursdayCheckInEarly}
                                        type="time"
                                        name="thursdayCheckInEarly"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.thursdayCheckOutLate}
                                        type="time"
                                        name="thursdayCheckOutLate"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                              </Col>
                            </Row>
                            {/* JUMAT */}
                            <Row
                              form
                              className="d-flex justify-content-around my-2"
                            >
                              <Col
                                xs={12}
                                sm={12}
                                md={5}
                                className="p-4 border border-danger"
                              >
                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex align-items-center my-1"
                                >
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.fridayCheck}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            fridayCheck: !this.state
                                              .fridayCheck,
                                          })
                                        }}
                                      />{' '}
                                      Friday
                                    </Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.overtimeFriday}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            overtimeFriday: !this.state
                                              .overtimeFriday,
                                          })
                                        }}
                                      />{' '}
                                      Overtime
                                    </Label>
                                  </FormGroup>
                                </Row>

                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex justify-content-around my-1"
                                >
                                  <Row>
                                    <Label for="exampleEmail">Check In</Label>
                                    <Input
                                      value={this.state.fridayCheckIn1}
                                      type="time"
                                      name="fridayCheckIn1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>

                                  <Row>
                                    <Label for="exampleEmail">Check Out</Label>
                                    <Input
                                      value={this.state.fridayCheckOut1}
                                      type="time"
                                      name="fridayCheckOut1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>
                                </Row>

                                {parseInt(this.state.typeRoster) === 2 ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In#2
                                      </Label>
                                      <Input
                                        value={this.state.fridayCheckIn2}
                                        type="time"
                                        name="fridayCheckIn2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out#2
                                      </Label>
                                      <Input
                                        value={this.state.fridayCheckOut2}
                                        type="time"
                                        name="fridayCheckOut2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                                {this.state.overtimeFriday ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.fridayCheckInEarly}
                                        type="time"
                                        name="fridayCheckInEarly"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.fridayCheckOutLate}
                                        type="time"
                                        name="fridayCheckOutLate"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                              </Col>
                              {/* SABTU */}
                              <Col
                                xs={12}
                                sm={12}
                                md={5}
                                className="p-4 border border-danger"
                              >
                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex align-items-center my-1"
                                >
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.saturdayCheck}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            saturdayCheck: !this.state
                                              .saturdayCheck,
                                          })
                                        }}
                                      />{' '}
                                      Saturday
                                    </Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.overtimeSaturday}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            overtimeSaturday: !this.state
                                              .overtimeSaturday,
                                          })
                                        }}
                                      />{' '}
                                      Overtime
                                    </Label>
                                  </FormGroup>
                                </Row>

                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex justify-content-around my-1"
                                >
                                  <Row>
                                    <Label for="exampleEmail">Check In</Label>
                                    <Input
                                      value={this.state.saturdayCheckIn1}
                                      type="time"
                                      name="saturdayCheckIn1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>

                                  <Row>
                                    <Label for="exampleEmail">Check Out</Label>
                                    <Input
                                      value={this.state.saturdayCheckOut1}
                                      type="time"
                                      name="saturdayCheckOut1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>
                                </Row>

                                {parseInt(this.state.typeRoster) === 2 ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In#2
                                      </Label>
                                      <Input
                                        value={this.state.saturdayCheckIn2}
                                        type="time"
                                        name="SaturdayCheckIn2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out#2
                                      </Label>
                                      <Input
                                        value={this.state.saturdayCheckOut2}
                                        type="time"
                                        name="saturdayCheckOut2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                                {this.state.overtimeSaturday ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.saturdayCheckInEarly}
                                        type="time"
                                        name="saturdayCheckInEarly"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.saturdayCheckOutLate}
                                        type="time"
                                        name="saturdayCheckOutLate"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                              </Col>
                            </Row>
                            {/* MINGGU */}
                            <Row
                              form
                              className="d-flex justify-content-around my-2"
                            >
                              <Col
                                xs={12}
                                sm={12}
                                md={5}
                                className="p-4 border border-danger"
                              >
                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex align-items-center my-1"
                                >
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.sundayCheck}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            sundayCheck: !this.state
                                              .sundayCheck,
                                          })
                                        }}
                                      />{' '}
                                      Sunday
                                    </Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Label check>
                                      <Input
                                        checked={this.state.overtimeSunday}
                                        type="checkbox"
                                        onChange={() => {
                                          this.setState({
                                            overtimeSunday: !this.state
                                              .overtimeSunday,
                                          })
                                        }}
                                      />{' '}
                                      Overtime
                                    </Label>
                                  </FormGroup>
                                </Row>

                                <Row
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  className="d-flex justify-content-around my-1"
                                >
                                  <Row>
                                    <Label for="exampleEmail">Check In</Label>
                                    <Input
                                      value={this.state.sundayCheckIn1}
                                      type="time"
                                      name="sundayCheckIn1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>

                                  <Row>
                                    <Label for="exampleEmail">Check Out</Label>
                                    <Input
                                      value={this.state.sundayCheckOut1}
                                      type="time"
                                      name="sundayCheckOut1"
                                      onChange={(e) => this.handleChange(e)}
                                    />
                                  </Row>
                                </Row>

                                {parseInt(this.state.typeRoster) === 2 ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In#2
                                      </Label>
                                      <Input
                                        value={this.state.sundayCheckIn2}
                                        type="time"
                                        name="sundayCheckIn2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out#2
                                      </Label>
                                      <Input
                                        value={this.state.sundayCheckOut2}
                                        type="time"
                                        name="sundayCheckOut2"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                                {this.state.overtimeSunday ? (
                                  <Row
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    className="d-flex justify-content-around my-1"
                                  >
                                    <Row>
                                      <Label for="exampleEmail">
                                        Check In(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.sundayCheckInEarly}
                                        type="time"
                                        name="sundayCheckInEarly"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>

                                    <Row>
                                      <Label for="exampleEmail">
                                        Check Out(Overtime)
                                      </Label>
                                      <Input
                                        value={this.state.sundayCheckOutLate}
                                        type="time"
                                        name="sundayCheckOutLate"
                                        onChange={(e) => this.handleChange(e)}
                                      />
                                    </Row>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                              </Col>
                            </Row>
                          </Form>
                        </CardBody>
                        <CardFooter>
                          <Button onClick={this.updateRoster} color="danger">
                            {this.state.isLoadingRoster ? (
                              <div
                                className="spinner-border spinner-border-sm text-danger"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              'Update Roster'
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </GridItem>
                  </GridContainer>
                ) : (
                  <></>
                )}

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
                      color="danger"
                      onClick={() => this.toggleUpdateModal(0)}
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
                      color="danger"
                      onClick={() => this.toggleDeleteModal(0)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
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
