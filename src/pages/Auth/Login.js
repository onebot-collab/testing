import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button, Image } from 'react-bootstrap'

import img from './assets/bg.jpg'

export default class LoginPage extends Component {
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
              >
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="email" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="password" />
                </Form.Group>
                <Link className="nav-link-aditional" to="/dashboard">
                  <Button type="submit"> Submit</Button>
                </Link>
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
