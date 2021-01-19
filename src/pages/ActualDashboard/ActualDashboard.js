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

  componentDidMount() {
    this.fetchStatsPermit()
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

    const reportAttendanceChart = {
      data: {
        labels: ['62%', '32%', '6%'],
        series: [62, 32, 6],
      },
      options: {
        height: '193px',
        donut: true,
        donutWidth: 40,
        donutSolid: true,
        startAngle: 270,
        showLabel: true,
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
        {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <div>
            <GridContainer>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
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
                        <h1 className={classes.cardTitle}>{this.props.izin.statsPermit[0].sickness}</h1>
                      )}
                  </CardHeader>
                  <CardFooter stats>
                      <Update />
                      Requested by Samantha, 3 days ago
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
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
                        <h1 className={classes.cardTitle}>{this.props.izin.statsPermit[0].permit}</h1>
                      )}
                  </CardHeader>
                  <CardFooter stats>
                      <Update />
                      Requested by Samantha, 3 days ago
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
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
                      <h1 className={classes.cardTitle}>{this.props.izin.statsPermit[0].total_leave}</h1>
                    )}
                  </CardHeader>
                  <CardFooter stats>
                      <Update />
                      Requested by Samantha, 3 days ago
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
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
                      <h1 className={classes.cardTitle}>{this.props.izin.statsPermit[0].latecoming}</h1>
                    )}
                  </CardHeader>
                  <CardFooter stats>
                    <Update /> Happy Day, No requested incoming
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Completed Tickets</h4>
                  </CardHeader>
                  <CardBody>
                    <ChartistGraph
                      className="ct-chart"
                      data={ticketCompletedChart.data}
                      type="Line"
                      options={ticketCompletedChart.options}
                      listener={ticketCompletedChart.animation}
                    />

                    <p className={classes.cardCategory}>
                      {/* <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} />{' '}
                        55%
                      </span>{' '}
                      increase in today sales. */}
                      01/TKT/01012021 solved by Samantha
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> updated 1 minutes ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Attendance Statistics</h4>
                  </CardHeader>
                  <CardBody>
                    <ChartistGraph
                      data={reportAttendanceChart.data}
                      type="Pie"
                      options={reportAttendanceChart.options}
                    />
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
                <Card chart>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Incoming Reports</h4>
                  </CardHeader>
                  <CardBody>
                    <ChartistGraph
                      className="ct-chart"
                      data={incomingReportChart.data}
                      type="Line"
                      options={incomingReportChart.options}
                      listener={incomingReportChart.animation}
                    />

                    <p className={classes.cardCategory}>
                      {/* <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} />{' '}
                        55%
                      </span>{' '}
                      increase in today sales. */}
                      Samantha created a report
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> updated 1 minutes ago
                    </div>
                  </CardFooter>
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
})
const mapDispatchToProps = {permitStats}

export default connect(mapStateToProps, mapDispatchToProps)(ActualDashboard)
