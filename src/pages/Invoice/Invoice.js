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
import { listInvoice } from '../../redux/actions/invoice'
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
      isLoading: true,
    }
  }

  redirect() {
    this.props.history.push('login')
  }

  fetch() {
    this.props.listInvoice().then(() => {
      this.setState({ isLoading: false })
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
                      <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Waiting</h4>
                        <p className={classes.cardCategoryWhite}>
                          Last Updated{' '}
                          {this.props.invoice.dataInvoice[0] === undefined
                            ? '-'
                            : this.props.invoice.dataInvoice[0].updated_at}
                        </p>
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
                              {this.props.invoice.dataInvoice.map((res, i) => (
                                <>
                                  {res.status === 5 ? (
                                    <></>
                                  ) : (
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
                                  )}
                                </>
                              ))}
                            </TableBody>
                          </Table>
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>1 - 5 of 20</h6>
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
                      <CardHeader color="success">
                        <h4 className={classes.cardTitleWhite}>Approved</h4>
                        <p className={classes.cardCategoryWhite}>
                          Last Updated{' '}
                          {this.props.invoice.dataInvoice[0] === undefined
                            ? '-'
                            : this.props.invoice.dataInvoice[0].updated_at}
                        </p>
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
                              {this.props.invoice.dataInvoice.map((res, i) => (
                                <>
                                  {res.status === 5 ? (
                                    <></>
                                  ) : (
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
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </>
                              ))}
                            </TableBody>
                          </Table>
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>1 - 5 of 20</h6>
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
                        <h4 className={classes.cardTitleWhite}>Rejected</h4>
                        <p className={classes.cardCategoryWhite}>
                          Last Updated{' '}
                          {this.props.invoice.dataInvoice[0] === undefined
                            ? '-'
                            : this.props.invoice.dataInvoice[0].updated_at}
                        </p>
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
                              {this.props.invoice.dataInvoice.map((res, i) => (
                                <>
                                  {res.status === 5 ? (
                                    <></>
                                  ) : (
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
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </>
                              ))}
                            </TableBody>
                          </Table>
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>1 - 5 of 20</h6>
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
                      <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Processed</h4>
                        <p className={classes.cardCategoryWhite}>
                          Last Updated{' '}
                          {this.props.invoice.dataInvoice[0] === undefined
                            ? '-'
                            : this.props.invoice.dataInvoice[0].updated_at}
                        </p>
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
                              {this.props.invoice.dataInvoice.map((res, i) => (
                                <>
                                  {res.status === 5 ? (
                                    <></>
                                  ) : (
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
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </>
                              ))}
                            </TableBody>
                          </Table>
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>1 - 5 of 20</h6>
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
                      <CardHeader color="rose">
                        <h4 className={classes.cardTitleWhite}>Closed</h4>
                        <p className={classes.cardCategoryWhite}>
                          Last Updated{' '}
                          {this.props.invoice.dataInvoice[0] === undefined
                            ? '-'
                            : this.props.invoice.dataInvoice[0].updated_at}
                        </p>
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
                              {this.props.invoice.dataInvoice.map((res, i) => (
                                <>
                                  {res.status === 5 ? (
                                    <></>
                                  ) : (
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
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </>
                              ))}
                            </TableBody>
                          </Table>
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>1 - 5 of 20</h6>
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

const mapDispatchToProps = { listInvoice }

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
