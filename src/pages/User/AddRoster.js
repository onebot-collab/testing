/* eslint-disable lines-between-class-members */
import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap'
// import { Sort } from '@material-ui/icons'

class AddRoster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <Form>
        <Row form>
          <Col xs={12} sm={12} md={8}>
            <FormGroup>
              <Input
                value={this.state.name}
                name="name"
                onChange={(e) => this.handleChange(e)}
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={12} md={4}>
            <button
              className="btn btn-danger"
              type="submit"
              //   onClick={this.toggleFilterModal}
            >
              Save
            </button>
          </Col>
        </Row>
        <Row form className="mb-3">
          <Col xs={12} sm={12} md={2} className="m-1">
            <Form>
              <Input
                value={this.state.name}
                onChange={this.handleChange}
                type="date"
                name="date"
                id="exampleDate"
                placeholder="date placeholder"
              />
            </Form>
          </Col>
          <Col xs={12} sm={12} md={1} className="m-1">
            <Form>
              <Input
                value={this.state.name}
                onChange={this.handleChange}
                type="time"
                name="time"
                id="exampleDate"
                placeholder="date placeholder"
              />
            </Form>
          </Col>
          <Col xs={12} sm={12} md={1}><div className="d-flex align-items-center justify-content-center mt-2">to</div></Col>
          <Col xs={12} sm={12} md={2} className="m-1">
            <Form>
              <Input
                value={this.state.name}
                onChange={this.handleChange}
                type="date"
                name="date"
                id="exampleDate"
                placeholder="date placeholder"
              />
            </Form>
          </Col>
          <Col xs={12} sm={12} md={1} className="m-1">
            <Form>
              <Input
                value={this.state.name}
                onChange={this.handleChange}
                type="time"
                name="time"
                id="exampleDate"
                placeholder="date placeholder"
              />
            </Form>
          </Col>
        </Row>
        <Row form className="mb-3">
          <Col xs={12} sm={12} md={3}>
            <Form>
              <Label for="exampleSelect">Check In</Label>
              <Input
                value={this.state.name}
                onChange={this.handleChange}
                type="time"
                name="time"
                id="exampleDate"
                placeholder="date placeholder"
              />
            </Form>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <Form>
              <Label for="exampleSelect">Check Out</Label>
              <Input
                value={this.state.name}
                onChange={this.handleChange}
                type="time"
                name="time"
                id="exampleDate"
                placeholder="date placeholder"
              />
            </Form>
          </Col>
          <Col xs={12} sm={12} md={1}>
              <div className="d-flex align-items-center ml-4">
              <Input type="checkbox" name="check" id="exampleCheck" />Overtime
              </div>
              
          </Col>
        </Row>
        <Row form className="mb-3">
          <Col xs={12} sm={12} md={3}>
            <Form>
              <Label for="exampleSelect">Early Check In</Label>
              <Input
                value={this.state.name}
                onChange={this.handleChange}
                type="time"
                name="time"
                id="exampleDate"
                placeholder="date placeholder"
              />
            </Form>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <Form>
              <Label for="exampleSelect">Late Check Out</Label>
              <Input
                value={this.state.name}
                onChange={this.handleChange}
                type="time"
                name="time"
                id="exampleDate"
                placeholder="date placeholder"
              />
            </Form>
          </Col>
        </Row>
        {/* <Row form className="mb-3">
          <Col xs={12} sm={12} md={2}>
            <Form>
              <Input
                value={this.state.name}
                type="select"
                name="role"
                id="exampleSelect"
                onChange={this.handleChange}
              >
                <option key={1} value={1}>
                  Doesnt repeat
                </option>
                <option key={2} value={2}>
                  Custom
                </option>
              </Input>
            </Form>
          </Col>
          <Col xs={12} sm={12} md={1} className="d-flex ml-4">
            <div className="d-flex align-items-center">
              <Input type="checkbox" name="check" id="exampleCheck" />
              <div>All day</div>
            </div>
          </Col>
        </Row> */}
        {/* <Row form className="mt-5">
          <div>Repeat every</div>
        </Row>
        <Row form className="mb-3">
          <Col xs={12} sm={12} md={1}>
            <Form>
              <Input
                value={this.state.name}
                type="select"
                name="role"
                id="exampleSelect"
                onChange={this.handleChange}
              >
                <option key={1} value={1}>
                  1
                </option>
                <option key={2} value={2}>
                  2
                </option>
                <option key={3} value={3}>
                  3
                </option>
                <option key={4} value={4}>
                  4
                </option>
                <option key={5} value={5}>
                  5
                </option>
                <option key={6} value={6}>
                  6
                </option>
              </Input>
            </Form>
          </Col>
          <Col xs={12} sm={12} md={1}>
            <Form>
              <Input
                value={this.state.name}
                type="select"
                name="role"
                id="exampleSelect"
                onChange={this.handleChange}
              >
                <option key={1} value={1}>
                  day
                </option>
                <option key={2} value={2}>
                  week
                </option>
                <option key={3} value={3}>
                  month
                </option>
                <option key={4} value={4}>
                  year
                </option>
              </Input>
            </Form>
          </Col>
        </Row> */}
        <Row form className="mt-5">
          <div>Repeat on</div>
        </Row>
        <Row form className="mb-3">
          <Col xs={12} sm={12} md={1} className="d-flex ml-4">
            <div className="d-flex align-items-center">
              <Input type="checkbox" name="check" id="exampleCheck" />
              <div>Sunday</div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={1} className="d-flex ml-4">
            <div className="d-flex align-items-center">
              <Input type="checkbox" name="check" id="exampleCheck" />
              <div>Monday</div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={1} className="d-flex ml-4">
            <div className="d-flex align-items-center">
              <Input type="checkbox" name="check" id="exampleCheck" />
              <div>Tuesday</div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={1} className="d-flex ml-4">
            <div className="d-flex align-items-center">
              <Input type="checkbox" name="check" id="exampleCheck" />
              <div>Wednesday</div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={1} className="d-flex ml-4">
            <div className="d-flex align-items-center">
              <Input type="checkbox" name="check" id="exampleCheck" />
              <div>Thursday</div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={1} className="d-flex ml-4">
            <div className="d-flex align-items-center">
              <Input type="checkbox" name="check" id="exampleCheck" />
              <div>Friday</div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={1} className="d-flex ml-4">
            <div className="d-flex align-items-center">
              <Input type="checkbox" name="check" id="exampleCheck" />
              <div>Saturday</div>
            </div>
          </Col>
        </Row>
        {/* <Row form className="mt-5">
          <div>Ends</div>
        </Row>
        <Row form>
          <FormGroup tag="fieldset" col>
              <FormGroup check>
                  <Input type="radio" name="radio2" /> Never
              </FormGroup>
              <FormGroup check>
                  <Input type="radio" name="radio2" /> On <Input type="date" name="radio2" />
              </FormGroup>
              <FormGroup check>
                  <Input type="radio" name="radio2" /> After <Input name="radio2" placeholder="occurences"/>
              </FormGroup>
          </FormGroup>
        </Row> */}
      </Form>
    )
  }
}
export default AddRoster
