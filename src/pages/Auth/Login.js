/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Row, Col, Image } from 'react-bootstrap'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import swal from 'sweetalert2'
import { loginAuth, noLogin } from '../../redux/actions/login'

import img from './assets/bg.png'
import logo from './assets/logo.png'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '12345678',
      passcode: '123456',
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
      platform: '2',
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
      .catch((res) => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: `${res.response.data.message}`,
        })
      })
  }

  componentDidMount() {
    if (this.props.login.isLogin) {
      this.props.history.push('/admin/dashboard')
    }
  }

  render() {
    return (
      <Row className="landing no-gutters">
        <Col md={7}>
          <Image src={img} fluid></Image>{' '}
        </Col>
        <Col md={5}>
          <div className="p-3">
            <div className="d-flex justify-content-start">
              <img className="m-5" src={logo} alt="Logo" />
            </div>
            <h1 className="m-5 pt-5">
              <b>Login to Dashboard</b>
            </h1>
            <Form
              className="mt-3 ml-5"
              style={{ width: '80%' }}
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
              <Button
                type="submit"
                style={{
                  backgroundColor: '#b71c1c',
                  color: 'white',
                  borderRadius: 20,
                  width: 100,
                  marginTop: 30,
                  marginBottom: 100,
                }}
              >
                <b>Login</b>
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
})
const mapDispatchToProps = { loginAuth, noLogin }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
