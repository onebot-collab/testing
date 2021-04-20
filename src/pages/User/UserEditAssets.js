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
    this.addAsset = this.addAsset.bind(this)
    this.addAssetOff = this.addAssetOff.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
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
