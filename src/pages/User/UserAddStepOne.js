/* eslint-disable no-useless-escape */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert2'
import './Actual.css'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'
// import Dropzone from 'react-dropzone'
// @material-ui/core components
// import TextField from '@material-ui/core/TextField'
// import MenuItem from '@material-ui/core/MenuItem'
// import TablePagination from '@material-ui/core/TablePagination'
// Reactstrap/code
import {
  Col,
  CustomInput,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { NavigateNext } from '@material-ui/icons'
// @material-ui/icons components
// core components
import Basic from './DragnDrop'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

import { getUser, registerUser } from '../../redux/actions/user'
import { getDepartment } from '../../redux/actions/department'
import { newToken } from '../../redux/actions/login'
import { sendNotif } from '../../redux/actions/fcm'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class UserAddStepOne extends Component {
  constructor(props) {
    super(props)
    // this.onDrop = (files) => {
    //   this.setState({ files })
    // }
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      passcode: '',
      joinedDate: '',
      birthDate: '',
      address: '',
      role: 2,
      department: 1,
      timeType: 1,
      profilePicture: null,
      page: 1,
      // files: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.register = this.register.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      this.fetch()
    }, 100)
  }

  nextPage() {
    if (this.state.page < this.props.user.infoUser.totalPage) {
      this.setState({ page: this.state.page + 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    }
  }

  prevPage() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    }
  }

  redirect() {
    this.props.history.push('/login')
  }

  pressed() {
    const dataSubmit = {
      to: '/topics/gmiadmin',
      notification: {
        title: 'New User Registered',
        body: `${this.props.login.dataLogin.name} add ${this.state.name}`,
        mutable_content: true,
        sound: 'Tri-tone',
      },
      data: {
        route: 'Inventory',
        initialRoute: 'Inventory',
      },
    }

    this.props.sendNotif(dataSubmit)
  }

  register(event) {
    event.preventDefault()
    const joinedDate = `${this.state.joinedDate.slice(
      0,
      4,
    )}-${this.state.joinedDate.slice(5, 7)}-${this.state.joinedDate.slice(
      8,
      10,
    )}`
    const birthDate = `${this.state.birthDate.slice(
      0,
      4,
    )}-${this.state.birthDate.slice(5, 7)}-${this.state.birthDate.slice(8, 10)}`
    const dataSubmit = new FormData()

    dataSubmit.append('name', this.state.name)
    dataSubmit.append('email', this.state.email)
    dataSubmit.append('phone', this.state.phone)
    dataSubmit.append('password', this.state.password)
    dataSubmit.append('passcode', this.state.passcode)
    dataSubmit.append('address', this.state.address)
    dataSubmit.append('joineddate', joinedDate)
    dataSubmit.append('birthdate', birthDate)
    dataSubmit.append('time_type', this.state.timeType)
    dataSubmit.append('role', this.state.role)
    dataSubmit.append('department', this.state.department)
    dataSubmit.append('photo', this.state.profilePicture)

    this.props
      .registerUser(dataSubmit, this.props.login.token)
      .then((res) => {
        this.setState({
          name: '',
          email: '',
          phone: '',
          password: '',
          passcode: '',
          joinedDate: '',
          birthDate: '',
          address: '',
          role: 2,
          department: 1,
          timeType: 1,
          profilePicture: null,
        })
        this.fetch()
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User successsfully registered',
        })
        this.props.newToken(res.action.payload.data.newToken)
        // this.pressed()
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Data already used',
        })
      })
  }

  componentDidMount() {}

  render() {
    // const departmentData = this.props.department.dataDepartment
    // const departmentList = departmentData.map((val) => (
    //   <option key={val.id} value={val.id}>
    //     {val.name}
    //   </option>
    // ))
    // const files = this.state.files.map((file) => (
    //   <li key={file.name}>
    //     {file.name} - {file.size} bytes
    //   </li>
    // ))
    const classesBody = makeStyles(stylesBody)

    return (
      <div>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <nav className="navbar navbar-light bg-light row">
              <div className="d-flex align-items-center col">
                <h4 className="mr-6 ">Step 1 of 3</h4>
              </div>
              <div className="d-flex flex-row col justify-content-end">
                <Link
                  to="/admin/user/stepTwo"
                  className="btn btn-danger m-2 my-sm-0"
                >
                  {' '}
                  <Tooltip
                    id="tooltip-top-start"
                    title="Next Step"
                    placement="top"
                    classes={{
                      tooltip: classesBody.tooltip,
                    }}
                  >
                    {this.state.isLoadingExportAllLog ? (
                      <div
                        className="spinner-border spinner-border-sm text-white"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <NavigateNext className="iconWhiteColor" />
                    )}
                  </Tooltip>
                </Link>
              </div>
            </nav>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className="cardTitleWhite">Add User</h4>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row form>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">First Name</Label>
                            <Input
                              value={this.state.name}
                              name="name"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Middle Name</Label>
                            <Input
                              value={this.state.email}
                              name="email"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Last Name</Label>
                            <Input
                              value={this.state.phone}
                              name="phone"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input
                              value={this.state.name}
                              name="name"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Phone 1</Label>
                            <Input
                              value={this.state.email}
                              name="email"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Phone 2</Label>
                            <Input
                              value={this.state.email}
                              name="email"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col xs={12} sm={12} md={2}>
                          <FormGroup>
                            <Label for="exampleEmail">Place of Birth</Label>
                            <Input
                              value={this.state.name}
                              name="name"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={2}>
                          <FormGroup>
                            <Label for="exampleEmail">Date of Birth</Label>
                            <Input
                              type="date"
                              name="joinedDate"
                              id="exampleDate"
                              placeholder="date placeholder"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Marital Status</Label>
                            <Input
                              value={this.state.role}
                              type="select"
                              name="role"
                              id="exampleSelect"
                              onChange={this.handleChange}
                            >
                              <option key={1} value={1}>
                                Single
                              </option>
                              <option key={2} value={2}>
                                Married
                              </option>
                              <option key={3} value={3}>
                                Widow/Widower
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleSelect">Employment Status</Label>
                            <Input
                              value={this.state.role}
                              type="select"
                              name="role"
                              id="exampleSelect"
                              onChange={this.handleChange}
                            >
                              <option key={1} value={1}>
                                Probation
                              </option>
                              <option key={2} value={2}>
                                Contract
                              </option>
                              <option key={3} value={3}>
                                Permanent
                              </option>
                              <option key={4} value={4}>
                                Freelance
                              </option>
                              <option key={5} value={5}>
                                Part Time
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleSelect">Religion</Label>
                            <Input
                              value={this.state.role}
                              type="select"
                              name="role"
                              id="exampleSelect"
                              onChange={this.handleChange}
                            >
                              <option key={1} value={1}>
                                Muslim
                              </option>
                              <option key={2} value={2}>
                                Protestant
                              </option>
                              <option key={3} value={3}>
                                Catholic
                              </option>
                              <option key={4} value={4}>
                                Hindu
                              </option>
                              <option key={5} value={5}>
                                Buddhist
                              </option>
                              <option key={6} value={6}>
                                Confucian
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleSelect">Blood Type</Label>
                            <Input
                              value={this.state.department}
                              type="select"
                              name="department"
                              onChange={this.handleChange}
                              id="exampleSelect"
                            >
                              <option key={1} value={1}>
                                A
                              </option>
                              <option key={2} value={2}>
                                B
                              </option>
                              <option key={3} value={3}>
                                AB
                              </option>
                              <option key={4} value={4}>
                                O
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleCheckbox">Gender</Label>
                            <div>
                              <CustomInput
                                type="radio"
                                id="exampleCustomRadio2"
                                name="gender"
                                label="Male"
                                value={1}
                                onChange={(e) => this.handleChange(e)}
                                inline
                              />
                              <CustomInput
                                type="radio"
                                id="exampleCustomRadio"
                                name="gender"
                                label="Female"
                                value={3}
                                onChange={(e) => this.handleChange(e)}
                                inline
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col xs={12} sm={12} md={12}>
                          {' '}
                          <FormGroup>
                            <Label for="exampleEmail">Address</Label>
                            <Input
                              value={this.state.address}
                              type="textarea"
                              name="address"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col xs={12} sm={12} md={4}>
                          {' '}
                          <FormGroup>
                            <Label for="exampleEmail">Province</Label>
                            <Input
                              value={this.state.department}
                              type="select"
                              name="department"
                              onChange={this.handleChange}
                              id="exampleSelect"
                            >
                              <option key={1} value={1}>
                                A
                              </option>
                              <option key={2} value={2}>
                                B
                              </option>
                              <option key={3} value={3}>
                                AB
                              </option>
                              <option key={4} value={4}>
                                O
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                          {' '}
                          <FormGroup>
                            <Label for="exampleEmail">City</Label>
                            <Input
                              value={this.state.department}
                              type="select"
                              name="department"
                              onChange={this.handleChange}
                              id="exampleSelect"
                            >
                              <option key={1} value={1}>
                                A
                              </option>
                              <option key={2} value={2}>
                                B
                              </option>
                              <option key={3} value={3}>
                                AB
                              </option>
                              <option key={4} value={4}>
                                O
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                          {' '}
                          <FormGroup>
                            <Label for="exampleEmail">District</Label>
                            <Input
                              value={this.state.department}
                              type="select"
                              name="department"
                              onChange={this.handleChange}
                              id="exampleSelect"
                            >
                              <option key={1} value={1}>
                                A
                              </option>
                              <option key={2} value={2}>
                                B
                              </option>
                              <option key={3} value={3}>
                                AB
                              </option>
                              <option key={4} value={4}>
                                O
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={2}>
                          {' '}
                          <FormGroup>
                            <Label for="exampleEmail">ZIP</Label>
                            <Input
                              value={this.state.address}
                              name="address"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col xs={12} sm={12} md={12}>
                          {' '}
                          <FormGroup>
                            <Label for="exampleEmail">Profile Picture</Label>
                            <Basic />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user,
  department: state.department,
})
const mapDispatchToProps = {
  getUser,
  registerUser,
  getDepartment,
  sendNotif,
  newToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddStepOne)
