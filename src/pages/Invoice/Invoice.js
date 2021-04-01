/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
import './Invoice.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
// import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
// import Badge from '@material-ui/core/Badge'
import TableContainer from '@material-ui/core/TableContainer'
// import TablePagination from '@material-ui/core/TablePagination'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
// import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
// import Button from '@material-ui/core/Button'
// import Fab from '@material-ui/core/Fab'

// @material-ui/icons
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Visibility from '@material-ui/icons/Visibility'
import Print from '@material-ui/icons/Print'

import moment from 'moment'

// import Check from '@material-ui/icons/Check'
import {
  invoiceWaiting,
  invoiceApproved,
  invoiceRejected,
  invoiceProcessed,
  invoiceClosed,
  exportAllInvoice,
} from '../../redux/actions/invoice'
import { newToken } from '../../redux/actions/login'

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

class Invoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingWaiting: true,
      isLoadingApproved: true,
      isLoadingRejected: true,
      isLoadingProcessed: true,
      isLoadingClosed: true,
      isLoadingExportAllInvoice: false,
      search: '',
      pageWaiting: 1,
      pageApproved: 1,
      pageRejected: 1,
      pageProcessed: 1,
      pageClosed: 1,
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
    }, 100)
  }

  nextPage(id) {
    if (
      id === 1 &&
      this.state.pageWaiting < this.props.invoice.infoInvoiceWaiting.totalPage
    ) {
      this.setState({ pageWaiting: this.state.pageWaiting + 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    } else if (
      id === 2 &&
      this.state.pageApproved < this.props.invoice.infoInvoiceApproved.totalPage
    ) {
      this.setState({ pageApproved: this.state.pageApproved + 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    } else if (
      id === 3 &&
      this.state.pageRejected < this.props.invoice.infoInvoiceRejected.totalPage
    ) {
      this.setState({ pageRejected: this.state.pageRejected + 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    } else if (
      id === 4 &&
      this.state.pageProcessed <
        this.props.invoice.infoInvoiceProcessedpageProcessed.totalPage
    ) {
      this.setState({ pageProcessed: this.state.pageProcessed + 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    } else if (
      id === 5 &&
      this.state.pageClosed < this.props.invoice.infoInvoiceClosed.totalPage
    ) {
      this.setState({ pageClosed: this.state.pageClosed + 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    }
  }

  prevPage(id) {
    if (this.state.pageWaiting > 1 && id === 1) {
      this.setState({ pageWaiting: this.state.pageWaiting - 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    } else if (this.state.pageApproved > 1 && id === 2) {
      this.setState({ pageApproved: this.state.pageApproved - 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    } else if (this.state.pageRejected > 1 && id === 3) {
      this.setState({ pageRejected: this.state.pageRejected - 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    } else if (this.state.pageProcessed > 1 && id === 4) {
      this.setState({ pageProcessed: this.state.pageProcessed - 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    } else if (this.state.pageClosed > 1 && id === 5) {
      this.setState({ pageClosed: this.state.pageClosed - 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    }
  }

  export() {
    this.setState({ isLoadingExportAllInvoice: true })
    this.props.exportAllInvoice(this.props.login.token).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.action.payload.data]),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `Report-All-Invoice_${moment().format('DD-MM-YY')}.pdf`,
      )
      document.body.appendChild(link)
      link.click()
      this.setState({ isLoadingExportAllInvoice: false })
    })
  }

  redirect() {
    this.props.history.push('login')
  }

  fetch() {
    const { token } = this.props.login

    this.props
      .invoiceWaiting(token, this.state.search, this.state.pageWaiting)
      .then((res) => {
        this.setState({ isLoadingWaiting: false })
        this.props
          .invoiceApproved(
            res.action.payload.data.newToken,
            this.state.search,
            this.state.pageApproved,
          )
          .then(() => {
            this.setState({ isLoadingApproved: false })
            this.props
              .invoiceRejected(
                res.action.payload.data.newToken,
                this.state.search,
                this.state.pageRejected,
              )
              .then(() => {
                this.setState({ isLoadingRejected: false })
                this.props
                  .invoiceProcessed(
                    res.action.payload.data.newToken,
                    this.state.search,
                    this.state.pageProcessed,
                  )
                  .then(() => {
                    this.setState({ isLoadingProcessed: false })
                    this.props
                      .invoiceClosed(
                        res.action.payload.data.newToken,
                        this.state.search,
                        this.state.pageClosed,
                      )
                      .then(() => {
                        this.setState({ isLoadingClosed: false })
                        this.props.newToken(res.action.payload.data.newToken)
                      })
                  })
              })
          })
      })
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
                    {this.state.isLoadingExportAllInvoice ? (
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
                  {this.state.isLoadingWaiting ? (
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
                      <CardHeader color="warning">
                        <div className="d-flex flex-row justify-content-between">
                          <h4 className={classes.cardTitleWhite}>Waiting</h4>
                          {/* <p className={classes.cardCategoryWhite}>
                            Last Updated{' '}
                            {this.props.invoice.dataInvoice[0] === undefined
                              ? '-'
                              : this.props.invoice.dataInvoice[0].updated_at}
                          </p> */}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
                          <Table className={classesHead.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">No</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Name</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Total Amount
                                  </h5>
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
                                  <h5 className="textPrimaryColor"> Action</h5>{' '}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.props.invoice.dataInvoiceWaiting.length <
                              1 ? (
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
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                </TableRow>
                              ) : (
                                <>
                                  {this.props.invoice.dataInvoiceWaiting.map(
                                    (res, i) => (
                                      <>
                                        <TableRow
                                          className={classesBody.tableRow}
                                          key={i}
                                        >
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.invoice_no}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.requestname}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              Rp {res.total_amount}
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
                                            ) : res.status === 3 ? (
                                              <span className="badge badge-pill badge-primary">
                                                Processed
                                              </span>
                                            ) : res.status === 4 ? (
                                              <span className="badge badge-pill badge-dark">
                                                Closed
                                              </span>
                                            ) : (
                                              <></>
                                            )}
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.responder === null
                                                ? '-'
                                                : res.nameResponder}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.date}
                                            </p>
                                          </TableCell>
                                          <TableCell
                                            className={classesBody.tableActions}
                                          >
                                            <Link
                                              to={{
                                                pathname: `/admin/invoice/${res.id}`,
                                                state: {
                                                  id: `${res.id}`,
                                                  invoice_no: `${res.invoice_no}`,
                                                  requestname: `${res.requestname}`,
                                                  note: `${res.note}`,
                                                  total_amount: `${res.total_amount}`,
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
                                      </>
                                    ),
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>
                                15 of{' '}
                                {
                                  this.props.invoice.infoInvoiceWaiting
                                    .totalData
                                }
                              </h6>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={() => this.prevPage(1)}>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div>
                              <p>{this.state.pageWaiting}</p>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={() => this.nextPage(1)}>
                                <ArrowRight
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                          </div>
                        </TableContainer>
                        {/* <TablePagination
                          color="primary"
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          // count={rows.length}
                          // rowsPerPage={rowsPerPage}
                          // page={page}
                          // onChangePage={handleChangePage}
                          // onChangeRowsPerPage={handleChangeRowsPerPage}
                        /> */}
                      </CardBody>
                    </>
                  )}
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  {this.state.isLoadingApproved ? (
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
                      <CardHeader color="success">
                        <div className="d-flex flex-row justify-content-between">
                          <h4 className={classes.cardTitleWhite}>Approved</h4>
                          {/* <p className={classes.cardCategoryWhite}>
                            Last Updated{' '}
                            {this.props.invoice.dataInvoice[0] === undefined
                              ? '-'
                              : this.props.invoice.dataInvoice[0].updated_at}
                          </p> */}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
                          <Table className={classesHead.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">No</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Name</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Total Amount
                                  </h5>
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
                                  <h5 className="textPrimaryColor"> Action</h5>{' '}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.props.invoice.dataInvoiceApproved.length <
                              1 ? (
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
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                </TableRow>
                              ) : (
                                <>
                                  {this.props.invoice.dataInvoiceApproved.map(
                                    (res, i) => (
                                      <>
                                        <TableRow
                                          className={classesBody.tableRow}
                                          key={i}
                                        >
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.invoice_no}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.requestname}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              Rp {res.total_amount}
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
                                            ) : res.status === 3 ? (
                                              <span className="badge badge-pill badge-primary">
                                                Processed
                                              </span>
                                            ) : res.status === 4 ? (
                                              <span className="badge badge-pill badge-dark">
                                                Closed
                                              </span>
                                            ) : (
                                              <></>
                                            )}
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.responder === null
                                                ? '-'
                                                : res.nameResponder}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.date}
                                            </p>
                                          </TableCell>
                                          <TableCell
                                            className={classesBody.tableActions}
                                          >
                                            <Link
                                              to={{
                                                pathname: `/admin/invoice/${res.id}`,
                                                state: {
                                                  id: `${res.id}`,
                                                  invoice_no: `${res.invoice_no}`,
                                                  requestname: `${res.requestname}`,
                                                  note: `${res.note}`,
                                                  total_amount: `${res.total_amount}`,
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
                                      </>
                                    ),
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>
                                15 of{' '}
                                {
                                  this.props.invoice.infoInvoiceApproved
                                    .totalData
                                }
                              </h6>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={() => this.prevPage(2)}>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div>
                              <p>{this.state.pageApproved}</p>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={() => this.nextPage(2)}>
                                <ArrowRight
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                          </div>
                        </TableContainer>
                      </CardBody>
                    </>
                  )}
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  {this.state.isLoadingRejected ? (
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
                        <div className="d-flex flex-row justify-content-between">
                          <h4 className={classes.cardTitleWhite}>Rejected</h4>
                          {/* <p className={classes.cardCategoryWhite}>
                            Last Updated{' '}
                            {this.props.invoice.dataInvoice[0] === undefined
                              ? '-'
                              : this.props.invoice.dataInvoice[0].updated_at}
                          </p> */}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
                          <Table className={classesHead.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">No</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Name</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Total Amount
                                  </h5>
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
                                  <h5 className="textPrimaryColor"> Action</h5>{' '}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.props.invoice.dataInvoiceRejected.length <
                              1 ? (
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
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                </TableRow>
                              ) : (
                                <>
                                  {this.props.invoice.dataInvoiceRejected.map(
                                    (res, i) => (
                                      <>
                                        <TableRow
                                          className={classesBody.tableRow}
                                          key={i}
                                        >
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.invoice_no}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.requestname}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              Rp {res.total_amount}
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
                                            ) : res.status === 3 ? (
                                              <span className="badge badge-pill badge-primary">
                                                Processed
                                              </span>
                                            ) : res.status === 4 ? (
                                              <span className="badge badge-pill badge-dark">
                                                Closed
                                              </span>
                                            ) : (
                                              <></>
                                            )}
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.responder === null
                                                ? '-'
                                                : res.nameResponder}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.date}
                                            </p>
                                          </TableCell>
                                          <TableCell
                                            className={classesBody.tableActions}
                                          >
                                            <Link
                                              to={{
                                                pathname: `/admin/invoice/${res.id}`,
                                                state: {
                                                  id: `${res.id}`,
                                                  invoice_no: `${res.invoice_no}`,
                                                  requestname: `${res.requestname}`,
                                                  note: `${res.note}`,
                                                  total_amount: `${res.total_amount}`,
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
                                      </>
                                    ),
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>
                                15 of{' '}
                                {
                                  this.props.invoice.infoInvoiceRejected
                                    .totalData
                                }
                              </h6>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={() => this.prevPage(3)}>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div>
                              <p>{this.state.pageRejected}</p>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={() => this.nextPage(3)}>
                                <ArrowRight
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                          </div>
                        </TableContainer>
                      </CardBody>
                    </>
                  )}
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  {this.state.isLoadingProcessed ? (
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
                      <CardHeader color="primary">
                        <div className="d-flex flex-row justify-content-between">
                          <h4 className={classes.cardTitleWhite}>Processed</h4>
                          {/* <p className={classes.cardCategoryWhite}>
                            Last Updated{' '}
                            {this.props.invoice.dataInvoice[0] === undefined
                              ? '-'
                              : this.props.invoice.dataInvoice[0].updated_at}
                          </p> */}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
                          <Table className={classesHead.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">No</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Name</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Total Amount
                                  </h5>
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
                                  <h5 className="textPrimaryColor"> Action</h5>{' '}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.props.invoice.dataInvoiceProcessed.length <
                              1 ? (
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
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                </TableRow>
                              ) : (
                                <>
                                  {this.props.invoice.dataInvoiceProcessed.map(
                                    (res, i) => (
                                      <>
                                        <TableRow
                                          className={classesBody.tableRow}
                                          key={i}
                                        >
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.invoice_no}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.requestname}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              Rp {res.total_amount}
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
                                            ) : res.status === 3 ? (
                                              <span className="badge badge-pill badge-primary">
                                                Processed
                                              </span>
                                            ) : res.status === 4 ? (
                                              <span className="badge badge-pill badge-dark">
                                                Closed
                                              </span>
                                            ) : (
                                              <></>
                                            )}
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.responder === null
                                                ? '-'
                                                : res.nameResponder}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.date}
                                            </p>
                                          </TableCell>
                                          <TableCell
                                            className={classesBody.tableActions}
                                          >
                                            <Link
                                              to={{
                                                pathname: `/admin/invoice/${res.id}`,
                                                state: {
                                                  id: `${res.id}`,
                                                  invoice_no: `${res.invoice_no}`,
                                                  requestname: `${res.requestname}`,
                                                  note: `${res.note}`,
                                                  total_amount: `${res.total_amount}`,
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
                                      </>
                                    ),
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>
                                15 of{' '}
                                {
                                  this.props.invoice.infoInvoiceProcessed
                                    .totalData
                                }
                              </h6>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={() => this.prevPage(4)}>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div>
                              <p>{this.state.pageProcessed}</p>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={() => this.nextPage(4)}>
                                <ArrowRight
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                          </div>
                        </TableContainer>
                      </CardBody>
                    </>
                  )}
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  {this.state.isLoadingClosed ? (
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
                      <CardHeader color="rose">
                        <div className="d-flex flex-row justify-content-between">
                          <h4 className={classes.cardTitleWhite}>Closed</h4>
                          {/* <p className={classes.cardCategoryWhite}>
                            Last Updated{' '}
                            {this.props.invoice.dataInvoice[0] === undefined
                              ? '-'
                              : this.props.invoice.dataInvoice[0].updated_at}
                          </p> */}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
                          <Table className={classesHead.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">No</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Name</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Total Amount
                                  </h5>
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
                                  <h5 className="textPrimaryColor"> Action</h5>{' '}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.props.invoice.dataInvoiceClosed.length <
                              1 ? (
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
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    <p className="textPrimaryColor">-</p>
                                  </TableCell>
                                </TableRow>
                              ) : (
                                <>
                                  {this.props.invoice.dataInvoiceClosed.map(
                                    (res, i) => (
                                      <>
                                        <TableRow
                                          className={classesBody.tableRow}
                                          key={i}
                                        >
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.invoice_no}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.requestname}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              Rp {res.total_amount}
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
                                            ) : res.status === 3 ? (
                                              <span className="badge badge-pill badge-primary">
                                                Processed
                                              </span>
                                            ) : res.status === 4 ? (
                                              <span className="badge badge-pill badge-dark">
                                                Closed
                                              </span>
                                            ) : (
                                              <></>
                                            )}
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.responder === null
                                                ? '-'
                                                : res.nameResponder}
                                            </p>
                                          </TableCell>
                                          <TableCell component="th">
                                            <p className="textPrimaryColor">
                                              {res.date}
                                            </p>
                                          </TableCell>
                                          <TableCell
                                            className={classesBody.tableActions}
                                          >
                                            <Link
                                              to={{
                                                pathname: `/admin/invoice/${res.id}`,
                                                state: {
                                                  id: `${res.id}`,
                                                  invoice_no: `${res.invoice_no}`,
                                                  requestname: `${res.requestname}`,
                                                  note: `${res.note}`,
                                                  total_amount: `${res.total_amount}`,
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
                                      </>
                                    ),
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>
                                15 of{' '}
                                {this.props.invoice.infoInvoiceClosed.totalData}
                              </h6>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={() => this.prevPage(5)}>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div>
                              <p>{this.state.pageClosed}</p>
                            </div>
                            <div className="p-2">
                              <IconButton onClick={() => this.nextPage(5)}>
                                <ArrowRight
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                          </div>
                        </TableContainer>
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
  invoice: state.invoice,
  login: state.login,
})

const mapDispatchToProps = {
  invoiceWaiting,
  invoiceApproved,
  invoiceRejected,
  invoiceProcessed,
  invoiceClosed,
  exportAllInvoice,
  newToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
