/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
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
import avatar from '../../assets/img/faces/marc.jpg'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
// import CustomInput from '../../components/CustomInput/CustomInput'
import Button from '../../components/CustomButtons/Button'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardAvatar from '../../components/Card/CardAvatar'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

export default class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      passcode: '',
      birthDate: '',
      address: '',
      role: 2,
      department: 1,
      showUpdateModal: false,
      showDeleteModal: false,
    }
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
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

  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="danger">
                <h4 className="cardTitleWhite">Edit Profile</h4>
                <p className="cardCategoryWhite">Complete your profile</p>
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
                        ></Input>
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
                            label="Office Hours"
                            value={1}
                            onChange={(e) => this.handleChange(e)}
                            inline
                          />
                          <CustomInput
                            type="radio"
                            id="exampleCustomRadio"
                            name="timeType"
                            label="Free Hours"
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
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h2 className="cardTitle">Samantha</h2>
                <h6 className="cardCategory">Development</h6>
                <div>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Email />
                      </ListItemIcon>
                      <ListItemText>Email</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText>Phone</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Today />
                      </ListItemIcon>
                      <ListItemText>Joined Date</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Cake />
                      </ListItemIcon>
                      <ListItemText>Birth Date</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Timer />
                      </ListItemIcon>
                      <ListItemText>Time Type</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Home />
                      </ListItemIcon>
                      <ListItemText>Address</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccountTree />
                      </ListItemIcon>
                      <ListItemText>Role</ListItemText>
                    </ListItem>
                  </List>
                </div>
              </CardBody>
            </Card>
            <CardFooter>
              <Button onClick={this.toggleDeleteModal} color="danger">
                Delete Samantha
              </Button>
            </CardFooter>
          </GridItem>
        </GridContainer>
        {/* Update Modal */}
        <Modal isOpen={this.state.showUpdateModal}>
          <ModalBody className="h4">Update Profile Samanta ?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleUpdateModal(0)}>
              Submit
            </Button>
            <Button color="danger" onClick={() => this.toggleUpdateModal(0)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Delete Modal */}
        <Modal isOpen={this.state.showDeleteModal}>
          <ModalBody className="h4">
            Are you sure to Delete Samantha ?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleDeleteModal(0)}>
              Delete
            </Button>
            <Button color="danger" onClick={() => this.toggleDeleteModal(0)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
