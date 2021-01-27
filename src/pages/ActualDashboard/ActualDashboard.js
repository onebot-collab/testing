/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// react plugin for creating charts
import ChartistGraph from 'react-chartist'
import 'chartist/dist/chartist.min.css'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
// import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import Assignment from '@material-ui/icons/Assignment'
import AssignmentInd from '@material-ui/icons/AssignmentInd'
import AssignmentLate from '@material-ui/icons/AssignmentLate'
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn'
import Update from '@material-ui/icons/Update'
// import ArrowUpward from '@material-ui/icons/ArrowUpward'
import AccessTime from '@material-ui/icons/AccessTime'
import { connect } from 'react-redux'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
// import Danger from '../../components/Typography/Danger'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardIcon from '../../components/Card/CardIcon'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

import {permitStats} from '../../redux/actions/izin'
import {statsAttendance} from '../../redux/actions/presence'
import {statsTicketClosed} from '../../redux/actions/ticket'
import {statsReport} from '../../redux/actions/report'

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
const Chartist = require('chartist')
// const useStyles(){
//   return makeStyles(styles);
// }
class ActualDashboard extends Component {
  constructor(props) {
    super(props)
    this.redirect = this.redirect.bind(this)
    this.state = {
      isLoadingStatsPermit: true,
      isLoadingStatsAttendance: true,
      isLoadingTicketClosed: true,
      isLoadingStatsReport: true,
    }
  }

  redirect() {
    this.props.history.push('/login')
  }

  fetchStatsPermit() {
    this.setState({isLoadingStatsPermit: true})
    this.props.permitStats(this.props.login.token).then(() => {
      this.setState({isLoadingStatsPermit: false})
    })
  }

  fetchStatsAttendance() {
    this.setState({isLoadingStatsAttendance: true})
    this.props.statsAttendance(this.props.login.token).then(() => {
      this.setState({isLoadingStatsAttendance: false})
    })
  }

  fetchStatsTicketClosed() {
    this.setState({isLoadingTicketClosed: true})
    this.props.statsTicketClosed(this.props.login.token).then(() => {
      this.setState({isLoadingTicketClosed: false})
    })
  }

  fetchStatsReport() {
    this.setState({isLoadingStatsReport: true})
    this.props.statsReport(this.props.login.token).then(() => {
      this.setState({isLoadingStatsReport: false})
    })
  }

  componentDidMount() {
    this.fetchStatsPermit()
    this.fetchStatsAttendance()
    this.fetchStatsTicketClosed()
    this.fetchStatsReport()
  }

