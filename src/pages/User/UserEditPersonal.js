/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable radix */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import './Actual.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
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
import { Edit } from '@material-ui/icons'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardAvatar from '../../components/Card/CardAvatar'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

// import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class UserEditPersonal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: '',
      id: this.props.user.dataFormEditPersonal.id,
      firstName: this.props.user.dataFormEditPersonal.firstName,
      name: this.props.user.dataFormEditPersonal.name,
      lastName: this.props.user.dataFormEditPersonal.lastName,
      emailPrivate: this.props.user.dataFormEditPersonal.emailPrivate,
      phone: this.props.user.dataFormEditPersonal.phone,
      phone2: this.props.user.dataFormEditPersonal.phone2,
      birthplace: this.props.user.dataFormEditPersonal.birthplace,
      birthdate: this.props.user.dataFormEditPersonal.birthdate,
      maritalStatus: this.props.user.dataFormEditPersonal.maritalStatus,
      religion: this.props.user.dataFormEditPersonal.religion,
      bloodType: this.props.user.dataFormEditPersonal.bloodType,
      gender: '',
      address: this.props.user.dataFormEditPersonal.address,
    }
    this.handleChange = this.handleChange.bind(this)
    this.redirect = this.redirect.bind(this)
    // this.nextPage = this.nextPage.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  redirect() {
    this.props.history.push('/login')
  }

  componentDidMount() {
    console.log(this.props.user.dataFormEditPersonal)
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
                  <CardAvatar profile>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                      alt="img"
                    />
                  </CardAvatar>
                  <Link
                    onClick={() => {
                      alert('Open file')
                    }}
                    className="d-flex justify-content-center align-items-center btn-danger"
                    style={{
                      width: 40,
                      height: 40,
                      marginTop: -50,
                      marginLeft: 100,
                      borderRadius: 20,
                      backgroundColor: '#b71c1c',
                      alignSelf: 'center',
                    }}
                  >
                    <Edit />
                  </Link>
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
                              value={this.state.name}
                              name="name"
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
                              value={this.state.emailPrivate}
                              name="emailPrivate"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                          <FormGroup>
                            <Label for="exampleEmail">Phone 1</Label>
                            <Input
                              value={this.state.phone}
                              name="phone"
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
                              value={this.state.birthplace}
                              name="birthplace"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs={12} sm={12} md={2}>
                          <FormGroup>
                            <Label for="exampleEmail">Date of Birth</Label>
                            <Input
                              value={this.state.birthdate}
                              type="date"
                              name="birthdate"
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
                              value={this.state.form}
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
                              value={this.state.form}
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
                              value={this.state.form}
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
                              value={this.state.form}
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
                              value={this.state.form}
                              name="zipCode"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        alert('Save')
                      }}
                      color="secondary"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => {
                        alert('Cancel')
                      }}
                      color="primary"
                    >
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <Card>
                  <CardBody>
                    <Button>
                      <Link
                        to="/admin/user/EditPersonal"
                        style={{ color: '#b71c1c' }}
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
  user: state.user,
  login: state.login,
})

export default connect(mapStateToProps)(UserEditPersonal)
