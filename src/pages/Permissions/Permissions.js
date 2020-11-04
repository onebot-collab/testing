/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
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
// import CheckCircle from '@material-ui/icons/CheckCircle'
import Visibility from '@material-ui/icons/Visibility'
import { listIzin } from '../../redux/actions/izin'

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

class Permissions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  fetch() {
    const dataSubmit = {
      touser: this.props.login.dataLogin.id,
    }
    this.props.listIzin(dataSubmit).then(() => {
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
                  <>
                    <center>
                      <div
                        className="d-flex align-self-center spinner-border text-dark mt-2 mb-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </center>
                  </>
                ) : (
                  <>
                    <CardHeader color="danger">
                      <h4 className={classes.cardTitleWhite}>Attendance</h4>
                      <p className={classes.cardCategoryWhite}>
                        Last Updated{' '}
                        {this.props.izin.dataIzin[0] === undefined
                          ? '-'
                          : this.props.izin.dataIzin[0].startdate}
                      </p>
                    </CardHeader>
                    <CardBody>
                      <Table className={classesHead.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell component="th">Name</TableCell>
                            <TableCell component="th">Departemnt</TableCell>
                            <TableCell component="th">Reason</TableCell>
                            <TableCell component="th">Status</TableCell>
                            <TableCell component="th">Responder</TableCell>
                            <TableCell component="th">Created At</TableCell>
                            <TableCell component="th">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.props.izin.dataIzin.map((res, i) => (
                            <TableRow className={classes.tableRow} key={i}>
                              <TableCell component="th">
                                {res.nameuser}
                              </TableCell>
                              <TableCell component="th">
                                {res.department}
                              </TableCell>
                              <TableCell component="th">{res.type}</TableCell>
                              <TableCell component="th">
                                {res.status === 0 ? (
                                  <span className="badge badge-pill badge-warning">
                                    Waiting
                                  </span>
                                ) : res.status === 1 ? (
                                  <span className="badge badge-pill badge-success">
                                    Approved
                                  </span>
                                ) : res.status === 2 ? (
                                  <span className="badge badge-pill badge-danger">
                                    Rejected
                                  </span>
                                ) : (
                                  <></>
                                )}
                              </TableCell>
                              <TableCell component="th">
                                {res.name_tosend}
                              </TableCell>
                              <TableCell component="th">
                                {res.startdate}
                              </TableCell>
                              <TableCell className={classesBody.tableActions}>
                                <Tooltip
                                  id="tooltip-top-start"
                                  title="Click to Detail"
                                  placement="top"
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
  login: state.login,
  izin: state.izin,
})

const mapDispatchToProps = { listIzin }

export default connect(mapStateToProps, mapDispatchToProps)(Permissions)
