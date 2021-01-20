/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChartistGraph from 'react-chartist'
import 'chartist/dist/chartist.min.css'
// import { connect } from 'react-redux'
import './AttendanceDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
// import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'

// @material-ui/icons
import { Cancel, CheckCircle, ArrowLeft, ArrowRight } from '@material-ui/icons'

// core components
import { userLogHistory } from '../../redux/actions/presence'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// import { reportAttendanceChart } from '../../variables/charts'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class AttendanceDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attendance: 85,
      isLoadingFetch: false,
      page: 1,
    }
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
  }

  nextPage() {
    if (this.state.page < this.props.presence.infoUserLog.totalPage) {
      this.setState({ page: this.state.page + 1 })
      setTimeout(() => {
        this.fetchUserLog()
      }, 100);
    }
  }

  prevPage() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
      setTimeout(() => {
        this.fetchUserLog()
      }, 100);
    }
  }

  fetchUserLog() {
    this.setState({ isLoadingFetch: true })
    this.props
      .userLogHistory(this.props.location.state.user_id, this.props.login.token, this.state.page)
      .then(() => {
        this.setState({ isLoadingFetch: false })
      })
  }

  componentDidMount() {
    this.fetchUserLog()
  }

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    const reportAttendanceChart = {
      data: {
        labels: ['62%', '32%', '6%'],
        series: [62, 32, 6],
      },
      options: {
        height: '175px',
        donut: true,
        donutWidth: 40,
        donutSolid: true,
        startAngle: 270,
        showLabel: true,
      },
    }
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className={classes.cardTitleWhite}>
                    {this.props.location.state.nameUser} Attendance Report
                  </h4>
                  {/* <Link to="/admin/attendance" className="CancelIcon mb-5">
                    <Tooltip
                      id="tooltip-top-start"
                      title="Close Detail"
                      placement="top"
                      classes={{ tooltip: classesBody.tooltip }}
                    >
                      <Cancel />
                    </Tooltip>
                  </Link> */}
                  {/* <h4 className={classes.cardTitleWhite}>
                    <Cancel />
                  </h4> */}
                  {/* <p className={classes.cardCategoryWhite}>
                    {this.props.location.state.name}
                  </p> */}
                </div>
              </CardHeader>
              {this.state.isLoadingFetch ? (
                <center>
                  <div
                    className="d-flex align-self-center spinner-border text-white mt-2 mb-3"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </center>
              ) : (
                <CardBody>
                  <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <div className="d-flex justify-content-center">
                        <Paper elevation={3}>
                          <ChartistGraph
                            className="chartPie"
                            data={reportAttendanceChart.data}
                            type="Pie"
                            options={reportAttendanceChart.options}
                          />
                          <div className="d-flex justify-content-center ">
                            <div className="d-flex flex-row pb-2 pl-2">
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
                              <div className="d-flex justify-content-end pl-2 pr-2">
                                {' '}
                                Leave
                              </div>
                            </div>
                          </div>
                        </Paper>
                      </div>
                      <div className="d-flex flex-column justify-content-around p-4 mt-3">
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
                    <Grid item xs={12} sm={12} md={8}>
                      <TableContainer>
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
                            {this.props.presence.dataUserLog.length < 1 ? (
                              <TableRow className={classesBody.tableRow}>
                                <TableCell component="th">
                                  <p className="textPrimaryColor">-</p>
                                </TableCell>
                                <TableCell component="th">
                                  <p className="textPrimaryColor">-</p>
                                </TableCell>
                                <TableCell component="th">
                                  <p className="textPrimaryColor">-</p>
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
                            ) : (
                              <>
                                {this.props.presence.dataUserLog.map((res) => (
                                  <TableRow className={classesBody.tableRow}>
                                    <TableCell component="th">
                                      <p className="textPrimaryColor">
                                        {res.att_time}
                                      </p>
                                    </TableCell>
                                    <TableCell component="th">
                                      <p className="textPrimaryColor">
                                        {res.end_time === null
                                          ? '-'
                                          : res.end_time}
                                      </p>
                                    </TableCell>
                                    <TableCell component="th">
                                      <p className="textPrimaryColor">
                                        {res.att_date}
                                      </p>
                                    </TableCell>
                                    <TableCell
                                      className={classesBody.tableActions}
                                    >
                                      {res.isLate === 0 ? (
                                        <Tooltip
                                          id="tooltip-top-start"
                                          title="On time"
                                          placement="top"
                                          classes={{
                                            tooltip: classesBody.tooltip,
                                          }}
                                        >
                                          <CheckCircle className="iconPrimaryColor" />
                                        </Tooltip>
                                      ) : (
                                        <Tooltip
                                          id="tooltip-top-start"
                                          title="Late"
                                          placement="top"
                                          classes={{
                                            tooltip: classesBody.tooltip,
                                          }}
                                        >
                                          <Cancel className="iconSecondaryColor" />
                                        </Tooltip>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="d-flex flex-row justify-content-end">
                        <div className="p-2 d-flex align-items-center align-self-center">
                          <h6>
                            15 of {this.props.presence.infoUserLog.totalData}
                          </h6>
                        </div>
                        <div className="p-2">
                          <IconButton onClick={this.prevPage}>
                            <ArrowLeft
                              className="iconWhiteColor"
                              fontSize="large"
                            />
                          </IconButton>
                        </div>
                        <div>
                            <p>{this.state.page}</p>
                          </div>
                        <div className="p-2">
                          <IconButton onClick={this.nextPage}>
                            <ArrowRight
                              className="iconWhiteColor"
                              fontSize="large"
                            />
                          </IconButton>
                        </div>
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
                  <div className="pl-4 pr-4">
                    <Link
                      to="/admin/attendance"
                      className="btn btn-block btn-outline-danger"
                    >
                      Close
                    </Link>
                  </div>
                </CardBody>
              )}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  presence: state.presence,
  login: state.login,
})
const mapDispatchToProps = { userLogHistory }

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceDetail)
