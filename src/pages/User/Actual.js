/* eslint-disable no-useless-escape */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert2'
import './Actual.css'
// @material-ui/core components
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
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
// @material-ui/icons components
import Visibility from '@material-ui/icons/Visibility'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Button from '../../components/CustomButtons/Button'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

import { getUser, registerUser } from '../../redux/actions/user'
import { getDepartment } from '../../redux/actions/department'
import { sendNotif } from '../../redux/actions/fcm'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      passcode: '',
      joinedDate: '',
      birthDate: '',
      address: '',
      role: 2,
      department: 1,
      timeType: 1,
      profilePicture: null,
      isLoadingUser: false,
      isLoadingRegister: false,
      search: '',
      page: 1,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.register = this.register.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      this.fetch()
    }, 100);
  }

  nextPage() {
    if (this.state.page < this.props.user.infoUser.totalPage) {
      this.setState({ page: this.state.page + 1 })
      setTimeout(() => {
        this.fetch()
      }, 100);
    }
  }

  prevPage() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
      setTimeout(() => {
        this.fetch()
      }, 100);
    }
  }

  fetch() {
    this.setState({ isLoadingUser: true })
    this.props.getUser(this.props.login.token, this.state.search, this.state.page).then(() => {
      this.setState({ isLoadingUser: false })
    })
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
    this.setState({ isLoadingRegister: true })
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
    const dataSubmit = new FormData()

    dataSubmit.append('name', this.state.name)
    dataSubmit.append('email', this.state.email)
    dataSubmit.append('phone', this.state.phone)
    dataSubmit.append('password', this.state.password)
    dataSubmit.append('passcode', this.state.passcode)
    dataSubmit.append('address', this.state.address)
    dataSubmit.append('joineddate', joinedDate)
    dataSubmit.append('birthdate', birthDate)
    dataSubmit.append('time_type', this.state.timeType)
    dataSubmit.append('role', this.state.role)
    dataSubmit.append('department', this.state.department)
    dataSubmit.append('photo', this.state.profilePicture)

    this.props
      .registerUser(dataSubmit, this.props.login.token)
      .then(() => {
        this.setState({
          isLoadingRegister: false,
          name: '',
          email: '',
          phone: '',
          password: '',
          passcode: '',
          joinedDate: '',
          birthDate: '',
          address: '',
          role: 2,
          department: 1,
          timeType: 1,
          profilePicture: null,
        })
        this.fetch()
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User successsfully registered',
        })
        // this.pressed()
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Data already used',
        })
        this.setState({ isLoadingRegister: false })
      })
  }

  componentDidMount() {
    this.fetch()
    this.props.getDepartment(this.props.login.token)
  }

  render() {
    const departmentData = this.props.department.dataDepartment
    const departmentList = departmentData.map((val) => (
      <option key={val.id} value={val.id}>
        {val.name}
      </option>
    ))

    return (
      <div>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <nav className="navbar navbar-light bg-light d-flex justify-content-end">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  name="search"
                  onChange={this.handleSearch}
                  placeholder="Type Something ..."
                  aria-label="Search"
                ></input>
                <button
                  className="btn btn-outline-danger my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </nav>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className="cardTitleWhite">Add User</h4>
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
                            <div>
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
                              onChange={(e) =>
                                this.setState({
                                  profilePicture: e.target.files[0],
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                    {/* <GridContainer className="fieldGridContainer">
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Email"
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Phone"
                          type="phone"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          label="Password"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          label="Passcode"
                          type="password"
                          name="passcode"
                          value={this.state.passcode}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Role"
                          name="role"
                          value={this.state.role}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                          select
                        >
                          <MenuItem key={1} value={1}>
                            Admin
                          </MenuItem>
                          <MenuItem key={2} value={2}>
                            User
                          </MenuItem>
                        </TextField>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Department"
                          name="department"
                          value={this.state.department}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                          select
                        >
                          <MenuItem key={1} value={1}>
                            General
                          </MenuItem>
                          <MenuItem key={2} value={2}>
                            Development
                          </MenuItem>
                        </TextField>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Time type"
                          name="timeType"
                          value={this.state.timeType}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                          select
                        >
                          <MenuItem key={1} value={1}>
                            Office hours
                          </MenuItem>
                          <MenuItem key={2} value={2}>
                            Free hours
                          </MenuItem>
                        </TextField>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Joined date"
                          type="date"
                          name="joinedDate"
                          value={this.state.joinedDate}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Birth date"
                          type="date"
                          name="birthDate"
                          value={this.state.birthDate}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Address"
                          name="address"
                          value={this.state.address}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <input
                          type="file"
                          name="image"
                          className="textFieldWidth"
                          onChange={(e) =>
                            this.setState({ profilePicture: e.target.files[0] })
                          }
                        />
                      </GridItem>
                    </GridContainer> */}
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
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  {this.state.isLoadingUser ? (
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
                      <CardHeader color="danger">
                        <h4 className="cardTitleWhite">List User</h4>
                      </CardHeader>
                      <CardBody>
                        <Grid item xs={12} sm={12} md={12}>
                          <List className="listContactRow">
                            {this.props.user.dataUser.map((res, i) => (
                              <ListItem button key={i}>
                                <ListItemAvatar>
                                  <Avatar
                                    src={`http://localhost:21212/${res.photo_url}`}
                                  />
                                </ListItemAvatar>
                                <ListItemText>{res.name}</ListItemText>
                                <ListItemSecondaryAction>
                                  {/* <Visibility edge="end" /> */}
                                  <Link
                                    to={{
                                      pathname: `/admin/user/${res.id}`,
                                      state: {
                                        id: `${res.id}`,
                                        name: `${res.name}`,
                                        email: `${res.email}`,
                                        phone: `${res.phone}`,
                                        photo_url: `${res.photo_url}`,
                                        birthdate: `${res.birthdate}`,
                                        joined_date: `${res.joined_date}`,
                                        role: `${res.role}`,
                                        address: `${res.address}`,
                                        department_id: `${res.department_id}`,
                                        departmentName: `${res.departmentName}`,
                                        typeTime: `${res.typeTime}`,
                                        total_leave: `${res.total_leave}`,
                                      },
                                    }}
                                  >
                                    <Tooltip
                                      id="tooltip-top-start"
                                      title="Click to Detail"
                                      placement="top"
                                    >
                                      <Visibility
                                        className="iconWhiteColor"
                                        edge="end"
                                      />
                                    </Tooltip>
                                  </Link>
                                </ListItemSecondaryAction>
                              </ListItem>
                            ))}
                          </List>
                          <div className="d-flex flex-row justify-content-end">
                            {this.state.isLoadingUser ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            ):(
                              <div className="p-2 d-flex align-items-center align-self-center">
                                <h6>
                                  15 of {this.props.user.infoUser.totalData}
                                </h6>
                              </div>
                            )}
                            <div className="p-2">
                              <IconButton onClick={this.prevPage}>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div>
                              <p>{this.state.page}</p>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={this.nextPage}>
                                <ArrowRight
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                          </div>
                        </Grid>
                      </CardBody>
                    </>
                  )}
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
const mapDispatchToProps = { getUser, registerUser, getDepartment, sendNotif }

export default connect(mapStateToProps, mapDispatchToProps)(User)
