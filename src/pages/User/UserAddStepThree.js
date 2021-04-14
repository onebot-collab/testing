/* eslint-disable eqeqeq */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
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
import { NavigateBefore } from '@material-ui/icons'
// @material-ui/core components
// import TextField from '@material-ui/core/TextField'
// import MenuItem from '@material-ui/core/MenuItem'
// import TablePagination from '@material-ui/core/TablePagination'
// Reactstrap/code
import { Col, Form, FormGroup, Label, Input, Row } from 'reactstrap'
// @material-ui/icons components
// core components
import Button from '../../components/CustomButtons/Button'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

import { getUser, registerUser } from '../../redux/actions/user'
import { getDepartment } from '../../redux/actions/department'
import { newToken } from '../../redux/actions/login'
import { sendNotif } from '../../redux/actions/fcm'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class UserAddStepThree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      joinedDate: '',
      role: 2,
      department: 1,
      timeType: 1,
      isLoadingFetch: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.register = this.register.bind(this)
    this.fetch = this.fetch.bind(this)
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

    if (this.props.user.dataFormOne.employmentDurationType == 1) {
      var { employmentDuration } = this.props.user.dataFormOne
    } else {
      var employmentDuration =
        this.props.user.dataFormOne.employmentDuration * 12
    }

    const dataSubmit = new FormData()

    dataSubmit.append('firstName', this.props.user.dataFormOne.firstName)
    dataSubmit.append('name', this.props.user.dataFormOne.middleName)
    dataSubmit.append('lastName', this.props.user.dataFormOne.lastName)
    dataSubmit.append('emailPrivate', this.props.user.dataFormOne.privateEmail)
    dataSubmit.append('phone', this.props.user.dataFormOne.phone1)
    dataSubmit.append('phone2', this.props.user.dataFormOne.phone2)
    dataSubmit.append('birthplace', this.props.user.dataFormOne.birthPlace)
    dataSubmit.append('birthdate', this.props.user.dataFormOne.birthDate)
    dataSubmit.append(
      'maritalStatus',
      this.props.user.dataFormOne.maritalStatus,
    )
    dataSubmit.append(
      'employmentType',
      this.props.user.dataFormOne.employmentType,
    )
    dataSubmit.append('employmentDuration', employmentDuration)
    dataSubmit.append('religion', this.props.user.dataFormOne.religion)
    dataSubmit.append('bloodType', this.props.user.dataFormOne.bloodType)
    dataSubmit.append('gender', this.props.user.dataFormOne.gender)
    dataSubmit.append('address', this.props.user.dataFormOne.address)
    dataSubmit.append('country', this.props.user.dataFormOne.country)
    dataSubmit.append('city', this.props.user.dataFormOne.city)
    dataSubmit.append('zipCode', this.props.user.dataFormOne.zipCode)
    dataSubmit.append('district', this.props.user.dataFormOne.district)
    dataSubmit.append('photo', this.props.user.dataFormOne.profilePicture)
    dataSubmit.append('educationBackground', [
      {
        level: this.props.user.dataFormTwo.eduLevel1,
        institution: this.props.user.dataFormTwo.eduInstitution,
        period: this.props.user.dataFormTwo.eduPeriod1,
        major: this.props.user.dataFormTwo.eduMajor1,
        grade: this.props.user.dataFormTwo.eduGrade1,
      },
      {
        level: this.props.user.dataFormTwo.eduLevel2,
        institution: this.props.user.dataFormTwo.eduInstitution2,
        period: this.props.user.dataFormTwo.eduPeriod2,
        major: this.props.user.dataFormTwo.eduMajor2,
        grade: this.props.user.dataFormTwo.eduGrade2,
      },
      {
        level: this.props.user.dataFormTwo.eduLevel3,
        institution: this.props.user.dataFormTwo.eduInstitution3,
        period: this.props.user.dataFormTwo.eduPeriod3,
        major: this.props.user.dataFormTwo.eduMajor3,
        grade: this.props.user.dataFormTwo.eduGrade3,
      },
      {
        level: this.props.user.dataFormTwo.eduLevel4,
        institution: this.props.user.dataFormTwo.eduInstitution4,
        period: this.props.user.dataFormTwo.eduPeriod4,
        major: this.props.user.dataFormTwo.eduMajor4,
        grade: this.props.user.dataFormTwo.eduGrade4,
      },
      {
        level: this.props.user.dataFormTwo.eduLevel5,
        institution: this.props.user.dataFormTwo.eduInstitution5,
        period: this.props.user.dataFormTwo.eduPeriod5,
        major: this.props.user.dataFormTwo.eduMajor5,
        grade: this.props.user.dataFormTwo.eduGrade5,
      },
    ])
    dataSubmit.append('familyBackground', [
      {
        name: this.props.user.dataFormTwo.famName1,
        gender: this.props.user.dataFormTwo.famGender1,
        phone: this.props.user.dataFormTwo.famTel1,
        relation: this.props.user.dataFormTwo.famRelationship1,
        occupation: this.props.user.dataFormTwo.famOccupation1,
        address: this.props.user.dataFormTwo.famAddress1,
      },
      {
        name: this.props.user.dataFormTwo.famName2,
        gender: this.props.user.dataFormTwo.famGender2,
        phone: this.props.user.dataFormTwo.famTel2,
        relation: this.props.user.dataFormTwo.famRelationship2,
        occupation: this.props.user.dataFormTwo.famOccupation2,
        address: this.props.user.dataFormTwo.famAddress2,
      },
      {
        name: this.props.user.dataFormTwo.famName3,
        gender: this.props.user.dataFormTwo.famGender3,
        phone: this.props.user.dataFormTwo.famTel3,
        relation: this.props.user.dataFormTwo.famRelationship3,
        occupation: this.props.user.dataFormTwo.famOccupation3,
        address: this.props.user.dataFormTwo.famAddress3,
      },
      {
        name: this.props.user.dataFormTwo.famName4,
        gender: this.props.user.dataFormTwo.famGender4,
        phone: this.props.user.dataFormTwo.famTel4,
        relation: this.props.user.dataFormTwo.famRelationship4,
        occupation: this.props.user.dataFormTwo.famOccupation4,
        address: this.props.user.dataFormTwo.famAddress4,
      },
      {
        name: this.props.user.dataFormTwo.famName5,
        gender: this.props.user.dataFormTwo.famGender5,
        phone: this.props.user.dataFormTwo.famTel5,
        relation: this.props.user.dataFormTwo.famRelationship5,
        occupation: this.props.user.dataFormTwo.famOccupation5,
        address: this.props.user.dataFormTwo.famAddress5,
      },
    ])
    dataSubmit.append('workingExperience', [
      {
        company: this.props.user.dataFormTwo.workCompany1,
        period: this.props.user.dataFormTwo.workPeriod1,
        firstRole: this.props.user.dataFormTwo.workFirstRole1,
        lastRole: this.props.user.dataFormTwo.workLastRole1,
        lastSalary: this.props.user.dataFormTwo.workSalary1,
      },
      {
        company: this.props.user.dataFormTwo.workCompany2,
        period: this.props.user.dataFormTwo.workPeriod2,
        firstRole: this.props.user.dataFormTwo.workFirstRole2,
        lastRole: this.props.user.dataFormTwo.workLastRole2,
        lastSalary: this.props.user.dataFormTwo.workSalary2,
      },
      {
        company: this.props.user.dataFormTwo.workCompany3,
        period: this.props.user.dataFormTwo.workPeriod3,
        firstRole: this.props.user.dataFormTwo.workFirstRole3,
        lastRole: this.props.user.dataFormTwo.workLastRole3,
        lastSalary: this.props.user.dataFormTwo.workSalary3,
      },
      {
        company: this.props.user.dataFormTwo.workCompany4,
        period: this.props.user.dataFormTwo.workPeriod4,
        firstRole: this.props.user.dataFormTwo.workFirstRole4,
        lastRole: this.props.user.dataFormTwo.workLastRole4,
        lastSalary: this.props.user.dataFormTwo.workSalary4,
      },
      {
        company: this.props.user.dataFormTwo.workCompany5,
        period: this.props.user.dataFormTwo.workPeriod5,
        firstRole: this.props.user.dataFormTwo.workFirstRole5,
        lastRole: this.props.user.dataFormTwo.workLastRole5,
        lastSalary: this.props.user.dataFormTwo.workSalary5,
      },
    ])

    this.props
      .registerUser(dataSubmit, this.props.login.token)
      .then((res) => {
        this.setState({
          name: '',
          email: '',
          password: '',
          joinedDate: '',
          birthDate: '',
          role: 2,
          department: 1,
          timeType: 1,
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

  fetch() {
    this.setState({ isLoadingFetch: true })
    this.props.getDepartment(this.props.login.token).then((res) => {
      this.setState({ isLoadingFetch: false })
      this.props.newToken(res.action.payload.data.newToken)
    })
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    const classesBody = makeStyles(stylesBody)
    const departmentData = this.props.department.dataDepartment
    return (
      <div>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <nav className="navbar navbar-light bg-light row">
              <div className="d-flex align-items-center col">
                <h4 className="mr-6 ">Step 3 of 3</h4>
              </div>
              <div className="d-flex flex-row col justify-content-end">
                <Link
                  to="/admin/user/stepTwo"
                  className="btn btn-danger m-2 my-sm-0"
                >
                  {' '}
                  <Tooltip
                    id="tooltip-top-start"
                    title="Previous Step"
                    placement="top"
                    classes={{
                      tooltip: classesBody.tooltip,
                    }}
                  >
                    <NavigateBefore className="iconWhiteColor" />
                  </Tooltip>
                </Link>
              </div>
            </nav>
            {this.state.isLoadingFetch ? (
              <center>
                <div
                  className="spinner-border spinner-border-sm text-black"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </center>
            ) : (
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="danger">
                      <h4 className="cardTitleWhite">Add User</h4>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <Col xs={12} sm={12} md={12}>
                          <FormGroup>
                            <Label for="examplePassword">Email</Label>
                            <Input
                              value={this.state.email}
                              type="email"
                              name="email"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={12}>
                          <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                              value={this.state.password}
                              type="password"
                              name="password"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Row className="mx-1">
                          <Col xs={12} sm={12} md={3}>
                            <FormGroup>
                              <Label for="exampleEmail">Role</Label>
                              <Input
                                value={this.state.role}
                                type="select"
                                name="role"
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
                          <Col xs={12} sm={12} md={3}>
                            <FormGroup>
                              <Label for="exampleEmail">Department</Label>
                              <Input
                                value={this.state.department}
                                type="select"
                                name="department"
                                id="exampleSelect"
                                onChange={this.handleChange}
                              >
                                {departmentData.map((res) => (
                                  <option key={res.id} value={res.id}>
                                    {res.name}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={3}>
                            <FormGroup>
                              <Label for="exampleEmail">Time Type</Label>
                              <Input
                                value={this.state.timeType}
                                type="select"
                                name="timeType"
                                id="exampleSelect"
                                onChange={this.handleChange}
                              >
                                <option key={1} value={1}>
                                  Free Hours
                                </option>
                                <option key={2} value={2}>
                                  Security
                                </option>
                                <option key={3} value={3}>
                                  Office Hours
                                </option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={3}>
                            <FormGroup>
                              <Label for="exampleEmail">Joined Date</Label>
                              <Input
                                type="date"
                                value={this.state.joinedDate}
                                name="joinedDate"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      {this.state.isLoadingRegister ? (
                        <Button color="danger">
                          <div
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </Button>
                      ) : (
                        <Button onClick={this.register} color="danger">
                          Submit
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAddStepThree)
