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

class UserEditAssets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleAssets1: '',
      titleAssets2: '',
      titleAssets3: '',
      titleAssets4: '',
      titleAssets5: '',
      descAssets1: '',
      descAssets2: '',
      descAssets3: '',
      descAssets4: '',
      descAssets5: '',
      fileAssets1: '',
      fileAssets2: '',
      fileAssets3: '',
      fileAssets4: '',
      fileAssets5: '',
      assets2: false,
      assets3: false,
      assets4: false,
      assets5: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.addEducation = this.addEducation.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  nextPage() {
    const dataSubmit = {
      titleAssets1: this.state.titleAssets1,
      titleAssets2: this.state.titleAssets2,
      titleAssets3: this.state.titleAssets3,
      titleAssets4: this.state.titleAssets4,
      titleAssets5: this.state.titleAssets5,
      descAssets1: this.state.descAssets1,
      descAssets2: this.state.descAssets2,
      descAssets3: this.state.descAssets3,
      descAssets4: this.state.descAssets4,
      descAssets5: this.state.descAssets5,
      fileAssets1: this.state.fileAssets1,
      fileAssets2: this.state.fileAssets2,
      fileAssets3: this.state.fileAssets3,
      fileAssets4: this.state.fileAssets4,
      fileAssets5: this.state.fileAssets5,
    }

    this.props.formTwo(dataSubmit)
    setTimeout(() => {
      this.props.history.push('/admin/user/stepThree')
    }, 100)
  }

  addEducation() {
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

  componentDidMount() {}

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
                          <h5>Assets on Hand</h5>
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
                                //   onChange={(e) =>
                                //     this.setState({
                                //       profilePicture: e.target.files[0],
                                //     })
                                //   }
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
                                  //   onChange={(e) =>
                                  //     this.setState({
                                  //       profilePicture: e.target.files[0],
                                  //     })
                                  //   }
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
                                  //   onChange={(e) =>
                                  //     this.setState({
                                  //       profilePicture: e.target.files[0],
                                  //     })
                                  //   }
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
                                  //   onChange={(e) =>
                                  //     this.setState({
                                  //       profilePicture: e.target.files[0],
                                  //     })
                                  //   }
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
                                  //   onChange={(e) =>
                                  //     this.setState({
                                  //       profilePicture: e.target.files[0],
                                  //     })
                                  //   }
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
                        style={{ color: '#ffffff' }}
                      >
                        Background
                      </Link>
                    </Button>
                    <Button>
                      <Link
                        to="/admin/user/EditAssets"
                        style={{ color: '#b71c1c' }}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEditAssets)
