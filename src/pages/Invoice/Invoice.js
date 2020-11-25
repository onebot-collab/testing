/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
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

// import Check from '@material-ui/icons/Check'
import {
  invoiceWaiting,
  invoiceApproved,
  invoiceRejected,
  invoiceProcessed,
  invoiceClosed,
} from '../../redux/actions/invoice'
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
    }
  }

  redirect() {
    this.props.history.push('login')
  }

  fetch() {
    this.props.invoiceWaiting().then(() => {
      this.setState({ isLoadingWaiting: false })
    })
    this.props.invoiceApproved().then(() => {
      this.setState({ isLoadingApproved: false })
    })
    this.props.invoiceRejected().then(() => {
      this.setState({ isLoadingRejected: false })
    })
    this.props.invoiceProcessed().then(() => {
      this.setState({ isLoadingProcessed: false })
    })
    this.props.invoiceClosed().then(() => {
      this.setState({ isLoadingClosed: false })
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
        {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <nav className="navbar navbar-light bg-light d-flex justify-content-end">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
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
                                1 - 5 of{' '}
                                {this.props.invoice.dataInvoiceWaiting.length}
                              </h6>
                            </div>
                            <div className="p-2">
                              <IconButton>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div className="p-2">
                              <IconButton>
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
                                1 - 5 of{' '}
                                {this.props.invoice.dataInvoiceApproved.length}
                              </h6>
                            </div>
                            <div className="p-2">
                              <IconButton>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div className="p-2">
                              <IconButton>
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
                                1 - 5 of{' '}
                                {this.props.invoice.dataInvoiceRejected.length}
                              </h6>
                            </div>
                            <div className="p-2">
                              <IconButton>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div className="p-2">
                              <IconButton>
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
                                1 - 5 of{' '}
                                {this.props.invoice.dataInvoiceProcessed.length}
                              </h6>
                            </div>
                            <div className="p-2">
                              <IconButton>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div className="p-2">
                              <IconButton>
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
                                1 - 5 of{' '}
                                {this.props.invoice.dataInvoiceClosed.length}
                              </h6>
                            </div>
                            <div className="p-2">
                              <IconButton>
                                <ArrowLeft
                                  className="iconWhiteColor"
                                  fontSize="large"
                                />
                              </IconButton>
                            </div>
                            <div className="p-2">
                              <IconButton>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
