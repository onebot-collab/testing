/* eslint-disable eqeqeq */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Actual.css'
import { Add, Remove } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
// @material-ui/core components
// import TextField from '@material-ui/core/TextField'
// import MenuItem from '@material-ui/core/MenuItem'
// import TablePagination from '@material-ui/core/TablePagination'
// Reactstrap/code
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
} from 'reactstrap'
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
// import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class UserEditBackground extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eduLevel1: this.props.user.dataFormEditBackground.edu[0].level,
      eduLevel2: this.props.user.dataFormEditBackground.edu[1].level,
      eduLevel3: this.props.user.dataFormEditBackground.edu[2].level,
      eduLevel4: this.props.user.dataFormEditBackground.edu[3].level,
      eduLevel5: this.props.user.dataFormEditBackground.edu[4].level,
      eduInstitution1: this.props.user.dataFormEditBackground.edu[0]
        .institution,
      eduInstitution2: this.props.user.dataFormEditBackground.edu[1]
        .institution,
      eduInstitution3: this.props.user.dataFormEditBackground.edu[2]
        .institution,
      eduInstitution4: this.props.user.dataFormEditBackground.edu[3]
        .institution,
      eduInstitution5: this.props.user.dataFormEditBackground.edu[4]
        .institution,
      eduPeriod1: this.props.user.dataFormEditBackground.edu[0].period,
      eduPeriod2: this.props.user.dataFormEditBackground.edu[1].period,
      eduPeriod3: this.props.user.dataFormEditBackground.edu[2].period,
      eduPeriod4: this.props.user.dataFormEditBackground.edu[3].period,
      eduPeriod5: this.props.user.dataFormEditBackground.edu[4].period,
      eduMajor1: this.props.user.dataFormEditBackground.edu[0].major,
      eduMajor2: this.props.user.dataFormEditBackground.edu[1].major,
      eduMajor3: this.props.user.dataFormEditBackground.edu[2].major,
      eduMajor4: this.props.user.dataFormEditBackground.edu[3].major,
      eduMajor5: this.props.user.dataFormEditBackground.edu[4].major,
      eduGrade1: this.props.user.dataFormEditBackground.edu[0].grade,
      eduGrade2: this.props.user.dataFormEditBackground.edu[1].grade,
      eduGrade3: this.props.user.dataFormEditBackground.edu[2].grade,
      eduGrade4: this.props.user.dataFormEditBackground.edu[3].grade,
      eduGrade5: this.props.user.dataFormEditBackground.edu[4].grade,
      education2:
        this.props.user.dataFormEditBackground.edu[1].institution !== null,
      education3:
        this.props.user.dataFormEditBackground.edu[2].institution !== null,
      education4:
        this.props.user.dataFormEditBackground.edu[3].institution !== null,
      education5:
        this.props.user.dataFormEditBackground.edu[4].institution !== null,
      famName1: this.props.user.dataFormEditBackground.fam[0].name,
      famName2: this.props.user.dataFormEditBackground.fam[1].name,
      famName3: this.props.user.dataFormEditBackground.fam[2].name,
      famName4: this.props.user.dataFormEditBackground.fam[3].name,
      famName5: this.props.user.dataFormEditBackground.fam[4].name,
      famGender1: this.props.user.dataFormEditBackground.fam[0].gender,
      famGender2: this.props.user.dataFormEditBackground.fam[1].gender,
      famGender3: this.props.user.dataFormEditBackground.fam[2].gender,
      famGender4: this.props.user.dataFormEditBackground.fam[3].gender,
      famGender5: this.props.user.dataFormEditBackground.fam[4].gender,
      famTel1: this.props.user.dataFormEditBackground.fam[0].phone,
      famTel2: this.props.user.dataFormEditBackground.fam[1].phone,
      famTel3: this.props.user.dataFormEditBackground.fam[2].phone,
      famTel4: this.props.user.dataFormEditBackground.fam[3].phone,
      famTel5: this.props.user.dataFormEditBackground.fam[4].phone,
      famRelationship1: this.props.user.dataFormEditBackground.fam[0].relation,
      famRelationship2: this.props.user.dataFormEditBackground.fam[1].relation,
      famRelationship3: this.props.user.dataFormEditBackground.fam[2].relation,
      famRelationship4: this.props.user.dataFormEditBackground.fam[3].relation,
      famRelationship5: this.props.user.dataFormEditBackground.fam[4].relation,
      famOccupation1: this.props.user.dataFormEditBackground.fam[0].occupation,
      famOccupation2: this.props.user.dataFormEditBackground.fam[1].occupation,
      famOccupation3: this.props.user.dataFormEditBackground.fam[2].occupation,
      famOccupation4: this.props.user.dataFormEditBackground.fam[3].occupation,
      famOccupation5: this.props.user.dataFormEditBackground.fam[4].occupation,
      famAddress1: this.props.user.dataFormEditBackground.fam[0].address,
      famAddress2: this.props.user.dataFormEditBackground.fam[1].address,
      famAddress3: this.props.user.dataFormEditBackground.fam[2].address,
      famAddress4: this.props.user.dataFormEditBackground.fam[3].address,
      famAddress5: this.props.user.dataFormEditBackground.fam[4].address,
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
      workCompany1: this.props.user.dataFormEditBackground.work[0].company,
      workCompany2: this.props.user.dataFormEditBackground.work[1].company,
      workCompany3: this.props.user.dataFormEditBackground.work[2].company,
      workCompany4: this.props.user.dataFormEditBackground.work[3].company,
      workCompany5: this.props.user.dataFormEditBackground.work[4].company,
      workPeriod1: this.props.user.dataFormEditBackground.work[0].period,
      workPeriod2: this.props.user.dataFormEditBackground.work[1].period,
      workPeriod3: this.props.user.dataFormEditBackground.work[2].period,
      workPeriod4: this.props.user.dataFormEditBackground.work[3].period,
      workPeriod5: this.props.user.dataFormEditBackground.work[4].period,
      workFirstRole1: this.props.user.dataFormEditBackground.work[0].firstRole,
      workFirstRole2: this.props.user.dataFormEditBackground.work[1].firstRole,
      workFirstRole3: this.props.user.dataFormEditBackground.work[2].firstRole,
      workFirstRole4: this.props.user.dataFormEditBackground.work[3].firstRole,
      workFirstRole5: this.props.user.dataFormEditBackground.work[4].firstRole,
      workLastRole1: this.props.user.dataFormEditBackground.work[0].lastRole,
      workLastRole2: this.props.user.dataFormEditBackground.work[1].lastRole,
      workLastRole3: this.props.user.dataFormEditBackground.work[2].lastRole,
      workLastRole4: this.props.user.dataFormEditBackground.work[3].lastRole,
      workLastRole5: this.props.user.dataFormEditBackground.work[4].lastRole,
      workSalary1: this.props.user.dataFormEditBackground.work[0].lastSalary,
      workSalary2: this.props.user.dataFormEditBackground.work[1].lastSalary,
      workSalary3: this.props.user.dataFormEditBackground.work[2].lastSalary,
      workSalary4: this.props.user.dataFormEditBackground.work[3].lastSalary,
      workSalary5: this.props.user.dataFormEditBackground.work[4].lastSalary,
      family2: this.props.user.dataFormEditBackground.fam[1].name !== null,
      family3: this.props.user.dataFormEditBackground.fam[2].name !== null,
      family4: this.props.user.dataFormEditBackground.fam[3].name !== null,
      family5: this.props.user.dataFormEditBackground.fam[4].name !== null,
      work2: this.props.user.dataFormEditBackground.work[1].company !== null,
      work3: this.props.user.dataFormEditBackground.work[2].company !== null,
      work4: this.props.user.dataFormEditBackground.work[3].company !== null,
      work5: this.props.user.dataFormEditBackground.work[4].company !== null,
      titleAssets1: this.props.user.dataFormEditBackground.onHand[0].title,
      titleAssets2: this.props.user.dataFormEditBackground.onHand[1].title,
      titleAssets3: this.props.user.dataFormEditBackground.onHand[2].title,
      titleAssets4: this.props.user.dataFormEditBackground.onHand[3].title,
      titleAssets5: this.props.user.dataFormEditBackground.onHand[4].title,
      descAssets1: this.props.user.dataFormEditBackground.onHand[0].description,
      descAssets2: this.props.user.dataFormEditBackground.onHand[1].description,
      descAssets3: this.props.user.dataFormEditBackground.onHand[2].description,
      descAssets4: this.props.user.dataFormEditBackground.onHand[3].description,
      descAssets5: this.props.user.dataFormEditBackground.onHand[4].description,
      fileAssets1: this.props.user.dataFormEditBackground.onHand[0].file,
      fileAssets2: this.props.user.dataFormEditBackground.onHand[1].file,
      fileAssets3: this.props.user.dataFormEditBackground.onHand[2].file,
      fileAssets4: this.props.user.dataFormEditBackground.onHand[3].file,
      fileAssets5: this.props.user.dataFormEditBackground.onHand[4].file,
      assets2: this.props.user.dataFormEditBackground.onHand[1].title !== null,
      assets3: this.props.user.dataFormEditBackground.onHand[2].title !== null,
      assets4: this.props.user.dataFormEditBackground.onHand[3].title !== null,
      assets5: this.props.user.dataFormEditBackground.onHand[4].title !== null,
      titleAssetsOff1: this.props.user.dataFormEditBackground.offHand[0].title,
      titleAssetsOff2: this.props.user.dataFormEditBackground.offHand[1].title,
      titleAssetsOff3: this.props.user.dataFormEditBackground.offHand[2].title,
      titleAssetsOff4: this.props.user.dataFormEditBackground.offHand[3].title,
      titleAssetsOff5: this.props.user.dataFormEditBackground.offHand[4].title,
      descAssetsOff1: this.props.user.dataFormEditBackground.offHand[0]
        .description,
      descAssetsOff2: this.props.user.dataFormEditBackground.offHand[1]
        .description,
      descAssetsOff3: this.props.user.dataFormEditBackground.offHand[2]
        .description,
      descAssetsOff4: this.props.user.dataFormEditBackground.offHand[3]
        .description,
      descAssetsOff5: this.props.user.dataFormEditBackground.offHand[4]
        .description,
      fileAssetsOff1: this.props.user.dataFormEditBackground.offHand[0].file,
      fileAssetsOff2: this.props.user.dataFormEditBackground.offHand[1].file,
      fileAssetsOff3: this.props.user.dataFormEditBackground.offHand[2].file,
      fileAssetsOff4: this.props.user.dataFormEditBackground.offHand[3].file,
      fileAssetsOff5: this.props.user.dataFormEditBackground.offHand[4].file,
      assetsOff2:
        this.props.user.dataFormEditBackground.offHand[1].title !== null,
      assetsOff3:
        this.props.user.dataFormEditBackground.offHand[2].title !== null,
      assetsOff4:
        this.props.user.dataFormEditBackground.offHand[3].title !== null,
      assetsOff5:
        this.props.user.dataFormEditBackground.offHand[4].title !== null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.addEducation = this.addEducation.bind(this)
    this.addFamily = this.addFamily.bind(this)
    this.addWork = this.addWork.bind(this)
    this.addAsset = this.addAsset.bind(this)
    this.addAssetOff = this.addAssetOff.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
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

  addAsset() {
    if (!this.state.assets2) {
      this.setState({ assets2: true })
    } else if (!this.state.assets3) {
      this.setState({ assets3: true })
    } else if (!this.state.assets4) {
      this.setState({ assets4: true })
    } else {
      this.setState({ assets5: true })
    }
  }

  addAssetOff() {
    if (!this.state.assetsOff2) {
      this.setState({ assetsOff2: true })
    } else if (!this.state.assetsOff3) {
      this.setState({ assetsOff3: true })
    } else if (!this.state.assetsOff4) {
      this.setState({ assetsOff4: true })
    } else {
      this.setState({ assetsOff5: true })
    }
  }

  componentDidMount() {
    console.log(this.props.user.dataFormEditBackground)
  }

  render() {
    // const classesBody = makeStyles(stylesBody)
    return (
      <div>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10}>
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
                                this.setState({
                                  education2: false,
                                })
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
                                this.setState({
                                  education3: false,
                                })
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
                                this.setState({
                                  education4: false,
                                })
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
                                this.setState({
                                  education5: false,
                                })
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
                      <Col form>
                        <div className="d-flex justify-content-between mt-5">
                          <h5>Assets On Hand</h5>
                          <button
                            className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                            type="button"
                            onClick={this.addAsset}
                          >
                            <Add />
                          </button>
                        </div>
                        <Row form>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Title</Label>
                              <Input
                                value={this.state.titleAssets1}
                                name="titleAssets1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={4}>
                            <FormGroup>
                              <Label for="exampleEmail">Description</Label>
                              <Input
                                value={this.state.descAssets1}
                                name="descAssets1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={6}>
                            <FormGroup>
                              <Label for="exampleCustomFileBrowser">
                                Assets
                              </Label>
                              <CustomInput
                                type="file"
                                id="exampleCustomFileBrowser"
                                name="profilePicture"
                                onChange={(e) =>
                                  this.setState({
                                    fileAssets1: e.target.files[0],
                                  })
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      {this.state.assets2 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Assets 2</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() => this.setState({ assets2: false })}
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input
                                  value={this.state.titleAssets2}
                                  name="titleAssets2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Description</Label>
                                <Input
                                  value={this.state.descAssets2}
                                  name="descAssets2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="exampleCustomFileBrowser">
                                  Assets
                                </Label>
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="profilePicture"
                                  onChange={(e) =>
                                    this.setState({
                                      fileAssets2: e.target.files[0],
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.assets3 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Assets 3</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() => this.setState({ assets3: false })}
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input
                                  value={this.state.titleAssets3}
                                  name="titleAssets3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Description</Label>
                                <Input
                                  value={this.state.descAssets3}
                                  name="descAssets3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="exampleCustomFileBrowser">
                                  Assets
                                </Label>
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="profilePicture"
                                  onChange={(e) =>
                                    this.setState({
                                      fileAssets3: e.target.files[0],
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.assets4 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Assets 4</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() => this.setState({ assets4: false })}
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input
                                  value={this.state.titleAssets4}
                                  name="titleAssets4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Description</Label>
                                <Input
                                  value={this.state.descAssets4}
                                  name="descAssets4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="exampleCustomFileBrowser">
                                  Assets
                                </Label>
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="profilePicture"
                                  onChange={(e) =>
                                    this.setState({
                                      fileAssets4: e.target.files[0],
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.assets5 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Assets 5</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() => this.setState({ assets5: false })}
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input
                                  value={this.state.titleAssets5}
                                  name="titleAssets5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Description</Label>
                                <Input
                                  value={this.state.descAssets5}
                                  name="descAssets5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="exampleCustomFileBrowser">
                                  Assets
                                </Label>
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="profilePicture"
                                  onChange={(e) =>
                                    this.setState({
                                      fileAssets5: e.target.files[0],
                                    })
                                  }
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
                          <h5>Assets Off Hand</h5>
                          <button
                            className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                            type="button"
                            onClick={this.addAssetOff}
                          >
                            <Add />
                          </button>
                        </div>
                        <Row form>
                          <Col xs={12} sm={12} md={2}>
                            <FormGroup>
                              <Label for="exampleEmail">Title</Label>
                              <Input
                                value={this.state.titleAssetsOff1}
                                name="titleAssetsOff1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={4}>
                            <FormGroup>
                              <Label for="exampleEmail">Description</Label>
                              <Input
                                value={this.state.descAssetsOff1}
                                name="descAssetsOff1"
                                onChange={(e) => this.handleChange(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} sm={12} md={6}>
                            <FormGroup>
                              <Label for="exampleCustomFileBrowser">
                                Assets
                              </Label>
                              <CustomInput
                                type="file"
                                id="exampleCustomFileBrowser"
                                name="profilePicture"
                                onChange={(e) =>
                                  this.setState({
                                    fileAssetsOff1: e.target.files[0],
                                  })
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      {this.state.assetsOff2 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Assets 2</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() =>
                                this.setState({ assetsOff2: false })
                              }
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input
                                  value={this.state.titleAssetsOff2}
                                  name="titleAssetsOff2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Description</Label>
                                <Input
                                  value={this.state.descAssetsOff2}
                                  name="descAssetsOff2"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="exampleCustomFileBrowser">
                                  Assets
                                </Label>
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="profilePicture"
                                  onChange={(e) =>
                                    this.setState({
                                      fileAssetsOff2: e.target.files[0],
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.assetsOff3 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Assets 3</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() =>
                                this.setState({ assetsOff3: false })
                              }
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input
                                  value={this.state.titleAssetsOff3}
                                  name="titleAssetsOff3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Description</Label>
                                <Input
                                  value={this.state.descAssetsOff3}
                                  name="descAssetsOff3"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="exampleCustomFileBrowser">
                                  Assets
                                </Label>
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="profilePicture"
                                  onChange={(e) =>
                                    this.setState({
                                      fileAssetsOff3: e.target.files[0],
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.assetsOff4 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Assets 4</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() =>
                                this.setState({ assetsOff4: false })
                              }
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input
                                  value={this.state.titleAssetsOff4}
                                  name="titleAssetsOff4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Description</Label>
                                <Input
                                  value={this.state.descAssetsOff4}
                                  name="descAssetsOff4"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="exampleCustomFileBrowser">
                                  Assets
                                </Label>
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="profilePicture"
                                  onChange={(e) =>
                                    this.setState({
                                      fileAssetsOff4: e.target.files[0],
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <></>
                      )}
                      {this.state.assetsOff5 ? (
                        <Col form>
                          <div className="d-flex justify-content-between">
                            <h5>Assets 5</h5>
                            <button
                              className="btn btn-danger my-2 my-sm-0 align-items-center justify-content-center"
                              type="button"
                              onClick={() =>
                                this.setState({ assetsOff5: false })
                              }
                            >
                              <Remove />
                            </button>
                          </div>
                          <Row form>
                            <Col xs={12} sm={12} md={2}>
                              <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input
                                  value={this.state.titleAssetsOff5}
                                  name="titleAssetsOff5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Description</Label>
                                <Input
                                  value={this.state.descAssetsOff5}
                                  name="descAssetsOff5"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="exampleCustomFileBrowser">
                                  Assets
                                </Label>
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="fileAssetsOff5"
                                  onChange={(e) =>
                                    this.setState({
                                      fileAssetsOff5: e.target.files[0],
                                    })
                                  }
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
              <GridItem xs={12} sm={12} md={2}>
                <Card>
                  <CardBody>
                    <Button>
                      <Link
                        to="/admin/user/EditPersonal"
                        style={{ color: '#ffffff' }}
                      >
                        Personal
                      </Link>
                    </Button>
                    <Button>
                      <Link
                        to="/admin/user/EditBackground"
                        style={{ color: '#b71c1c' }}
                      >
                        Background
                      </Link>
                    </Button>
                    <Button>
                      <Link
                        to="/admin/user/EditAssets"
                        style={{ color: '#ffffff' }}
                      >
                        Assets
                      </Link>
                    </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEditBackground)
