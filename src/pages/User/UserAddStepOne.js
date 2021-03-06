/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable radix */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
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
// import Basic from './DragnDrop'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

import { getUser, registerUser, formOne } from '../../redux/actions/user'
import { getDepartment } from '../../redux/actions/department'
import { newToken } from '../../redux/actions/login'
import { sendNotif } from '../../redux/actions/fcm'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class UserAddStepOne extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      privateEmail: '',
      phone1: '',
      phone2: '',
      birthPlace: '',
      birthDate: '',
      maritalStatus: 'Single',
      employmentType: 3,
      employmentDuration: '',
      employmentDurationType: 1,
      religion: 'Islam',
      bloodType: 'A',
      gender: 'Male',
      address: '',
      country: 'Indonesia',
      city: '',
      district: '',
      zipCode: '',
      profilePicture: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  nextPage() {
    const dataSubmit = {
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      privateEmail: this.state.privateEmail,
      phone1: this.state.phone1,
      phone2: this.state.phone2,
      birthPlace: this.state.birthPlace,
      birthDate: this.state.birthDate,
      maritalStatus: this.state.maritalStatus,
      employmentDuration: this.state.employmentDuration,
      employmentType: this.state.employmentType,
      employmentDurationType: this.state.employmentDurationType,
      religion: this.state.religion,
      bloodType: this.state.bloodType,
      gender: this.state.gender,
      address: this.state.address,
      country: this.state.country,
      city: this.state.city,
      district: this.state.district,
      zipCode: this.state.zipCode,
      profilePicture: this.state.profilePicture,
    }
    this.props.formOne(dataSubmit)
    setTimeout(() => {
      this.props.history.push('/admin/user/stepTwo')
    }, 100)
  }

  redirect() {
    this.props.history.push('/login')
  }

  componentDidMount() {}

  render() {
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
                  onClick={this.nextPage}
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
                              value={this.state.firstName}
                              name="firstName"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Middle Name</Label>
                            <Input
                              value={this.state.middleName}
                              name="middleName"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Last Name</Label>
                            <Input
                              value={this.state.lastName}
                              name="lastName"
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
                              value={this.state.privateEmail}
                              name="privateEmail"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Phone 1</Label>
                            <Input
                              value={this.state.phone1}
                              name="phone1"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Phone 2</Label>
                            <Input
                              value={this.state.phone2}
                              name="phone2"
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
                              value={this.state.birthPlace}
                              name="birthPlace"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={2}>
                          <FormGroup>
                            <Label for="exampleEmail">Date of Birth</Label>
                            <Input
                              value={this.state.birthDate}
                              type="date"
                              name="birthDate"
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
                              value={this.state.maritalStatus}
                              type="select"
                              name="maritalStatus"
                              id="exampleSelect"
                              onChange={this.handleChange}
                            >
                              <option key={1} value="Single">
                                Single
                              </option>
                              <option key={2} value="Married">
                                Married
                              </option>
                              <option key={3} value="Widow/Widower">
                                Widow/Widower
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleSelect">Employment Status</Label>
                            <Input
                              value={this.state.employmentType}
                              type="select"
                              name="employmentType"
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
                      {parseInt(this.state.employmentType) < 3 ? (
                        <Row form>
                          <Col xs={12} sm={12} md={2}></Col>
                          <Col xs={12} sm={12} md={2}></Col>
                          <Col xs={12} sm={12} md={4}></Col>
                          <Col xs={6} sm={6} md={2}></Col>
                          <Col xs={3} sm={3} md={1}>
                            <FormGroup>
                              <Label for="exampleSelect">Duration</Label>
                              <Input
                                value={this.state.employmentDuration}
                                name="employmentDuration"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={3} sm={3} md={1}>
                            <FormGroup>
                              <Label for="exampleSelect">Type</Label>
                              <Input
                                value={this.state.employmentDurationType}
                                type="select"
                                name="employmentDurationType"
                                id="exampleSelect"
                                onChange={this.handleChange}
                              >
                                <option key={1} value={1}>
                                  Month
                                </option>
                                <option key={2} value={2}>
                                  Year
                                </option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      ) : (
                        <></>
                      )}
                      <Row form>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleSelect">Religion</Label>
                            <Input
                              value={this.state.religion}
                              type="select"
                              name="religion"
                              id="exampleSelect"
                              onChange={this.handleChange}
                            >
                              <option key={1} value="Islam">
                                Islam
                              </option>
                              <option key={2} value="Protestant">
                                Protestant
                              </option>
                              <option key={3} value="Catholic">
                                Catholic
                              </option>
                              <option key={4} value="Hinduism">
                                Hinduism
                              </option>
                              <option key={5} value="Buddhism">
                                Buddhism
                              </option>
                              <option key={6} value="Others">
                                Others
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleSelect">Blood Type</Label>
                            <Input
                              value={this.state.bloodType}
                              type="select"
                              name="bloodType"
                              onChange={this.handleChange}
                              id="exampleSelect"
                            >
                              <option key={1} value="A">
                                A
                              </option>
                              <option key={2} value="B">
                                B
                              </option>
                              <option key={3} value="AB">
                                AB
                              </option>
                              <option key={4} value="O">
                                O
                              </option>
                              <option key={4} value="-">
                                -
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
                                value="Male"
                                onChange={(e) => this.handleChange(e)}
                                inline
                              />
                              <CustomInput
                                type="radio"
                                id="exampleCustomRadio"
                                name="gender"
                                label="Female"
                                value="Female"
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
                            <Label for="exampleEmail">Country</Label>
                            <Input
                              value={this.state.country}
                              type="select"
                              name="country"
                              onChange={this.handleChange}
                              id="exampleSelect"
                            >
                              <option key={1} value="Indonesia">
                                Indonesia
                              </option>
                              <option key={2} value="Singapore">
                                Singapore
                              </option>
                              <option key={3} value="Malaysia">
                                Malaysia
                              </option>
                              <option key={4} value="India">
                                India
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                          {' '}
                          <FormGroup>
                            <Label for="exampleEmail">City</Label>
                            <Input
                              value={this.state.city}
                              name="city"
                              onChange={this.handleChange}
                              id="exampleSelect"
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={3}>
                          {' '}
                          <FormGroup>
                            <Label for="exampleEmail">District</Label>
                            <Input
                              value={this.state.district}
                              name="district"
                              onChange={this.handleChange}
                              id="exampleSelect"
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={2}>
                          {' '}
                          <FormGroup>
                            <Label for="exampleEmail">ZIP</Label>
                            <Input
                              value={this.state.zipCode}
                              name="zipCode"
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
                              Profile Picture (4:3 Ratio)
                            </Label>
                            <CustomInput
                              type="file"
                              id="exampleCustomFileBrowser"
                              name="profilePicture"
                              onChange={(e) =>
                                this.setState({
                                  profilePicture: e.target.files[0],
                                })
                              }
                            />
                            {/* <Basic /> */}
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
  formOne,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddStepOne)
