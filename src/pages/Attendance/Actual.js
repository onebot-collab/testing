/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
// import Fab from '@material-ui/core/Fab'

// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
import Visibility from '@material-ui/icons/Visibility'
import { Cancel, CheckCircle } from '@material-ui/icons'
import { allLog } from '../../redux/actions/presence'

// import Check from '@material-ui/icons/Check'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class Attendance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
    this.fetch = this.fetch.bind(this)
  }

  fetch() {
    this.props.allLog().then(() => {
      this.setState({ isLoading: false })
    })
  }

  redirect() {
    this.props.history.push('/login')
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    return (
      <div>
        {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
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
                    <CardHeader color="danger">
                      <h4 className={classes.cardTitleWhite}>Attendance</h4>
                      <p className={classes.cardCategoryWhite}>
                        Last Updated{' '}
                        {this.props.presence.dataAllLog[0] === undefined
                          ? '-'
                          : this.props.presence.dataAllLog[0].updated_at}
                      </p>
                    </CardHeader>
                    <CardBody>
                      <Table className={classesHead.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell component="th">Name</TableCell>
                            <TableCell component="th">Department</TableCell>
                            <TableCell component="th">Check In</TableCell>
                            <TableCell component="th">Check Out</TableCell>
                            <TableCell component="th">Date</TableCell>
                            <TableCell component="th">On Time</TableCell>
                            <TableCell component="th"> Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.props.presence.dataAllLog.map((res, i) => (
                            <TableRow className={classes.tableRow} key={i}>
                              <TableCell component="th">
                                {res.nameUser}
                              </TableCell>
                              <TableCell component="th">General</TableCell>
                              <TableCell component="th">
                                {res.att_time}
                              </TableCell>
                              <TableCell component="th">
                                {res.end_time === null ? '-' : res.end_time}
                              </TableCell>
                              <TableCell component="th">
                                {res.att_date}
                              </TableCell>
                              <TableCell className={classesBody.tableActions}>
                                {res.isLate === 1 ? (
                                  <Tooltip
                                    id="tooltip-top-start"
                                    title="Late"
                                    placement="top"
                                    classes={{ tooltip: classesBody.tooltip }}
                                  >
                                    <Cancel
                                      className={classesBody.CheckCircle}
                                    />
                                  </Tooltip>
                                ) : (
                                  <Tooltip
                                    id="tooltip-top-start"
                                    title="On time"
                                    placement="top"
                                    classes={{ tooltip: classesBody.tooltip }}
                                  >
                                    <CheckCircle
                                      className={classesBody.CheckCircle}
                                    />
                                  </Tooltip>
                                )}
                              </TableCell>
                              <TableCell className={classesBody.tableActions}>
                                <Tooltip
                                  id="tooltip-top-start"
                                  title="Click to Detail"
                                  placement="top"
                                  onClick={() =>
                                    this.props.history.push('/admin/dashboard')
                                  }
                                  classes={{ tooltip: classesBody.tooltip }}
                                >
                                  <Visibility
                                    className={classesBody.CheckCircle}
                                  />
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardBody>
                  </>
                )}
              </Card>
            </GridItem>
          </GridContainer>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  presence: state.presence,
  login: state.login,
})
const mapDispatchToProps = { allLog }

export default connect(mapStateToProps, mapDispatchToProps)(Attendance)
