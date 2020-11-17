/* eslint-disable camelcase */
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
import { getProfile, deleteUser } from '../../redux/actions/user'
import { getDepartment } from '../../redux/actions/department'
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
      name: ``,
      email: ``,
      phone: ``,
      password: '',
      passcode: '',
      birthDate: ``,
      address: ``,
      role: ``,
      department: ``,
      showUpdateModal: false,
      showDeleteModal: false,
      isLoadingFetch: true,
      isLoadingDelete: false,
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
    this.props.getProfile(this.props.location.state.id).then(() => {
      this.setState({ isLoadingFetch: false })
    })
  }

  delete() {
    this.setState({ isLoadingDelete: true })
    const id = `${this.props.location.state.id}`
    this.props
      .deleteUser(id)
      .then(() => {
        this.setState({ isLoadingDelete: false })
        this.props.history.push('/admin/user')
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User successsfully deleted',
        })
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
    this.props.getDepartment()
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
        {!this.props.login.token ? (
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
                                  value={this.state.name}
                                  name="name"
                                  placeholder={`${this.props.user.dataProfile[0].name}`}
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input
                                  value={this.state.email}
                                  name="email"
                                  placeholder={`${this.props.user.dataProfile[0].email}`}
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleEmail">Phone</Label>
                                <Input
                                  value={this.state.phone}
                                  name="phone"
                                  placeholder={`${this.props.user.dataProfile[0].phone}`}
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
                                  value={this.state.password}
                                  type="password"
                                  name="password"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                              <FormGroup>
                                <Label for="examplePassword">Passcode</Label>
                                <Input
                                  value={this.state.passcode}
                                  type="password"
                                  name="passcode"
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
                            <Col xs={12} sm={12} md={4}>
                              <FormGroup>
                                <Label for="exampleSelect">Department</Label>
                                <Input
                                  value={this.state.department}
                                  type="select"
                                  name="department"
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
                                    name="timeType"
                                    label="Free Hours"
                                    value={1}
                                    onChange={(e) => this.handleChange(e)}
                                    inline
                                  />
                                  <CustomInput
                                    type="radio"
                                    id="exampleCustomRadio"
                                    name="timeType"
                                    label="Office Hours"
                                    value={3}
                                    onChange={(e) => this.handleChange(e)}
                                    inline
                                  />
                                  <CustomInput
                                    type="radio"
                                    id="exampleCustomRadio3"
                                    name="timeType"
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
                                <Label for="exampleDate">Birth Date</Label>
                                <Input
                                  value={this.state.birthDate}
                                  type="date"
                                  name="birthDate"
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
                                  value={this.state.address}
                                  name="address"
                                  placeholder={`${this.props.user.dataProfile[0].address}`}
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
                          href={`http://10.5.1.38:5000/${this.props.user.dataProfile[0].photo_url}`}
                        >
                          <img
                            src={`http://10.5.1.38:5000/${this.props.user.dataProfile[0].photo_url}`}
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
                    <Button
                      color="secondary"
                      onClick={() => this.toggleUpdateModal(0)}
                    >
                      Submit
                    </Button>
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
const mapDispatchToProps = { getProfile, getDepartment, deleteUser }

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
