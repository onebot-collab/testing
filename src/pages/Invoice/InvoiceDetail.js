/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import './InvoiceDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import Paper from '@material-ui/core/Paper'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
// import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
// import { Link } from 'react-router-dom'

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
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
// import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
// import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

export default class InvoiceDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)
    // const classesHead = makeStyles(stylesHead)
    // const classesBody = makeStyles(stylesBody)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>
                  {this.props.location.state.invoice_no}
                </h4>
                <p className={classes.cardCategoryWhite}>
                  by {this.props.location.state.requestname}
                </p>
              </CardHeader>
              <CardBody>
                <Grid item xs container direction="column" spacing={2}>
                  <Table aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={3}>
                          <h5>Details</h5>
                        </TableCell>
                        <TableCell />
                        <TableCell align="right">
                          <h5>Price</h5>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <h6>Desc</h6>
                        </TableCell>
                        <TableCell />
                        <TableCell align="center">
                          <h6>Qty</h6>
                        </TableCell>
                        <TableCell />
                        <TableCell align="right">
                          <h6>Sum</h6>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">MAC</TableCell>
                        <TableCell />
                        <TableCell align="center">4</TableCell>
                        <TableCell />
                        <TableCell align="right">Rp .10000000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell align="right">
                          <h6>Subtotal</h6>
                        </TableCell>
                        <TableCell align="right">
                          <h6>Rp 1000000</h6>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell align="right">
                          <h6>Total</h6>
                        </TableCell>
                        <TableCell align="right">
                          <h6>Rp 1000000</h6>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
