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
import { NavigateBefore, NavigateNext, Add, Remove } from '@material-ui/icons'
// @material-ui/core components
// import TextField from '@material-ui/core/TextField'
// import MenuItem from '@material-ui/core/MenuItem'
// import TablePagination from '@material-ui/core/TablePagination'
// Reactstrap/code
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'
// @material-ui/icons components
// core components
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

class UserAddStepTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      department: 1,
      page: 1,
      eduLevel1: 3,
      eduLevel2: 3,
      eduLevel3: 3,
      eduLevel4: 3,
      eduLevel5: 3,
      eduInstitution1: '',
      eduInstitution2: '',
      eduInstitution3: '',
      eduInstitution4: '',
      eduInstitution5: '',
      eduPeriod1: '',
      eduPeriod2: '',
      eduPeriod3: '',
      eduPeriod4: '',
      eduPeriod5: '',
      eduMajor1: '',
      eduMajor2: '',
      eduMajor3: '',
      eduMajor4: '',
      eduMajor5: '',
      eduGrade1: '',
      eduGrade2: '',
      eduGrade3: '',
      eduGrade4: '',
      eduGrade5: '',
      education2: false,
      education3: false,
      education4: false,
      education5: false,
      family2: false,
      family3: false,
      family4: false,
      family5: false,
      work2: false,
      work3: false,
      work4: false,
      work5: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.register = this.register.bind(this)
    this.addEducation = this.addEducation.bind(this)
    this.addFamily = this.addFamily.bind(this)
    this.addWork = this.addWork.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  nextPage() {
    if (this.state.page < this.props.user.infoUser.totalPage) {
      this.setState({ page: this.state.page + 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    }
  }

  addEducation() {
    if (!this.state.education2) {
      this.setState({ education2: true })
    } else if (!this.state.education3) {
      this.setState({ education3: true })
    } else if (!this.state.education4) {
      this.setState({ education4: true })
    } else {
      this.setState({ education5: true })
    }
  }

  addFamily() {
    if (!this.state.family2) {
      this.setState({ family2: true })
    } else if (!this.state.family3) {
      this.setState({ family3: true })
    } else if (!this.state.family4) {
      this.setState({ family4: true })
    } else {
      this.setState({ family5: true })
    }
  }

  addWork() {
    if (!this.state.work2) {
      this.setState({ work2: true })
    } else if (!this.state.work3) {
      this.setState({ work3: true })
    } else if (!this.state.work4) {
      this.setState({ work4: true })
    } else {
      this.setState({ work5: true })
    }
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
                <h4 className="mr-6 ">Step 2 of 3</h4>
              </div>
              <div className="d-flex flex-row col justify-content-end">
                <Link
                  to="/admin/user/stepOne"
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
                    {this.state.isLoadingExportAllLog ? (
                      <div
                        className="spinner-border spinner-border-sm text-white"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <NavigateBefore className="iconWhiteColor" />
                    )}
                  </Tooltip>
                </Link>
                <Link
                  to="/admin/user/stepThree"
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
                      <Col form>
                        <div className="d-flex justify-content-between">
                          <h5>Education Background</h5>
                          <button
                            className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                            type="button"
                            onClick={this.addEducation}
                          >
                            <Add />
                          </button>
                        </div>
                        <Row form>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Level</Label>
                              <Input
                                value={this.state.eduLevel1}
                                type="select"
                                name="eduLevel1"
                                onChange={this.handleChange}
                                id="exampleSelect"
                              >
                                <option key={1} value={1}>
                                  SD
                                </option>
                                <option key={2} value={2}>
                                  SMP
                                </option>
                                <option key={3} value={3}>
                                  SMA/SMK Sederajat
                                </option>
                                <option key={4} value={4}>
                                  D1
                                </option>
                                <option key={5} value={5}>
                                  D3
                                </option>
                                <option key={6} value={6}>
                                  S1
                                </option>
                                <option key={7} value={7}>
                                  S2
                                </option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={4}>
                            <FormGroup>
                              <Label for="exampleEmail">Institution</Label>
                              <Input
                                value={this.state.eduInstitution1}
                                name="eduInstitution1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Period</Label>
                              <Input
                                value={this.state.eduPeriod1}
                                name="eduPeriod1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Major</Label>
                              <Input
                                value={this.state.eduMajor1}
                                name="eduMajor1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Grade</Label>
                              <Input
                                value={this.state.eduGrade1}
                                name="eduGrade1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      {this.state.education2 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Education Background 2</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() =>
                                this.setState({ education2: false })
                              }
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Level</Label>
                                <Input
                                  value={this.state.eduLevel2}
                                  type="select"
                                  name="eduLevel2"
                                  onChange={this.handleChange}
                                  id="exampleSelect"
                                >
                                  <option key={1} value={1}>
                                    SD
                                  </option>
                                  <option key={2} value={2}>
                                    SMP
                                  </option>
                                  <option key={3} value={3}>
                                    SMA/SMK Sederajat
                                  </option>
                                  <option key={4} value={4}>
                                    D1
                                  </option>
                                  <option key={5} value={5}>
                                    D3
                                  </option>
                                  <option key={6} value={6}>
                                    S1
                                  </option>
                                  <option key={7} value={7}>
                                    S2
                                  </option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Institution</Label>
                                <Input
                                  value={this.state.eduInstitution2}
                                  name="eduInstitution2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.eduPeriod2}
                                  name="eduPeriod2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Major</Label>
                                <Input
                                  value={this.state.eduMajor2}
                                  name="eduMajor2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Grade</Label>
                                <Input
                                  value={this.state.eduGrade2}
                                  name="eduGrade2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.education3 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Education Background 3</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() =>
                                this.setState({ education3: false })
                              }
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Level</Label>
                                <Input
                                  value={this.state.eduLevel3}
                                  type="select"
                                  name="eduLevel3"
                                  onChange={this.handleChange}
                                  id="exampleSelect"
                                >
                                  <option key={1} value={1}>
                                    SD
                                  </option>
                                  <option key={2} value={2}>
                                    SMP
                                  </option>
                                  <option key={3} value={3}>
                                    SMA/SMK Sederajat
                                  </option>
                                  <option key={4} value={4}>
                                    D1
                                  </option>
                                  <option key={5} value={5}>
                                    D3
                                  </option>
                                  <option key={6} value={6}>
                                    S1
                                  </option>
                                  <option key={7} value={7}>
                                    S2
                                  </option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Institution</Label>
                                <Input
                                  value={this.state.eduInstitution3}
                                  name="eduInstitution3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.eduPeriod3}
                                  name="eduPeriod3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Major</Label>
                                <Input
                                  value={this.state.eduMajor3}
                                  name="eduMajor3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Grade</Label>
                                <Input
                                  value={this.state.eduGrade3}
                                  name="eduGrade3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.education4 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Education Background 4</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() =>
                                this.setState({ education4: false })
                              }
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Level</Label>
                                <Input
                                  value={this.state.eduLevel4}
                                  type="select"
                                  name="eduLevel4"
                                  onChange={this.handleChange}
                                  id="exampleSelect"
                                >
                                  <option key={1} value={1}>
                                    SD
                                  </option>
                                  <option key={2} value={2}>
                                    SMP
                                  </option>
                                  <option key={3} value={3}>
                                    SMA/SMK Sederajat
                                  </option>
                                  <option key={4} value={4}>
                                    D1
                                  </option>
                                  <option key={5} value={5}>
                                    D3
                                  </option>
                                  <option key={6} value={6}>
                                    S1
                                  </option>
                                  <option key={7} value={7}>
                                    S2
                                  </option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Institution</Label>
                                <Input
                                  value={this.state.eduInstitution4}
                                  name="eduInstitution4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.eduPeriod4}
                                  name="eduPeriod4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Major</Label>
                                <Input
                                  value={this.state.eduMajor4}
                                  name="eduMajor4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Grade</Label>
                                <Input
                                  value={this.state.eduGrade4}
                                  name="eduGrade4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.education5 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Education Background 5</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() =>
                                this.setState({ education5: false })
                              }
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Level</Label>
                                <Input
                                  value={this.state.eduLevel5}
                                  type="select"
                                  name="eduLevel5"
                                  onChange={this.handleChange}
                                  id="exampleSelect"
                                >
                                  <option key={1} value={1}>
                                    SD
                                  </option>
                                  <option key={2} value={2}>
                                    SMP
                                  </option>
                                  <option key={3} value={3}>
                                    SMA/SMK Sederajat
                                  </option>
                                  <option key={4} value={4}>
                                    D1
                                  </option>
                                  <option key={5} value={5}>
                                    D3
                                  </option>
                                  <option key={6} value={6}>
                                    S1
                                  </option>
                                  <option key={7} value={7}>
                                    S2
                                  </option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Institution</Label>
                                <Input
                                  value={this.state.eduInstitution5}
                                  name="eduInstitution5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.eduPeriod5}
                                  name="eduPeriod5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Major</Label>
                                <Input
                                  value={this.state.eduMajor5}
                                  name="eduMajor5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Grade</Label>
                                <Input
                                  value={this.state.eduGrade5}
                                  name="eduGrade5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      <Col form>
                        <div className="d-flex justify-content-between mt-5">
                          <h5>Family Background</h5>
                          <button
                            className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                            type="button"
                            onClick={this.addFamily}
                          >
                            <Add />
                          </button>
                        </div>
                        <Row form>
                          <Col xs={12} sm={12} md={4}>
                            <FormGroup>
                              <Label for="exampleEmail">Name</Label>
                              <Input
                                value={this.state.name}
                                name="name"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={1}>
                            <FormGroup>
                              <Label for="exampleEmail">Gender</Label>
                              <Input
                                value={this.state.department}
                                type="select"
                                name="department"
                                onChange={this.handleChange}
                                id="exampleSelect"
                              >
                                <option key={1} value={1}>
                                  Male
                                </option>
                                <option key={2} value={2}>
                                  Female
                                </option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Telepon</Label>
                              <Input
                                value={this.state.phone}
                                name="phone"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Relationship</Label>
                              <Input
                                value={this.state.phone}
                                name="phone"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={3}>
                            <FormGroup>
                              <Label for="exampleEmail">Occupation</Label>
                              <Input
                                value={this.state.phone}
                                name="phone"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row form>
                          <Col xs={12} sm={12} md={12}>
                            <FormGroup>
                              <Label for="exampleEmail">Address</Label>
                              <Input
                                value={this.state.name}
                                name="name"
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
                      </Col>
                      {this.state.family2 ? (
                        <>
                          <Col form>
                            <div className="d-flex justify-content-between mt-5">
                              <h5>Family Background 2</h5>
                              <button
                                className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                                type="button"
                                onClick={() =>
                                  this.setState({ family2: false })
                                }
                              >
                                <Remove />
                              </button>
                            </div>
                            <Row form>
                              <Col xs={12} sm={12} md={4}>
                                <FormGroup>
                                  <Label for="exampleEmail">Name</Label>
                                  <Input
                                    value={this.state.name}
                                    name="name"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={1}>
                                <FormGroup>
                                  <Label for="exampleEmail">Gender</Label>
                                  <Input
                                    value={this.state.department}
                                    type="select"
                                    name="department"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value={1}>
                                      Male
                                    </option>
                                    <option key={2} value={2}>
                                      Female
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Telepon</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Relationship</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                <FormGroup>
                                  <Label for="exampleEmail">Occupation</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row form>
                              <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                  <Label for="exampleEmail">Address</Label>
                                  <Input
                                    value={this.state.name}
                                    name="name"
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
                          </Col>
                        </>
                      ) : (
                        <></>
                      )}
                      {this.state.family3 ? (
                        <>
                          <Col form>
                            <div className="d-flex justify-content-between mt-5">
                              <h5>Family Background 3</h5>
                              <button
                                className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                                type="button"
                                onClick={() =>
                                  this.setState({ family3: false })
                                }
                              >
                                <Remove />
                              </button>
                            </div>
                            <Row form>
                              <Col xs={12} sm={12} md={4}>
                                <FormGroup>
                                  <Label for="exampleEmail">Name</Label>
                                  <Input
                                    value={this.state.name}
                                    name="name"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={1}>
                                <FormGroup>
                                  <Label for="exampleEmail">Gender</Label>
                                  <Input
                                    value={this.state.department}
                                    type="select"
                                    name="department"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value={1}>
                                      Male
                                    </option>
                                    <option key={2} value={2}>
                                      Female
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Telepon</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Relationship</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                <FormGroup>
                                  <Label for="exampleEmail">Occupation</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row form>
                              <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                  <Label for="exampleEmail">Address</Label>
                                  <Input
                                    value={this.state.name}
                                    name="name"
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
                          </Col>
                        </>
                      ) : (
                        <></>
                      )}
                      {this.state.family4 ? (
                        <>
                          <Col form>
                            <div className="d-flex justify-content-between mt-5">
                              <h5>Family Background 4</h5>
                              <button
                                className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                                type="button"
                                onClick={() =>
                                  this.setState({ family4: false })
                                }
                              >
                                <Remove />
                              </button>
                            </div>
                            <Row form>
                              <Col xs={12} sm={12} md={4}>
                                <FormGroup>
                                  <Label for="exampleEmail">Name</Label>
                                  <Input
                                    value={this.state.name}
                                    name="name"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={1}>
                                <FormGroup>
                                  <Label for="exampleEmail">Gender</Label>
                                  <Input
                                    value={this.state.department}
                                    type="select"
                                    name="department"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value={1}>
                                      Male
                                    </option>
                                    <option key={2} value={2}>
                                      Female
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Telepon</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Relationship</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                <FormGroup>
                                  <Label for="exampleEmail">Occupation</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row form>
                              <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                  <Label for="exampleEmail">Address</Label>
                                  <Input
                                    value={this.state.name}
                                    name="name"
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
                          </Col>
                        </>
                      ) : (
                        <></>
                      )}
                      {this.state.family5 ? (
                        <>
                          <Col form>
                            <div className="d-flex justify-content-between mt-5">
                              <h5>Family Background 5</h5>
                              <button
                                className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                                type="submit"
                                onClick={() =>
                                  this.setState({ family5: false })
                                }
                              >
                                <Remove />
                              </button>
                            </div>
                            <Row form>
                              <Col xs={12} sm={12} md={4}>
                                <FormGroup>
                                  <Label for="exampleEmail">Name</Label>
                                  <Input
                                    value={this.state.name}
                                    name="name"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={1}>
                                <FormGroup>
                                  <Label for="exampleEmail">Gender</Label>
                                  <Input
                                    value={this.state.department}
                                    type="select"
                                    name="department"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value={1}>
                                      Male
                                    </option>
                                    <option key={2} value={2}>
                                      Female
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Telepon</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Relationship</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                <FormGroup>
                                  <Label for="exampleEmail">Occupation</Label>
                                  <Input
                                    value={this.state.phone}
                                    name="phone"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row form>
                              <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                  <Label for="exampleEmail">Address</Label>
                                  <Input
                                    value={this.state.name}
                                    name="name"
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
                          </Col>
                        </>
                      ) : (
                        <></>
                      )}
                      <Col form>
                        <div className="d-flex justify-content-between mt-5">
                          <h5>Working Experience</h5>
                          <button
                            className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                            type="button"
                            onClick={this.addWork}
                          >
                            <Add />
                          </button>
                        </div>
                        <Row form>
                          <Col xs={12} sm={12} md={4}>
                            <FormGroup>
                              <Label for="exampleEmail">Company</Label>
                              <Input
                                value={this.state.name}
                                name="name"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Period</Label>
                              <Input
                                value={this.state.email}
                                name="email"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">First Role</Label>
                              <Input
                                value={this.state.phone}
                                name="phone"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Last Role</Label>
                              <Input
                                value={this.state.phone}
                                name="phone"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Last Salary</Label>
                              <Input
                                value={this.state.phone}
                                name="phone"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      {this.state.work2 ? (
                        <Col form>
                          <div className="d-flex justify-content-between mt-5">
                            <h5>Working Experience 2</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() => this.setState({ work2: false })}
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Company</Label>
                                <Input
                                  value={this.state.name}
                                  name="name"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.email}
                                  name="email"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">First Role</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Role</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Salary</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.work3 ? (
                        <Col form>
                          <div className="d-flex justify-content-between mt-5">
                            <h5>Working Experience 3</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() => this.setState({ work3: false })}
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Company</Label>
                                <Input
                                  value={this.state.name}
                                  name="name"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.email}
                                  name="email"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">First Role</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Role</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Salary</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.work4 ? (
                        <Col form>
                          <div className="d-flex justify-content-between mt-5">
                            <h5>Working Experience 4</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() => this.setState({ work4: false })}
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Company</Label>
                                <Input
                                  value={this.state.name}
                                  name="name"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.email}
                                  name="email"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">First Role</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Role</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Salary</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.work5 ? (
                        <Col form>
                          <div className="d-flex justify-content-between mt-5">
                            <h5>Working Experience 5</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() => this.setState({ work5: false })}
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Company</Label>
                                <Input
                                  value={this.state.name}
                                  name="name"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.email}
                                  name="email"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">First Role</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Role</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Salary</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAddStepTwo)
