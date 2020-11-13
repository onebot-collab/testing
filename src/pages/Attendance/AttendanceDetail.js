/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'
import 'chartist/dist/chartist.min.css'
// import { connect } from 'react-redux'
import './AttendanceDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
// import Typography from '@material-ui/core/Typography'
// import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
// import { Link } from 'react-router-dom'

// @material-ui/icons
import { Cancel, CheckCircle } from '@material-ui/icons'

// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

import { reportAttendanceChart } from '../../variables/charts'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

export default class AttendanceDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attendance: 85,
    }
  }

  componentWillUnmount() {}

  componentDidMount() {}

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>
                  Samantha Report Attendance
                </h4>
                <p className={classes.cardCategoryWhite}>17 Agustus 1945</p>
              </CardHeader>
              <CardBody>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={4}>
                    <div className="d-flex justify-content-center">
                      <Paper className="wrapperNoImage" elevation={3}>
                        <ChartistGraph
                          className="chartPie"
                          data={reportAttendanceChart.data}
                          type="Pie"
                          options={reportAttendanceChart.options}
                        />
                        <div className="d-flex justify-content-center">
                          <div className="d-flex flex-row pb-2 pl-4">
                            <span className="badge badge-pill badge-danger align-self-center justify-content-start">
                              %
                            </span>
                            <div className="d-flex justify-content-end pl-2">
                              {' '}
                              Is Late
                            </div>
                          </div>
                          <div className="d-flex flex-row pb-2 pl-4">
                            <span className="badge badge-pill badge-warning align-self-center justify-content-start">
                              %
                            </span>
                            <div className="d-flex justify-content-end pl-2">
                              {' '}
                              On Time
                            </div>
                          </div>
                          <div className="d-flex flex-row pb-2 pl-4">
                            <span className="badge badge-pill badge-light align-self-center justify-content-start">
                              %
                            </span>
                            <div className="d-flex justify-content-end pl-2">
                              {' '}
                              Leave
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    className="contentDescWrapper"
                  >
                    <Table className={classesHead.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell component="th">
                            <h6 className="textPrimaryColor">Check In</h6>
                          </TableCell>
                          <TableCell component="th">
                            <h6 className="textPrimaryColor">Check Out</h6>
                          </TableCell>
                          <TableCell component="th">
                            <h6 className="textPrimaryColor">Date</h6>
                          </TableCell>
                          <TableCell component="th">
                            <h6 className="textPrimaryColor">On Time</h6>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow className={classes.tableRow}>
                          <TableCell component="th">
                            <p className="textPrimaryColor">08.45</p>
                          </TableCell>
                          <TableCell component="th">
                            <p className="textPrimaryColor">17.45</p>
                          </TableCell>
                          <TableCell component="th">
                            <p className="textPrimaryColor">17 Agustus 1945</p>
                          </TableCell>
                          <TableCell className={classesBody.tableActions}>
                            <Tooltip
                              id="tooltip-top-start"
                              title="Late"
                              placement="top"
                              classes={{ tooltip: classesBody.tooltip }}
                            >
                              <Cancel className="iconSecondaryColor" />
                            </Tooltip>
                            <Tooltip
                              id="tooltip-top-start"
                              title="On time"
                              placement="top"
                              classes={{ tooltip: classesBody.tooltip }}
                            >
                              <CheckCircle className="iconPrimaryColor" />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <div className="d-flex flex-row justify-content-around p-3 mt-3">
                      <Paper
                        elevation={2}
                        className="d-flex flex-column p-2 m-1 tableFooter"
                      >
                        <p className="textPrimaryColor align-self-center">
                          Target Monthly Hours
                        </p>
                        <h3 className="textPrimaryColor align-self-center">
                          200 Hours
                        </h3>
                      </Paper>
                      <Paper
                        elevation={2}
                        className="d-flex flex-column p-2 m-1 tableFooter"
                      >
                        <p className="textPrimaryColor align-self-center">
                          Achieved Monthly Hours
                        </p>
                        <h3 className="textPrimaryColor align-self-center">
                          175 Hours
                        </h3>
                        {/* <Box display="flex" alignItems="center">
                          <Box width="80%" mr={1}>
                            <LinearProgress variant="determinate" />
                          </Box>
                          <Box minWidth={35}>
                            <Typography variant="body2" color="textSecondary">
                              100%
                            </Typography>
                          </Box>
                        </Box> */}
                        <LinearProgress
                          variant="determinate"
                          value={this.state.attendance}
                        />
                      </Paper>
                    </div>
                  </Grid>
                  {/* <Grid item xs>
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
                  </Grid> */}
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
