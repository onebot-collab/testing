/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Permissions.css'
// import { connect } from 'react-redux'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
// import Fab from '@material-ui/core/Fab'

import { Link } from 'react-router-dom'
import moment from 'moment'
// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
// import CheckCircle from '@material-ui/icons/CheckCircle'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Visibility from '@material-ui/icons/Visibility'
import Print from '@material-ui/icons/Print'

import { allIzin, exportAllIzin } from '../../redux/actions/izin'
import { newToken } from '../../redux/actions/login'

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
      isLoadingExportAllIzin: false,
      search: '',
      page: 1,
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.export = this.export.bind(this)
  }

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      this.fetch()
    }, 100);
  }

  nextPage() {
    if (this.state.page < this.props.izin.infoIzinAll.totalPage)
    this.setState({ page: this.state.page + 1 })
    setTimeout(() => {
      this.fetch()
    }, 100);
  }

  prevPage() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
      setTimeout(() => {
        this.fetch()
      }, 100);
    }
  }

  fetch() {
    this.props.allIzin(this.props.login.token, this.state.search, this.state.page).then((res) => {
      this.props.newToken(res.action.payload.data.newToken)
      this.setState({ isLoading: false })
    })
  }

  export() {
    this.setState({isLoadingExportAllIzin: true})
    this.props.exportAllIzin(this.props.login.token).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.action.payload.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Report-All-Leave-Application_${moment().format('DD-MM-YY')}.pdf`);
      document.body.appendChild(link);
      link.click();
      this.setState({isLoadingExportAllIzin: false})
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
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <nav className="navbar navbar-light bg-light d-flex justify-content-end">
              <div className="d-flex flex-row">
                <form className="form-inline mr-5">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    name="search"
                    onChange={this.handleSearch}
                    placeholder="Type Something ..."
                    aria-label="Search"
                  ></input>
                  <button
                    className="btn btn-outline-danger my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
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
                    {this.state.isLoadingExportAllIzin ? (
                      <div
                        className="spinner-border spinner-border-sm text-white"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ):(
                      <Print className="iconWhiteColor" />
                    )}
                  </Tooltip>
                </button>
              </div>
            </nav>
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
                        <div className="d-flex flex-row justify-content-between">
                          <h4 className={classes.cardTitleWhite}>
                            Leave Application
                          </h4>
                          {/* <p className={classes.cardCategoryWhite}>
                            Last Updated{' '}
                            {this.props.izin.dataIzin[0] === undefined
                              ? '-'
                              : this.props.izin.dataIzin[0].startdate}
                          </p> */}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
                          <Table className={classesHead.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Name</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Department
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Reason</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Status</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Responder
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Created At
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Action</h5>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.props.izin.dataIzinAll.map((res, i) => (
                                <TableRow className={classes.tableRow} key={i}>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.nameuser}
                                    </p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.department}
                                    </p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.type}
                                    </p>
                                  </TableCell>
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
                                    <p className="textPrimaryColor">
                                      {res.name_tosend}
                                    </p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.startdate}
                                    </p>
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    <Link
                                      to={{
                                        pathname: `/admin/leave-application/${res.id}`,
                                        state: {
                                          id: `${res.id}`,
                                          name: `${res.nameuser}`,
                                          department: `${res.department}`,
                                          file: `${res.file_upload}`,
                                          startdate: `${res.startdate}`,
                                          enddate: `${res.enddate}`,
                                          type: `${res.type}`,
                                          status: `${res.status}`,
                                          reason: `${res.reason}`,
                                          to_send: `${res.to_send}`,
                                          name_tosend: `${res.name_tosend}`,
                                        },
                                      }}
                                    >
                                      <Tooltip
                                        id="tooltip-top-start"
                                        title="Click to Detail"
                                        placement="top"
                                        classes={{
                                          tooltip: classesBody.tooltip,
                                        }}
                                      >
                                        <Visibility className="iconWhiteColor" />
                                      </Tooltip>
                                    </Link>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <div className="d-flex flex-row justify-content-end">
                          <div className="p-2 d-flex align-items-center align-self-center">
                            <h6>
                              15 of {this.props.izin.infoIzinAll.totalData}
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
                      </CardBody>
                    </>
                  )}
                </Card>
              </GridItem>
            </GridContainer>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  izin: state.izin,
})

const mapDispatchToProps = { allIzin, exportAllIzin, newToken }

export default connect(mapStateToProps, mapDispatchToProps)(Permissions)
