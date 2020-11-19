/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import './CalendarDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
// import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
// import { Link } from 'react-router-dom'
import Select from 'react-select'
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from 'reactstrap'
// @material-ui/icons
import Edit from '@material-ui/icons/Edit'
// import CheckCircle from '@material-ui/icons/CheckCircle'
// import Cancel from '@material-ui/icons/Cancel'

// import Check from '@material-ui/icons/Check'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
// import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
// import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

export default class CalendarDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditModal: false,
    }
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  toggleEditModal() {
    this.setState({
      showEditModal: !this.state.showEditModal,
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {}

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)
    // const classesHead = makeStyles(stylesHead)
    // const classesBody = makeStyles(stylesBody)
    return (
      <div>
        <Button
          onClick={this.toggleEditModal}
          variant="contained"
          color="primary"
          // className="buttonAdd"
          startIcon={<Edit />}
        >
          Edit
        </Button>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Calendar Detail</h4>
                {/* <p className={classes.cardCategoryWhite}>
                  {this.props.location.state.date}
                </p> */}
              </CardHeader>
              <CardBody>
                <div className="column">
                  <div className="col-12 col-md-12 col-xl-12">
                    <dl className="row">
                      <dt className="col-sm-2"> Type</dt>
                      <dd className="col-sm-10">
                        {this.props.location.state.type_reminder === 'null'
                          ? 'Event'
                          : this.props.location.state.type_reminder}
                      </dd>
                    </dl>
                  </div>
                  <div className="col-12 col-md-12 col-xl-12">
                    <dl className="row">
                      <dt className="col-sm-2"> Title</dt>
                      <dd className="col-sm-10">
                        {' '}
                        {this.props.location.state.title}
                      </dd>
                    </dl>
                  </div>
                  <div className="col-12 col-md-12 col-xl-12">
                    <dl className="row">
                      <dt className="col-sm-2"> Date</dt>
                      <dd className="col-sm-10">
                        {' '}
                        {this.props.location.state.date}
                      </dd>
                    </dl>
                  </div>
                </div>
                {/* <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <ListItem className="listItemWidth">
                      <ListItemText>
                        <Typography variant="subtitle1">
                          {this.props.location.state.type_reminder === 'null'
                            ? 'Event'
                            : this.props.location.state.type_reminder}
                        </Typography>
                      </ListItemText>
                    </ListItem>

                    <Typography variant="body2" className="paperGridCentre">
                      <p className="textPrimaryColor">
                        {this.props.location.state.title}
                      </p>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Paper elevation={2} className="d-flex flex-row p-3">
                      <ListItem>
                        <ListItemIcon>
                          <Attachment edge="start" />
                        </ListItemIcon>
                        <ListItemText>file.pdf</ListItemText>
                        <ListItemIcon>
                          <Cancel edge="end" className="CancelColor" />
                          <CheckCircle
                            edge="end"
                            className="CheckCircleColor"
                          />
                        </ListItemIcon>
                      </ListItem>
                    </Paper>
                  </Grid>
                   <Grid item xs>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className="ButtonApprove mb-3"
                      onClick={() => {
                        alert('Approved')
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      className="ButtonRejected mb-3"
                      onClick={() => {
                        alert('Rejected')
                      }}
                    >
                      Reject
                    </Button>
                  </Grid>
                </Grid> */}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {/* Edit Modal */}
        <Modal isOpen={this.state.showEditModal}>
          <ModalHeader className="h1">Edit Event</ModalHeader>
          <Form>
            <ModalBody>
              <h6>Title</h6>
              <Input
                type="text"
                name="title"
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Description</h6>
              <Input
                type="textarea"
                name="description"
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Date</h6>
              <Input
                value={this.state.birthDate}
                type="date"
                name="dateAdd"
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Type</h6>
              <Select />
            </ModalBody>
            <ModalFooter>
              {this.state.isLoadingAddReminder ? (
                <Button color="primary">
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
                    alert('Edit Alert')
                  }}
                >
                  Submit
                </Button>
              )}
              <Button color="secondary" onClick={this.toggleEditModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}