  // useStyles(){
  //   return makeStyles(styles);
  // }
  render() {
    const classes = makeStyles(styles)
    const delays = 80
    const durations = 500

    const ticketCompletedChart = {
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [[12, 17, 7, 17, 23, 18, 20]],
      },
      options: {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 10,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      // for animation
      animation: {
        draw(data) {
          if (data.type === 'line' || data.type === 'area') {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path
                  .clone()
                  .scale(1, 0)
                  .translate(0, data.chartRect.height())
                  .stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint,
              },
            })
          } else if (data.type === 'point') {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease',
              },
            })
          }
        },
      },
    }

    const incomingReportChart = {
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [[12, 17, 7, 17, 23, 18, 20]],
      },
      options: {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 25,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      // for animation
      animation: {
        draw(data) {
          if (data.type === 'line' || data.type === 'area') {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path
                  .clone()
                  .scale(1, 0)
                  .translate(0, data.chartRect.height())
                  .stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint,
              },
            })
          } else if (data.type === 'point') {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease',
              },
            })
          }
        },
      },
    }

    return (
      <>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <div>
            <GridContainer>
              <GridItem xs={12} sm={6} md={3}>
                <Card onClick={() => this.props.history.push('leave-application')}>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Assignment />
                    </CardIcon>
                    <p className={classes.cardCategory}>Medical Leave</p>
                      {/* 49/50 <small>GB</small> */}
                      {this.state.isLoadingStatsPermit ? (
                        <div
                          className="spinner-border spinner-border-sm text-danger"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ):(
                        <h1 className={classes.cardTitle}>{this.props.izin.statsPermit.dataStats[0].sickness}</h1>
                      )}
                  </CardHeader>
                  {this.state.isLoadingStatsPermit ? (
                    <></>
                  ):(
                    <CardFooter stats>
                      <Update />
                      {this.props.izin.statsPermit.dataStats[0].sickness > 0 ? 
                      `Recently requested by ${this.props.izin.statsPermit.dataLatestUser[0].sickness}`
                      : 'There is no incoming request right now'}
                    </CardFooter>
                  )}
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card onClick={() => this.props.history.push('leave-application')}>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <AssignmentInd />
                    </CardIcon>
                    <p className={classes.cardCategory}>Permit</p>
                    {this.state.isLoadingStatsPermit ? (
                        <div
                          className="spinner-border spinner-border-sm text-danger"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ):(
                        <h1 className={classes.cardTitle}>{this.props.izin.statsPermit.dataStats[0].permit}</h1>
                      )}
                  </CardHeader>
                  {this.state.isLoadingStatsPermit ? (
                    <></>
                  ):(
                    <CardFooter stats>
                      <Update />
                      {this.props.izin.statsPermit.dataStats[0].permit > 0 ? 
                      `Recently requested by ${this.props.izin.statsPermit.dataLatestUser[0].permit}`
                      : 'There is no incoming request right now'}
                    </CardFooter>
                  )}
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card onClick={() => this.props.history.push('leave-application')}>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <AssignmentReturnIcon />
                    </CardIcon>
                    <p className={classes.cardCategory}>Leave</p>
                    {this.state.isLoadingStatsPermit ? (
                      <div
                        className="spinner-border spinner-border-sm text-danger"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ):(
                      <h1 className={classes.cardTitle}>{this.props.izin.statsPermit.dataStats[0].total_leave}</h1>
                    )}
                  </CardHeader>
                  {this.state.isLoadingStatsPermit ? (
                    <></>
                  ):(
                    <CardFooter stats>
                      <Update />
                      {this.props.izin.statsPermit.dataStats[0].total_leave > 0 ? 
                      `Recently requested by ${this.props.izin.statsPermit.dataLatestUser[0].total_leave}`
                      : 'There is no incoming request right now'}
                    </CardFooter>
                  )}
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card onClick={() => this.props.history.push('leave-application')}>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <AssignmentLate />
                    </CardIcon>
                    <p className={classes.cardCategory}>Late Coming</p>
                    {this.state.isLoadingStatsPermit ? (
                      <div
                        className="spinner-border spinner-border-sm text-danger"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ):(
                      <h1 className={classes.cardTitle}>{this.props.izin.statsPermit.dataStats[0].latecoming}</h1>
                    )}
                  </CardHeader>
                  {this.state.isLoadingStatsPermit ? (
                    <></>
                  ):(
                    <CardFooter stats>
                      <Update />
                      {this.props.izin.statsPermit.dataStats[0].latecoming > 0 ? 
                      `Recently requested by ${this.props.izin.statsPermit.dataLatestUser[0].latecoming}`
                      : 'There is no incoming request right now'}
                    </CardFooter>
                  )}
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4} onClick={() => this.props.history.push('ticketing')}>
                <Card chart>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Completed Tickets</h4>
                  </CardHeader>
                    {this.state.isLoadingTicketClosed ? (
                      <CardBody>
                        <div
                          className="spinner-border spinner-border-sm text-danger"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </CardBody>
                    ):(
                      <>
                        <CardBody>
                          <ChartistGraph
                            className="ct-chart"
                            data={
                              {
                                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                                series: [
                                  [
                                    this.props.ticket.statsTicketClosed.data[1].countId,
                                    this.props.ticket.statsTicketClosed.data[2].countId,
                                    this.props.ticket.statsTicketClosed.data[3].countId,
                                    this.props.ticket.statsTicketClosed.data[4].countId,
                                    this.props.ticket.statsTicketClosed.data[5].countId,
                                    this.props.ticket.statsTicketClosed.data[6].countId,
                                    this.props.ticket.statsTicketClosed.data[0].countId,
                                  ]
                                ],
                              }
                            }
                            type="Line"
                            options={ticketCompletedChart.options}
                            listener={ticketCompletedChart.animation}
                          />
                          {this.props.ticket.statsTicketClosed.dataLatest[0].no_ticket !== null ? (
                            <p className={classes.cardCategory}>
                              {this.props.ticket.statsTicketClosed.dataLatest[0].no_ticket} solved by 
                              &nbsp;{this.props.ticket.statsTicketClosed.dataLatest[0].departmentName !== null ? this.props.ticket.statsTicketClosed.dataLatest[0].departmentName : this.props.ticket.statsTicketClosed.dataLatest[0].userName}
                            </p>
                          ) : (
                            <p className={classes.cardCategory}>-</p>
                          )}
                        </CardBody>
                        <CardFooter chart>
                          <div className={classes.stats}>
                            <AccessTime /> updated 1 minutes ago
                          </div>
                        </CardFooter>
                      </>
                    )}
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart onClick={() => this.props.history.push('attendance')}>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Attendance Statistics</h4>
                  </CardHeader>
                  <CardBody>
                    {this.state.isLoadingStatsAttendance ? (
                      <div
                        className="spinner-border spinner-border-sm text-danger"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ):(
                      <ChartistGraph
                        data={{
                          labels: [
                            `${this.props.presence.statsAttendance.isLate}%`,
                            `${this.props.presence.statsAttendance.notLate}%`,
                            `${this.props.presence.statsAttendance.permit}%`,
                          ],
                          series: [
                            this.props.presence.statsAttendance.isLate,
                            this.props.presence.statsAttendance.notLate,
                            this.props.presence.statsAttendance.permit
                          ],
                        }}
                        type="Pie"
                        options={{
                          height: '193px',
                          donut: true,
                          donutWidth: 40,
                          donutSolid: true,
                          startAngle: 270,
                          showLabel: true,
                        }}
                      />
                    )}
                  </CardBody>
                  <CardFooter chart>
                    <div className="d-flex justify-content-center ">
                      <div className="d-flex flex-row  pl-2">
                        <span className="badge badge-pill badge-danger align-self-center justify-content-start">
                          %
                        </span>
                        <div className="d-flex justify-content-end pl-2">
                          {' '}
                          Late
                        </div>
                      </div>
                      <div className="d-flex flex-row  pl-4">
                        <span className="badge badge-pill badge-success align-self-center justify-content-start">
                          %
                        </span>
                        <div className="d-flex justify-content-end pl-2">
                          {' '}
                          On Time
                        </div>
                      </div>
                      <div className="d-flex flex-row  pl-4">
                        <span className="badge badge-pill badge-warning align-self-center justify-content-start">
                          %
                        </span>
                        <div className="d-flex justify-content-end pl-2 pr-2">
                          {' '}
                          Leave
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart onClick={() => this.props.history.push('report')}>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Incoming Reports</h4>
                  </CardHeader>
                  {this.state.isLoadingStatsReport ? (
                      <CardBody>
                      <div
                        className="spinner-border spinner-border-sm text-danger"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </CardBody>
                  ):(
                    <>
                      <CardBody>
                        <ChartistGraph
                          className="ct-chart"
                          data={
                            {
                              labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                              series: [
                                [
                                  this.props.report.statsReport.data[1].countId,
                                  this.props.report.statsReport.data[2].countId,
                                  this.props.report.statsReport.data[3].countId,
                                  this.props.report.statsReport.data[4].countId,
                                  this.props.report.statsReport.data[5].countId,
                                  this.props.report.statsReport.data[6].countId,
                                  this.props.report.statsReport.data[0].countId,
                                ]
                              ],
                            }
                          }
                          type="Line"
                          options={incomingReportChart.options}
                          listener={incomingReportChart.animation}
                        />
                        {this.props.report.statsReport.dataLatest.length > 0 ? (
                          <p className={classes.cardCategory}>
                            {this.props.report.statsReport.dataLatest[0].name} created a report
                          </p>
                        ):(
                          <p className={classes.cardCategory}>
                            -
                          </p>
                        )}
                      </CardBody>
                      <CardFooter chart>
                        <div className={classes.stats}>
                          <AccessTime /> updated 1 minutes ago
                        </div>
                      </CardFooter>
                    </>
                  )}
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  izin: state.izin,
  presence: state.presence,
  ticket: state.ticket,
  report: state.report,
})
const mapDispatchToProps = {permitStats, statsAttendance, statsTicketClosed, statsReport}

export default connect(mapStateToProps, mapDispatchToProps)(ActualDashboard)
