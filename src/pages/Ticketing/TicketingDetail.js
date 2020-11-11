/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Rate from 'rc-rate'
import 'rc-rate/assets/index.css'
// import { connect } from 'react-redux'
import './TicketingDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
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
import { connect } from 'react-redux'
import { getTicketScore } from '../../redux/actions/ticket'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
// import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
// import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class TicketingDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: props.location.state.date,
      id: props.location.state.id,
      assignId: props.location.state.assignId,
      no_ticket: props.location.state.no_ticket,
      title: props.location.state.title,
      nameFrom: props.location.state.nameFrom,
      nameAssign: props.location.state.nameAssign,
      end_date: props.location.state.end_date,
      description: props.location.state.description,
      // statusid: props.location.state.statusid,
      isLoading: false,
    }
  }

  fetchScore() {
    this.setState({ isLoading: true })
    this.props.getTicketScore(this.state.id, this.state.assignId).then(() => {
      this.setState({ isLoading: false })
    })
  }

  componentDidMount() {
    this.fetchScore()
  }

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
                <h4 className={classes.cardTitleWhite}>Ticketing Detail</h4>
                <p className={classes.cardCategoryWhite}>{this.state.date}</p>
              </CardHeader>
              <CardBody>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <ListItem className="listItemWidth">
                      <ListItemText>
                        <h2>{this.state.no_ticket}</h2>
                        <h5>{this.state.title}</h5>
                      </ListItemText>
                    </ListItem>
                    <ListItem className="textBodyRow">
                      <h6 className="textBodyBold">From : </h6>
                      <h6> {this.state.nameFrom}</h6>
                    </ListItem>
                    <ListItem className="textBodyRow">
                      <h6 className="textBodyBold">To : </h6>
                      <h6> {this.state.nameAssign}</h6>
                    </ListItem>
                    <ListItem className="textBodyRow">
                      <h6 className="textBodyBold">End Date : </h6>
                      <h6> {this.state.end_date}</h6>
                    </ListItem>
                    <Typography variant="body2" className="paperGridCentre">
                      <p className="textPrimaryColor">
                        {this.state.description}
                      </p>
                    </Typography>
                  </Grid>
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
                      {this.props.ticket.dataTicketScore[0] === undefined ? (
                        <Grid item xs>
                          <Paper
                            elevation={2}
                            className="d-flex flex-row p-3 justify-content-center"
                          >
                            <Grid xs={12} sm={12} md={4}>
                              <h6 className="d-flex justify-content-center textBodyBoldRate">
                                {' '}
                                Rate{' '}
                              </h6>
                              <div className="d-flex justify-content-center">
                                <Rate
                                  defaultValue={0}
                                  disabled
                                  style={{ fontSize: '50px' }}
                                />
                              </div>
                            </Grid>
                            <Grid xs={12} sm={12} md={8}>
                              <h6 className="textBodyBold">Feedback </h6>
                              <Typography
                                variant="body2"
                                className="paperGridCentre"
                              >
                                No Feedback Available
                              </Typography>
                            </Grid>
                          </Paper>
                        </Grid>
                      ) : (
                        <Grid item xs>
                          <Paper
                            elevation={2}
                            className="d-flex flex-row p-3 justify-content-center"
                          >
                            <Grid xs={12} sm={12} md={4}>
                              <h6 className="d-flex justify-content-center textBodyBoldRate">
                                {' '}
                                Rate{' '}
                              </h6>
                              <div className="d-flex justify-content-center">
                                <Rate
                                  defaultValue={
                                    this.props.ticket.dataTicketScore[0].score
                                  }
                                  disabled
                                  style={{ fontSize: '50px' }}
                                />
                              </div>
                            </Grid>
                            <Grid xs={12} sm={12} md={8}>
                              <h6 className="textBodyBold">Feedback </h6>
                              <Typography
                                variant="body2"
                                className="paperGridCentre"
                              >
                                {this.props.ticket.dataTicketScore[0].feedback}
                              </Typography>
                            </Grid>
                          </Paper>
                        </Grid>
                      )}
                    </>
                  )}
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ticket: state.ticket,
})
const mapDispatchToProps = { getTicketScore }

export default connect(mapStateToProps, mapDispatchToProps)(TicketingDetail)
