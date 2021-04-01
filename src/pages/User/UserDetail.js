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
    }
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fetchProfile = this.fetchProfile.bind(this)
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
        this.setState({ isLoadingFetch: false })
        this.props
          .getDepartment(res.action.payload.data.newToken)
          .then((res) => {
            this.props.newToken(res.action.payload.data.newToken)
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
                    {/* <CardFooter>
                      <Button onClick={this.toggleDeleteModal} color="danger">
                        Delete {this.props.user.dataProfile[0].name}
                      </Button>
                    </CardFooter> */}
                  </GridItem>
                </GridContainer>
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
})
const mapDispatchToProps = {
  getProfile,
  getDepartment,
  deleteUser,
  sendNotif,
  updateUser,
  newToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
