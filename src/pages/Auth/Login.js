/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Row, Col, Button, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import swal from 'sweetalert2'
import { loginAuth, logoutAuth } from '../../redux/actions/login'

import img from './assets/bg.jpg'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passcode: '',
    }
    this.handlerChange = this.handlerChange.bind(this)
    this.login = this.login.bind(this)
  }

  handlerChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  login(event) {
    event.preventDefault()
    const { email, password, passcode } = this.state
    const dataSubmit = {
      email,
      password,
      passcode,
    }

    this.props
      .loginAuth(dataSubmit)
      .then(() => {
        this.props.history.push('/admin/dashboard')
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Welcome',
        })
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: "Data doesn't match our records",
        })
      })
  }

  componentDidMount() {
    this.props.logoutAuth()
  }

  render() {
    return (
      <div className="App">
        <Row className="landing">
          <Col>
            <div>
              <br />
              <br />
              <br />
              <Form
                style={{ width: '80%', marginLeft: '10%', marginTop: '10%' }}
                onSubmit={this.login}
              >
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="name@mail.com"
                    onChange={this.handlerChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="******"
                    onChange={this.handlerChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Passcode</Form.Label>
                  <Form.Control
                    name="passcode"
                    type="password"
                    placeholder="******"
                    onChange={this.handlerChange}
                  />
                </Form.Group>
                <Button type="submit"> Login</Button>
              </Form>
            </div>
          </Col>
          <Col>
            <Image src={img} fluid></Image>{' '}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
})
const mapDispatchToProps = { loginAuth, logoutAuth }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
