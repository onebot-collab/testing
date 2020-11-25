/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import './PermissionsDetail.css'
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
import Apartment from '@material-ui/icons/Apartment'
import AssignmentInd from '@material-ui/icons/AssignmentInd'
import Assignment from '@material-ui/icons/Assignment'
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

export default class PermissionsDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.location.state.name,
      status: props.location.state.status,
      type: props.location.state.type,
      department: props.location.state.department,
      startdate: props.location.state.startdate,
      enddate: props.location.state.enddate,
      name_tosend: props.location.state.name_tosend,
      file: props.location.state.file,
      reason: props.location.state.reason,
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
                <h4 className={classes.cardTitleWhite}>Permissions Detail</h4>
              </CardHeader>
              <CardBody>
                <Grid item xs container direction="column">
                  <Grid item xs>
                    <ListItem className="listItemWidth">
                      <ListItemText>
                        <Typography variant="subtitle1">
                          {this.state.name}
                          <p className={classes.cardCategoryWhite}>
                            {this.state.startdate} - {this.state.enddate}
                          </p>
                        </Typography>
                      </ListItemText>
                      <ListItemIcon>
                        {this.state.status === '0' ? (
                          <span
                            edge="end"
                            className="badge badge-pill badge-warning"
                          >
                            Waiting
                          </span>
                        ) : this.state.status === '1' ? (
                          <span
                            edge="end"
                            className="badge badge-pill badge-success"
                          >
                            Approved
                          </span>
                        ) : (
                          <span
                            edge="end"
                            className="badge badge-pill badge-danger"
                          >
                            Rejected
                          </span>
                        )}
                      </ListItemIcon>
                    </ListItem>
                    <ListItem>
                      {/* <ListItemIcon>
                        <CalendarToday style={{ color: '#feb952' }} />
                      </ListItemIcon>
                      <ListItemText>
                        {this.state.startdate} - {this.state.enddate}
                      </ListItemText> */}
                      <ListItemIcon>
                        <Apartment style={{ color: '#feb952' }} />
                      </ListItemIcon>
                      <ListItemText>{this.state.department}</ListItemText>
                      <ListItemIcon>
                        <Assignment style={{ color: '#feb952' }} />
                      </ListItemIcon>
                      <ListItemText>{this.state.type}</ListItemText>
                      <ListItemIcon>
                        <AssignmentInd style={{ color: '#feb952' }} />
                      </ListItemIcon>
                      <ListItemText>{this.state.name_tosend}</ListItemText>
                    </ListItem>

                    <Typography variant="body2" className="paperGridCentre">
                      <p className="textPrimaryColor">{this.state.reason}</p>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Paper elevation={2} className="d-flex flex-row p-3">
                      <ListItem>
                        <ListItemIcon>
                          <Attachment edge="start" />
                        </ListItemIcon>
                        <ListItemText>
                          {this.state.file === 'izin/img.jpg' ? (
                            'No fle uploaded'
                          ) : (
                            <a
                              href={`http://10.7.1.38:5000/${this.state.file}`}
                              target="_blank"
                            >
                              {this.state.file.replace('izin/', '')}
                            </a>
                          )}
                        </ListItemText>
                        <ListItemIcon>
                          {this.state.file === 'izin/img.jpg' ? (
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
                    to="/admin/permissions"
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
