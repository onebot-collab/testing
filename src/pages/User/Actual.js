/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Actual.css'
// @material-ui/core components
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import TablePagination from '@material-ui/core/TablePagination'
// @material-ui/icons components
import Visibility from '@material-ui/icons/Visibility'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Button from '../../components/CustomButtons/Button'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

import { getUser, registerUser } from '../../redux/actions/user'

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
      role: '',
      department: '',
      timeType: '',
      profilePicture: null,
      isLoadingUser: true,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log('vvvvvvvvvvvvv', this.state.profilePicture)
  }

  fetch() {
    this.props.getUser().then(() => {
      this.setState({ isLoadingUser: false })
    })
  }

  redirect() {
    this.props.history.push('/login')
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    return (
      <div>
        {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className="cardTitleWhite">Add User</h4>
                    <p className="cardCategoryWhite">by Admin</p>
                  </CardHeader>
                  <CardBody>
                    <GridContainer className="fieldGridContainer">
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
                        <TextField
                          label="Profile Picture"
                          type="file"
                          name="profilePicture"
                          value={this.state.profilePicture}
                          onChange={this.handleChange}
                          className="textFieldWidth"
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="danger">Submit</Button>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card profile>
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
                        <p className="cardCategoryWhite">
                          {this.props.user.dataUser.length}
                        </p>
                      </CardHeader>
                      <CardBody>
                        <Grid item xs={12} sm={12} md={12}>
                          <List className="listContactRow">
                            {this.props.user.dataUser.map((res, i) => (
                              <ListItem button key={i}>
                                <ListItemAvatar>
                                  <Avatar
                                    src={`http://10.5.1.38:5000/${res.photo_url}`}
                                  />
                                </ListItemAvatar>
                                <ListItemText>{res.name}</ListItemText>
                                <ListItemSecondaryAction>
                                  <Visibility edge="end" />
                                </ListItemSecondaryAction>
                              </ListItem>
                            ))}
                          </List>
                          <TablePagination
                            component="div"
                            count={100}
                            rowsPerPageOptions={5}
                          />
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
})
const mapDispatchToProps = { getUser, registerUser }

export default connect(mapStateToProps, mapDispatchToProps)(User)
