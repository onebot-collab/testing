/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Rate from 'rc-rate'
import 'rc-rate/assets/index.css'
// import { connect } from 'react-redux'
import './TicketingDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import Print from '@material-ui/icons/Print'

import moment from 'moment'
import { Link } from 'react-router-dom'

// import Check from '@material-ui/icons/Check'
// core components
import { connect } from 'react-redux'
import { getTicketScore, exportDetailTicket } from '../../redux/actions/ticket'
import { newToken } from '../../redux/actions/login'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
// import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class TicketingDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // date: props.location.state.date,
      id: props.location.state.id,
      assignId: props.location.state.assignId,
      no_ticket: props.location.state.no_ticket,
      title: props.location.state.title,
      nameFrom: props.location.state.nameFrom,
      nameAssign: props.location.state.nameAssign,
      nameObserve: props.location.state.nameObserve,
      start_date: props.location.state.start_date,
      end_date: props.location.state.end_date,
      description: props.location.state.description,
      statusid: props.location.state.statusid,
      isLoading: false,
      isLoadingExportDetailTicket: false,
    }
    this.export = this.export.bind(this)
  }

  fetchScore() {
    this.setState({ isLoading: true })
    this.props
      .getTicketScore(
        this.state.id,
        this.state.assignId,
        this.props.login.token,
      )
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        this.setState({ isLoading: false })
      })
  }

  export() {
    this.setState({ isLoadingExportDetailTicket: true })
    this.props
      .exportDetailTicket(this.props.login.token, this.props.location.state.id)
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.action.payload.data]),
        )
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          `Report-Ticket-${
            this.props.location.state.no_ticket
          }_${moment().format('DD-MM-YY')}.pdf`,
        )
        document.body.appendChild(link)
        link.click()
        this.setState({ isLoadingExportDetailTicket: false })
      })
  }

  componentDidMount() {
    this.fetchScore()
  }

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)
    // const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    return (
      <div>
        <nav className="navbar navbar-light bg-light d-flex justify-content-end">
          <div className="d-flex flex-row">
            <button
              className="btn btn-danger my-2 my-sm-0"
              type="submit"
              onClick={this.export}
            >
              <Tooltip
                id="tooltip-top-start"
                title="Export to PDF"
                placement="top"
                classes={{
                  tooltip: classesBody.tooltip,
                }}
              >
                {this.state.isLoadingExportDetailTicket ? (
                  <div
                    className="spinner-border spinner-border-sm text-white"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <Print className="iconWhiteColor" />
                )}
              </Tooltip>
            </button>
          </div>
        </nav>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className={classes.cardTitleWhite}>
                    {this.state.no_ticket}
                  </h4>
                  {/* <p className={classes.cardCategoryWhite}>
                    Created at {this.state.date}
                  </p> */}
                </div>
              </CardHeader>
              <CardBody>
                <div className="d-flex flex-column">
                  <div>
                    <ListItem className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-column justify-content-start">
                        {/* <h2>{this.state.no_ticket}</h2> */}
                        <h2>{this.state.title}</h2>
                      </div>
                      <div className="d-flex align-items-center">
                        {/* <h3>
                          {' '}
                          <span className="badge badge-pill badge-warning">
                            Open
                          </span>
                        </h3> */}
                        <h3>
                          {this.state.statusid === '1' ? (
                            <span className="badge badge-pill badge-warning">
                              Open
                            </span>
                          ) : this.state.statusid === '2' ? (
                            <span className="badge badge-pill badge-primary">
                              Processed
                            </span>
                          ) : this.state.statusid === '3' ? (
                            <span className="badge badge-pill badge-success">
                              Solved
                            </span>
                          ) : this.state.statusid === '4' ? (
                            <span className="badge badge-pill badge-light">
                              Closed
                            </span>
                          ) : (
                            <></>
                          )}
                        </h3>
                      </div>
                    </ListItem>
                    <div className="mt-3 mb-3 pl-4">
                      <dl className="row">
                        <dt className="col-sm-2">
                          <h6 className="textBodyBold">From</h6>
                        </dt>
                        <dd className="col-sm-10">
                          <h6>: {this.state.nameFrom}</h6>
                        </dd>
                      </dl>
                      <dl className="row">
                        <dt className="col-sm-2">
                          <h6 className="textBodyBold">Assign To</h6>
                        </dt>
                        <dd className="col-sm-10">
                          <h6>: {this.state.nameAssign}</h6>
                        </dd>
                      </dl>
                      <dl className="row">
                        <dt className="col-sm-2">
                          <h6 className="textBodyBold">Observer by</h6>
                        </dt>
                        <dd className="col-sm-10">
                          <h6>: {this.state.nameObserve}</h6>
                        </dd>
                      </dl>
                      <dl className="row">
                        <dt className="col-sm-2">
                          <h6 className="textBodyBold">
                            Start Date / End Date
                          </h6>
                        </dt>
                        <dd className="col-sm-10">
                          <h6>
                            : {`${this.state.start_date}`} /{' '}
                            {this.state.end_date}
                          </h6>
                        </dd>
                      </dl>
                      <dl className="row">
                        <dt className="col-sm-2">
                          <h6 className="textBodyBold">Description</h6>
                        </dt>
                        <dd className="col-sm-10">
                          <h6>: {this.state.description}</h6>
                        </dd>
                      </dl>
                      {/* <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <ExpandMoreIcon />
                          <Typography>Dashboard</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                          </Typography>
                        </AccordionDetails>
                      </Accordion> */}
                    </div>
                  </div>
                  {this.state.isLoading ? (
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
                      {this.props.ticket.dataTicketScore[0] === undefined ||
                      this.props.ticket.dataTicketScore === undefined ? (
                        <Grid item xs>
                          <Paper
                            elevation={2}
                            className="d-flex flex-row p-3 justify-content-center"
                          >
                            <Grid xs={12} sm={12} md={4}>
                              <h6 className="d-flex justify-content-center textBodyBoldRate">
                                {' '}
                                Rate{' '}
                              </h6>
                              <div className="d-flex justify-content-center">
                                <Rate
                                  defaultValue={0}
                                  disabled
                                  style={{ fontSize: '50px' }}
                                />
                              </div>
                            </Grid>
                            <Grid xs={12} sm={12} md={8}>
                              <h6 className="textBodyBold">Feedback </h6>
                              <Typography
                                variant="body2"
                                className="paperGridCentre"
                              >
                                <p className="textPrimaryColor">
                                  No Feedback Available
                                </p>
                              </Typography>
                            </Grid>
                          </Paper>
                        </Grid>
                      ) : (
                        <Grid item xs>
                          <Paper
                            elevation={2}
                            className="d-flex flex-row p-3 justify-content-center"
                          >
                            <Grid xs={12} sm={12} md={4}>
                              <h6 className="d-flex justify-content-center textBodyBoldRate">
                                {' '}
                                Rate{' '}
                              </h6>
                              <div className="d-flex justify-content-center">
                                <Rate
                                  defaultValue={
                                    this.props.ticket.dataTicketScore[0].score
                                  }
                                  disabled
                                  style={{ fontSize: '50px' }}
                                />
                              </div>
                            </Grid>
                            <Grid xs={12} sm={12} md={8}>
                              <h6 className="textBodyBold">Feedback </h6>
                              <Typography
                                variant="body2"
                                className="paperGridCentre"
                              >
                                <p className="textPrimaryColor">
                                  {this.props.ticket.dataTicketScore[0]
                                    .feedback === ''
                                    ? 'No Feedback Available'
                                    : this.props.ticket.dataTicketScore[0]
                                        .feedback}
                                </p>
                              </Typography>
                            </Grid>
                          </Paper>
                        </Grid>
                      )}
                    </>
                  )}
                  <Link
                    to="/admin/ticketing"
                    className="btn btn-block btn-outline-danger mt-4"
                  >
                    Close
                  </Link>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  login: state.login,
})
const mapDispatchToProps = { getTicketScore, exportDetailTicket, newToken }

export default connect(mapStateToProps, mapDispatchToProps)(TicketingDetail)
