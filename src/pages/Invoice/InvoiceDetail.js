/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './InvoiceDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Print from '@material-ui/icons/Print'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import Paper from '@material-ui/core/Paper'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
// import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Link } from 'react-router-dom'

import moment from 'moment'

// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
// import { Visibility } from '@material-ui/icons'
// import CalendarToday from '@material-ui/icons/CalendarToday'
// import Apartment from '@material-ui/icons/Apartment'
// import AssignmentInd from '@material-ui/icons/AssignmentInd'
// import Assignment from '@material-ui/icons/Assignment'
// import Attachment from '@material-ui/icons/Attachment'
// import CheckCircle from '@material-ui/icons/CheckCircle'
// import Cancel from '@material-ui/icons/Cancel'

// import Check from '@material-ui/icons/Check'
// core components
import { listInvoiceItem, exportInvoiceDetail } from '../../redux/actions/invoice'
import { newToken } from '../../redux/actions/login'

import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
// import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class InvoiceDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingFetch: false,
      isLoadingExportInvoiceDetail: false,
    }
    this.export = this.export.bind(this)
  }

  fetchItem() {
    this.setState({ isLoadingFetch: true })
    this.props
      .listInvoiceItem(this.props.location.state.id, this.props.login.token)
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        this.setState({ isLoadingFetch: false })
      })
  }

  componentDidMount() {
    this.fetchItem()
  }

  export() {
    this.setState({isLoadingExportInvoiceDetail: true})
    this.props.exportInvoiceDetail(this.props.login.token, this.props.location.state.id).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.action.payload.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Report-Invoice-${this.props.location.state.invoice_no}_${moment().format('DD-MM-YY')}.pdf`);
      document.body.appendChild(link);
      link.click();
      this.setState({isLoadingExportInvoiceDetail: false})
    })
  }

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)
    // const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    return (
      <div>
        <nav className="navbar navbar-light bg-light d-flex justify-content-end">
          <div className="d-flex flex-row">
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
                {this.state.isLoadingExportInvoiceDetail ? (
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
              <CardHeader color="danger">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className={classes.cardTitleWhite}>
                    {this.props.location.state.invoice_no}
                  </h4>
                  {/* <p className={classes.cardCategoryWhite}>
                    by {this.props.location.state.requestname}
                  </p> */}
                </div>
              </CardHeader>
              <CardBody>
                <Grid item xs container direction="column" spacing={2}>
                  <TableContainer>
                    <Table aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">
                            <h6 className="textWidthTitle">Item</h6>
                          </TableCell>
                          <TableCell />
                          <TableCell>
                            <h6 className="textWidthTitle">@ Price</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="textWidthTitle">Qty</h6>
                          </TableCell>
                          <TableCell align="right">
                            <h6 className="textWidthTitle">Sum</h6>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
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
                          <>
                            {this.props.invoice.dataInvoiceItem.length < 1 ? (
                              <TableRow>
                                <TableCell align="center">-</TableCell>
                                <TableCell />
                                <TableCell align="center">-</TableCell>
                                <TableCell />
                                <TableCell align="right">Rp. -</TableCell>
                              </TableRow>
                            ) : (
                              <>
                                {this.props.invoice.dataInvoiceItem.map(
                                  (res, i) => (
                                    <TableRow key={i}>
                                      <TableCell align="center">
                                        {res.name}
                                      </TableCell>
                                      <TableCell />
                                      <TableCell>Rp. {res.price}</TableCell>
                                      <TableCell align="center">
                                        {res.qty}
                                      </TableCell>
                                      <TableCell align="right">
                                        Rp. {res.price * res.qty}
                                      </TableCell>
                                    </TableRow>
                                  ),
                                )}
                              </>
                            )}
                            <TableRow>
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell align="right">
                                <h6 className="textWidthTitle">Subtotal</h6>
                              </TableCell>
                              <TableCell align="right">
                                <h6>Rp -</h6>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell align="right">
                                <h6 className="textWidthTitle">Total</h6>
                              </TableCell>
                              <TableCell align="right">
                                <h6>
                                  Rp {this.props.location.state.total_amount}
                                </h6>
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <Grid item xs>
                    <ListItem className="listItemWidth">
                      <ListItemText>
                        <Typography variant="subtitle1">Item List</Typography>
                      </ListItemText>
                    </ListItem>

                    <Typography variant="body2" className="textPrimaryColor">
                      {this.props.location.state.note}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Paper elevation={2} className="d-flex flex-row p-3">
                      <ListItem>
                        <ListItemIcon>
                          <Attachment edge="start" />
                        </ListItemIcon>
                        <ListItemText>file.pdf</ListItemText>
                        <ListItemIcon>
                          <Cancel edge="end" className="CancelColor" />
                          <CheckCircle
                            edge="end"
                            className="CheckCircleColor"
                          />
                        </ListItemIcon>
                      </ListItem>
                    </Paper>
                  </Grid> */}
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
                <Link
                  to="/admin/invoice"
                  className="btn btn-block btn-outline-danger mt-5"
                >
                  Close
                </Link>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  invoice: state.invoice,
  login: state.login,
})
const mapDispatchToProps = { listInvoiceItem, exportInvoiceDetail, newToken }

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail)
