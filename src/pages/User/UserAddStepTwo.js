/* eslint-disable jsx-a11y/anchor-is-valid */
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

import { getUser, registerUser, formTwo } from '../../redux/actions/user'
import { getDepartment } from '../../redux/actions/department'
import { newToken } from '../../redux/actions/login'
import { sendNotif } from '../../redux/actions/fcm'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class UserAddStepTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eduLevel1: 'SMA/SMK',
      eduLevel2: 'SMA/SMK',
      eduLevel3: 'SMA/SMK',
      eduLevel4: 'SMA/SMK',
      eduLevel5: 'SMA/SMK',
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
      famName1: '',
      famName2: '',
      famName3: '',
      famName4: '',
      famName5: '',
      famGender1: 1,
      famGender2: 1,
      famGender3: 1,
      famGender4: 1,
      famGender5: 1,
      famTel1: '',
      famTel2: '',
      famTel3: '',
      famTel4: '',
      famTel5: '',
      famRelationship1: '',
      famRelationship2: '',
      famRelationship3: '',
      famRelationship4: '',
      famRelationship5: '',
      famOccupation1: '',
      famOccupation2: '',
      famOccupation3: '',
      famOccupation4: '',
      famOccupation5: '',
      famAddress1: '',
      famAddress2: '',
      famAddress3: '',
      famAddress4: '',
      famAddress5: '',
      famCountry1: 'Indonesia',
      famCountry2: 'Indonesia',
      famCountry3: 'Indonesia',
      famCountry4: 'Indonesia',
      famCountry5: 'Indonesia',
      famCity1: '',
      famCity2: '',
      famCity3: '',
      famCity4: '',
      famCity5: '',
      famDistrict1: '',
      famDistrict2: '',
      famDistrict3: '',
      famDistrict4: '',
      famDistrict5: '',
      famZip1: '',
      famZip2: '',
      famZip3: '',
      famZip4: '',
      famZip5: '',
      workCompany1: '',
      workCompany2: '',
      workCompany3: '',
      workCompany4: '',
      workCompany5: '',
      workPeriod1: '',
      workPeriod2: '',
      workPeriod3: '',
      workPeriod4: '',
      workPeriod5: '',
      workFirstRole1: '',
      workFirstRole2: '',
      workFirstRole3: '',
      workFirstRole4: '',
      workFirstRole5: '',
      workLastRole1: '',
      workLastRole2: '',
      workLastRole3: '',
      workLastRole4: '',
      workLastRole5: '',
      workSalary1: '',
      workSalary2: '',
      workSalary3: '',
      workSalary4: '',
      workSalary5: '',
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
    this.nextPage = this.nextPage.bind(this)
    this.addEducation = this.addEducation.bind(this)
    this.addFamily = this.addFamily.bind(this)
    this.addWork = this.addWork.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  nextPage() {
    const dataSubmit = {
      eduLevel1: this.state.eduLevel1,
      eduLevel2: this.state.eduLevel2,
      eduLevel3: this.state.eduLevel3,
      eduLevel4: this.state.eduLevel4,
      eduLevel5: this.state.eduLevel5,
      eduInstitution1: this.state.eduInstitution1,
      eduInstitution2: this.state.eduInstitution2,
      eduInstitution3: this.state.eduInstitution3,
      eduInstitution4: this.state.eduInstitution4,
      eduInstitution5: this.state.eduInstitution5,
      eduPeriod1: this.state.eduPeriod1,
      eduPeriod2: this.state.eduPeriod2,
      eduPeriod3: this.state.eduPeriod3,
      eduPeriod4: this.state.eduPeriod4,
      eduPeriod5: this.state.eduPeriod5,
      eduMajor1: this.state.eduMajor1,
      eduMajor2: this.state.eduMajor2,
      eduMajor3: this.state.eduMajor3,
      eduMajor4: this.state.eduMajor4,
      eduMajor5: this.state.eduMajor5,
      eduGrade1: this.state.eduGrade1,
      eduGrade2: this.state.eduGrade2,
      eduGrade3: this.state.eduGrade3,
      eduGrade4: this.state.eduGrade4,
      eduGrade5: this.state.eduGrade5,
      famName1: this.state.famName1,
      famName2: this.state.famName2,
      famName3: this.state.famName3,
      famName4: this.state.famName4,
      famName5: this.state.famName5,
      famGender1: this.state.famGender1,
      famGender2: this.state.famGender2,
      famGender3: this.state.famGender3,
      famGender4: this.state.famGender4,
      famGender5: this.state.famGender5,
      famTel1: this.state.famTel1,
      famTel2: this.state.famTel2,
      famTel3: this.state.famTel3,
      famTel4: this.state.famTel4,
      famTel5: this.state.famTel5,
      famRelationship1: this.state.famRelationship1,
      famRelationship2: this.state.famRelationship2,
      famRelationship3: this.state.famRelationship3,
      famRelationship4: this.state.famRelationship4,
      famRelationship5: this.state.famRelationship5,
      famOccupation1: this.state.famOccupation1,
      famOccupation2: this.state.famOccupation2,
      famOccupation3: this.state.famOccupation3,
      famOccupation4: this.state.famOccupation4,
      famOccupation5: this.state.famOccupation5,
      famAddress1: this.state.famAddress1,
      famAddress2: this.state.famAddress2,
      famAddress3: this.state.famAddress3,
      famAddress4: this.state.famAddress4,
      famAddress5: this.state.famAddress5,
      famCountry1: this.state.famCountry1,
      famCountry2: this.state.famCountry2,
      famCountry3: this.state.famCountry3,
      famCountry4: this.state.famCountry4,
      famCountry5: this.state.famCountry5,
      famCity1: this.state.famCity1,
      famCity2: this.state.famCity2,
      famCity3: this.state.famCity3,
      famCity4: this.state.famCity4,
      famCity5: this.state.famCity5,
      famDistrict1: this.state.famDistrict1,
      famDistrict2: this.state.famDistrict2,
      famDistrict3: this.state.famDistrict3,
      famDistrict4: this.state.famDistrict4,
      famDistrict5: this.state.famDistrict5,
      famZip1: this.state.famZip1,
      famZip2: this.state.famZip2,
      famZip3: this.state.famZip3,
      famZip4: this.state.famZip4,
      famZip5: this.state.famZip5,
      workCompany1: this.state.workCompany1,
      workCompany2: this.state.workCompany2,
      workCompany3: this.state.workCompany3,
      workCompany4: this.state.workCompany4,
      workCompany5: this.state.workCompany5,
      workPeriod1: this.state.workPeriod1,
      workPeriod2: this.state.workPeriod2,
      workPeriod3: this.state.workPeriod3,
      workPeriod4: this.state.workPeriod4,
      workPeriod5: this.state.workPeriod5,
      workFirstRole1: this.state.workFirstRole1,
      workFirstRole2: this.state.workFirstRole2,
      workFirstRole3: this.state.workFirstRole3,
      workFirstRole4: this.state.workFirstRole4,
      workFirstRole5: this.state.workFirstRole5,
      workLastRole1: this.state.workLastRole1,
      workLastRole2: this.state.workLastRole2,
      workLastRole3: this.state.workLastRole3,
      workLastRole4: this.state.workLastRole4,
      workLastRole5: this.state.workLastRole5,
      workSalary1: this.state.workSalary1,
      workSalary2: this.state.workSalary2,
      workSalary3: this.state.workSalary3,
      workSalary4: this.state.workSalary4,
      workSalary5: this.state.workSalary5,
    }

    this.props.formTwo(dataSubmit)
    setTimeout(() => {
      this.props.history.push('/admin/user/stepThree')
    }, 100)
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
                      <Col form>
                        <div className="d-flex justify-content-between">
                          <h5>Educational Background</h5>
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
                                <option key={1} value="SD">
                                  SD
                                </option>
                                <option key={2} value="SMP">
                                  SMP
                                </option>
                                <option key={3} value="SMA/SMK">
                                  SMA/SMK
                                </option>
                                <option key={4} value="D1">
                                  D1
                                </option>
                                <option key={5} value="D3">
                                  D3
                                </option>
                                <option key={6} value="S1">
                                  S1
                                </option>
                                <option key={7} value="S2">
                                  S2
                                </option>
                                <option key={8} value="S3">
                                  S3
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
                                  <option key={1} value="SD">
                                    SD
                                  </option>
                                  <option key={2} value="SMP">
                                    SMP
                                  </option>
                                  <option key={3} value="SMA/SMK">
                                    SMA/SMK
                                  </option>
                                  <option key={4} value="D1">
                                    D1
                                  </option>
                                  <option key={5} value="D3">
                                    D3
                                  </option>
                                  <option key={6} value="S1">
                                    S1
                                  </option>
                                  <option key={7} value="S2">
                                    S2
                                  </option>
                                  <option key={8} value="S3">
                                    S3
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
                                  <option key={1} value="SD">
                                    SD
                                  </option>
                                  <option key={2} value="SMP">
                                    SMP
                                  </option>
                                  <option key={3} value="SMA/SMK">
                                    SMA/SMK
                                  </option>
                                  <option key={4} value="D1">
                                    D1
                                  </option>
                                  <option key={5} value="D3">
                                    D3
                                  </option>
                                  <option key={6} value="S1">
                                    S1
                                  </option>
                                  <option key={7} value="S2">
                                    S2
                                  </option>
                                  <option key={8} value="S3">
                                    S3
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
                                  <option key={1} value="SD">
                                    SD
                                  </option>
                                  <option key={2} value="SMP">
                                    SMP
                                  </option>
                                  <option key={3} value="SMA/SMK">
                                    SMA/SMK
                                  </option>
                                  <option key={4} value="D1">
                                    D1
                                  </option>
                                  <option key={5} value="D3">
                                    D3
                                  </option>
                                  <option key={6} value="S1">
                                    S1
                                  </option>
                                  <option key={7} value="S2">
                                    S2
                                  </option>
                                  <option key={8} value="S3">
                                    S3
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
                                  <option key={1} value="SD">
                                    SD
                                  </option>
                                  <option key={2} value="SMP">
                                    SMP
                                  </option>
                                  <option key={3} value="SMA/SMK">
                                    SMA/SMK
                                  </option>
                                  <option key={4} value="D1">
                                    D1
                                  </option>
                                  <option key={5} value="D3">
                                    D3
                                  </option>
                                  <option key={6} value="S1">
                                    S1
                                  </option>
                                  <option key={7} value="S2">
                                    S2
                                  </option>
                                  <option key={8} value="S3">
                                    S3
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
                                value={this.state.famName1}
                                name="famName1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={1}>
                            <FormGroup>
                              <Label for="exampleEmail">Gender</Label>
                              <Input
                                value={this.state.famGender1}
                                type="select"
                                name="famGender1"
                                onChange={this.handleChange}
                                id="exampleSelect"
                              >
                                <option key={1} value="Male">
                                  Male
                                </option>
                                <option key={2} value="Female">
                                  Female
                                </option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Telepon</Label>
                              <Input
                                value={this.state.famTel1}
                                name="famTel1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Relationship</Label>
                              <Input
                                value={this.state.famRelationship1}
                                name="famRelationship1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={3}>
                            <FormGroup>
                              <Label for="exampleEmail">Occupation</Label>
                              <Input
                                value={this.state.famOccupation1}
                                name="famOccupation1"
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
                                value={this.state.famAddress1}
                                name="famAddress1"
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
                                value={this.state.famCountry1}
                                type="select"
                                name="famCountry1"
                                onChange={this.handleChange}
                                id="exampleSelect"
                              >
                                <option key={1} value="Indonesia">
                                  Indonesia
                                </option>
                                <option key={2} value="India">
                                  India
                                </option>
                                <option key={3} value="Singapore">
                                  Singapore
                                </option>
                                <option key={4} value="Malaysia">
                                  Malaysia
                                </option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={3}>
                            {' '}
                            <FormGroup>
                              <Label for="exampleEmail">City</Label>
                              <Input
                                value={this.state.famCity1}
                                name="famCity1"
                                onChange={this.handleChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={3}>
                            {' '}
                            <FormGroup>
                              <Label for="exampleEmail">District</Label>
                              <Input
                                value={this.state.famDistrict1}
                                name="famDistrict1"
                                onChange={this.handleChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            {' '}
                            <FormGroup>
                              <Label for="exampleEmail">ZIP</Label>
                              <Input
                                value={this.state.famZip1}
                                name="famZip1"
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
                                    value={this.state.famName2}
                                    name="famName2"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={1}>
                                <FormGroup>
                                  <Label for="exampleEmail">Gender</Label>
                                  <Input
                                    value={this.state.famGender2}
                                    type="select"
                                    name="famGender2"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value="Male">
                                      Male
                                    </option>
                                    <option key={2} value="Female">
                                      Female
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Telepon</Label>
                                  <Input
                                    value={this.state.famTel2}
                                    name="famTel2"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Relationship</Label>
                                  <Input
                                    value={this.state.famRelationship2}
                                    name="famRelationship2"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                <FormGroup>
                                  <Label for="exampleEmail">Occupation</Label>
                                  <Input
                                    value={this.state.famOccupation2}
                                    name="famOccupation2"
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
                                    value={this.state.famAddress2}
                                    name="famAddress2"
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
                                    value={this.state.famCountry2}
                                    type="select"
                                    name="famCountry2"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value="Indonesia">
                                      Indonesia
                                    </option>
                                    <option key={2} value="India">
                                      India
                                    </option>
                                    <option key={3} value="Singapore">
                                      Singapore
                                    </option>
                                    <option key={4} value="Malaysia">
                                      Malaysia
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">City</Label>
                                  <Input
                                    value={this.state.famCity2}
                                    name="famCity2"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">District</Label>
                                  <Input
                                    value={this.state.famDistrict2}
                                    name="famDistrict2"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">ZIP</Label>
                                  <Input
                                    value={this.state.famZip2}
                                    name="famZip2"
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
                                    value={this.state.famName3}
                                    name="famName3"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={1}>
                                <FormGroup>
                                  <Label for="exampleEmail">Gender</Label>
                                  <Input
                                    value={this.state.famGender3}
                                    type="select"
                                    name="famGender3"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value="Male">
                                      Male
                                    </option>
                                    <option key={2} value="Female">
                                      Female
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Telepon</Label>
                                  <Input
                                    value={this.state.famTel3}
                                    name="famTel3"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Relationship</Label>
                                  <Input
                                    value={this.state.famRelationship3}
                                    name="famRelationship3"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                <FormGroup>
                                  <Label for="exampleEmail">Occupation</Label>
                                  <Input
                                    value={this.state.famOccupation3}
                                    name="famOccupation3"
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
                                    value={this.state.famAddress3}
                                    name="famAddress3"
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
                                    value={this.state.famCountry3}
                                    type="select"
                                    name="famCountry3"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value="Indonesia">
                                      Indonesia
                                    </option>
                                    <option key={2} value="India">
                                      India
                                    </option>
                                    <option key={3} value="Singapore">
                                      Singapore
                                    </option>
                                    <option key={4} value="Malaysia">
                                      Malaysia
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">City</Label>
                                  <Input
                                    value={this.state.famCity3}
                                    name="famCity3"
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
                                    value={this.state.famDistrict3}
                                    name="famDistrict3"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">ZIP</Label>
                                  <Input
                                    value={this.state.famZip3}
                                    name="famZip3"
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
                                    value={this.state.famName4}
                                    name="famName4"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={1}>
                                <FormGroup>
                                  <Label for="exampleEmail">Gender</Label>
                                  <Input
                                    value={this.state.famGender4}
                                    type="select"
                                    name="famGender4"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value="Male">
                                      Male
                                    </option>
                                    <option key={2} value="Female">
                                      Female
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Telepon</Label>
                                  <Input
                                    value={this.state.famTel4}
                                    name="famTel4"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Relationship</Label>
                                  <Input
                                    value={this.state.famRelationship4}
                                    name="famRelationship4"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                <FormGroup>
                                  <Label for="exampleEmail">Occupation</Label>
                                  <Input
                                    value={this.state.famOccupation4}
                                    name="famOccupation4"
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
                                    value={this.state.famAddress4}
                                    name="famAddress4"
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
                                    value={this.state.famCountry4}
                                    type="select"
                                    name="famCountry4"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value="Indonesia">
                                      Indonesia
                                    </option>
                                    <option key={2} value="India">
                                      India
                                    </option>
                                    <option key={3} value="Singapore">
                                      Singapore
                                    </option>
                                    <option key={4} value="Malaysia">
                                      Malaysia
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">City</Label>
                                  <Input
                                    value={this.state.famCity4}
                                    type="select"
                                    name="famCity4"
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
                                    value={this.state.famDistrict4}
                                    name="famDistrict4"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">ZIP</Label>
                                  <Input
                                    value={this.state.famZip4}
                                    name="famZip4"
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
                                    value={this.state.famName5}
                                    name="famName5"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={1}>
                                <FormGroup>
                                  <Label for="exampleEmail">Gender</Label>
                                  <Input
                                    value={this.state.famGender5}
                                    type="select"
                                    name="famGender5"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value="Male">
                                      Male
                                    </option>
                                    <option key={2} value="Female">
                                      Female
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Telepon</Label>
                                  <Input
                                    value={this.state.famTel5}
                                    name="famTel5"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                <FormGroup>
                                  <Label for="exampleEmail">Relationship</Label>
                                  <Input
                                    value={this.state.famRelationship5}
                                    name="famRelationship5"
                                    onChange={(e) => this.handleChange(e)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                <FormGroup>
                                  <Label for="exampleEmail">Occupation</Label>
                                  <Input
                                    value={this.state.famOccupation5}
                                    name="famOccupation5"
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
                                    value={this.state.famAddress5}
                                    name="famAddress5"
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
                                    value={this.state.famCountry5}
                                    type="select"
                                    name="famCountry5"
                                    onChange={this.handleChange}
                                    id="exampleSelect"
                                  >
                                    <option key={1} value="Indonesia">
                                      Indonesia
                                    </option>
                                    <option key={2} value="India">
                                      India
                                    </option>
                                    <option key={3} value="Singapore">
                                      Singapore
                                    </option>
                                    <option key={4} value="Malaysia">
                                      Malaysia
                                    </option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">City</Label>
                                  <Input
                                    value={this.state.famCity5}
                                    name="famCity5"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={3}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">District</Label>
                                  <Input
                                    value={this.state.famDistrict5}
                                    name="famDistrict5"
                                    onChange={this.handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs={12} sm={12} md={2}>
                                {' '}
                                <FormGroup>
                                  <Label for="exampleEmail">ZIP</Label>
                                  <Input
                                    value={this.state.famZip5}
                                    name="famZip5"
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
                                value={this.state.workCompany1}
                                name="workCompany1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Period</Label>
                              <Input
                                value={this.state.workPeriod1}
                                name="workPeriod1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">First Role</Label>
                              <Input
                                value={this.state.workFirstRole1}
                                name="workFirstRole1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Last Role</Label>
                              <Input
                                value={this.state.workLastRole1}
                                name="workLastRole1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Last Salary</Label>
                              <Input
                                value={this.state.workSalary1}
                                name="workSalary1"
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
                                  value={this.state.workCompany2}
                                  name="workCompany2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.workPeriod2}
                                  name="workPeriod2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">First Role</Label>
                                <Input
                                  value={this.state.workFirstRole2}
                                  name="workFirstRole2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Role</Label>
                                <Input
                                  value={this.state.workLastRole2}
                                  name="workLastRole2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Salary</Label>
                                <Input
                                  value={this.state.workSalary2}
                                  name="workSalary2"
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
                                  value={this.state.workCompany3}
                                  name="workCompany3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.workPeriod3}
                                  name="workPeriod3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">First Role</Label>
                                <Input
                                  value={this.state.workFirstRole3}
                                  name="workFirstRole3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Role</Label>
                                <Input
                                  value={this.state.workLastRole3}
                                  name="workLastRole3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Salary</Label>
                                <Input
                                  value={this.state.workSalary3}
                                  name="workSalary3"
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
                                  value={this.state.workCompany4}
                                  name="workCompany4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.workPeriod4}
                                  name="workPeriod4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">First Role</Label>
                                <Input
                                  value={this.state.workFirstRole4}
                                  name="workFirstRole4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Role</Label>
                                <Input
                                  value={this.state.workLastRole4}
                                  name="workLastRole4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Salary</Label>
                                <Input
                                  value={this.state.workSalary4}
                                  name="workSalary4"
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
                                  value={this.state.workCompany5}
                                  name="workCompany5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Period</Label>
                                <Input
                                  value={this.state.workPeriod5}
                                  name="workPeriod5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">First Role</Label>
                                <Input
                                  value={this.state.workFirstRole5}
                                  name="workFirstRole5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Role</Label>
                                <Input
                                  value={this.state.workLastRole5}
                                  name="workLastRole5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Last Salary</Label>
                                <Input
                                  value={this.state.workSalary5}
                                  name="workSalary5"
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
  formTwo,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAddStepTwo)
