/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import './ReportDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
// import { Visibility } from '@material-ui/icons'
// import CalendarToday from '@material-ui/icons/CalendarToday'
// import Apartment from '@material-ui/icons/Apartment'
// import AssignmentInd from '@material-ui/icons/AssignmentInd'
// import Assignment from '@material-ui/icons/Assignment'
import Attachment from '@material-ui/icons/Attachment'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Cancel from '@material-ui/icons/Cancel'

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

export default class ReportDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameUser: props.location.state.nameUser,
      // created_at: props.location.state.created_at,
      nameReport: props.location.state.nameReport,
      fileName: props.location.state.fileName,
      // fileName2: props.location.state.fileName2,
      // fileName3: props.location.state.fileName3,
    }
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
                <div className="d-flex flex-row justify-content-between">
                  <h4 className={classes.cardTitleWhite}>Report Detail</h4>
                  {/* <p className={classes.cardCategoryWhite}>
                    Created at {this.state.created_at.slice(0, 10)}
                  </p> */}
                </div>
              </CardHeader>
              <CardBody>
                <Grid item xs container direction="column">
                  <Grid item xs>
                    <ListItem className="listItemWidth">
                      <ListItemText>
                        <Typography variant="subtitle1">
                          by {this.state.nameUser}
                        </Typography>
                      </ListItemText>
                    </ListItem>

                    <Typography variant="body2" className="paperGridCentre">
                      <p className="textPrimaryColor">
                        {this.state.nameReport}
                      </p>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Paper
                      // onClick={() => window.location.href('/admin')}
                      href="www.google.com"
                      elevation={2}
                      className="d-flex flex-row p-3"
                    >
                      <ListItem>
                        <ListItemIcon>
                          <Attachment edge="start" />
                        </ListItemIcon>
                        <ListItemText>
                          <a
                            target="_blank"
                            href={`http://10.5.1.38:5000/${this.state.fileName}`}
                          >
                            {this.state.fileName.replace('report/', '')}
                          </a>
                        </ListItemText>
                        <ListItemIcon>
                          {this.state.fileName === 'report/file.pdf' ? (
                            <Cancel edge="end" className="CancelColor" />
                          ) : (
                            <CheckCircle
                              edge="end"
                              className="CheckCircleColor"
                            />
                          )}
                        </ListItemIcon>
                      </ListItem>
                    </Paper>
                  </Grid>
                  {/* <Grid item xs>
                    <Paper
                      // onClick={() => window.location.href('/admin')}
                      href="www.google.com"
                      elevation={2}
                      className="d-flex flex-row p-3"
                    >
                      <ListItem>
                        <ListItemIcon>
                          <Attachment edge="start" />
                        </ListItemIcon>
                        <ListItemText>
                          <a
                            target="_blank"
                            href={`http://10.5.1.38:5000/${this.state.fileName2}`}
                          >
                            {this.state.fileName2.replace('report/', '')}
                          </a>
                        </ListItemText>
                        <ListItemIcon>
                          {this.state.fileName2 === 'report/file.pdf' ? (
                            <Cancel edge="end" className="CancelColor" />
                          ) : (
                            <CheckCircle
                              edge="end"
                              className="CheckCircleColor"
                            />
                          )}
                        </ListItemIcon>
                      </ListItem>
                    </Paper>
                  </Grid> */}
                  {/* <Grid item xs>
                    <Paper
                      // onClick={() => window.location.href('/admin')}
                      href="www.google.com"
                      elevation={2}
                      className="d-flex flex-row p-3"
                    >
                      <ListItem>
                        <ListItemIcon>
                          <Attachment edge="start" />
                        </ListItemIcon>
                        <ListItemText>
                          <a
                            target="_blank"
                            href={`http://10.5.1.38:5000/${this.state.fileName3}`}
                          >
                            {this.state.fileName3.replace('report/', '')}
                          </a>
                        </ListItemText>
                        <ListItemIcon>
                          {this.state.fileName3 === 'report/file.pdf' ? (
                            <Cancel edge="end" className="CancelColor" />
                          ) : (
                            <CheckCircle
                              edge="end"
                              className="CheckCircleColor"
                            />
                          )}
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
                  <Link
                    to="/admin/report"
                    className="btn btn-block btn-outline-danger mt-4"
                  >
                    Close
                  </Link>
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
