/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// react plugin for creating charts
import ChartistGraph from 'react-chartist'
import 'chartist/dist/chartist.min.css'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
// import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import Store from '@material-ui/icons/Store'
// import Warning from '@material-ui/icons/Warning'
import Update from '@material-ui/icons/Update'
// import ArrowUpward from '@material-ui/icons/ArrowUpward'
import AccessTime from '@material-ui/icons/AccessTime'
import Accessibility from '@material-ui/icons/Accessibility'
import { connect } from 'react-redux'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
// import Danger from '../../components/Typography/Danger'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardIcon from '../../components/Card/CardIcon'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  reportAttendanceChart,
} from '../../variables/charts'

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'

// const useStyles(){
//   return makeStyles(styles);
// }
class ActualDashboard extends Component {
  constructor(props) {
    super(props)
    this.redirect = this.redirect.bind(this)
  }

  redirect() {
    this.props.history.push('/login')
  }

  // useStyles(){
  //   return makeStyles(styles);
  // }
  render() {
    const classes = makeStyles(styles)
    return (
      <>
        {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <div>
            <GridContainer>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Store />
                    </CardIcon>
                    <p className={classes.cardCategory}>Revenue</p>
                    <h3 className={classes.cardTitle}>
                      {/* 49/50 <small>GB</small> */}
                      00
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Update />
                      Just Updated
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Store />
                    </CardIcon>
                    <p className={classes.cardCategory}>Revenue</p>
                    <h3 className={classes.cardTitle}>00</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Update />
                      Just Updated
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Store />
                    </CardIcon>
                    <p className={classes.cardCategory}>Revenue</p>
                    <h3 className={classes.cardTitle}>00</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Update />
                      Just Updated
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Accessibility />
                    </CardIcon>
                    <p className={classes.cardCategory}>Revenue</p>
                    <h3 className={classes.cardTitle}>00</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Update />
                      Just Updated
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Completed Tasks</h4>
                  </CardHeader>
                  <CardBody>
                    <ChartistGraph
                      className="ct-chart"
                      data={dailySalesChart.data}
                      type="Line"
                      options={dailySalesChart.options}
                      listener={dailySalesChart.animation}
                    />

                    <p className={classes.cardCategory}>
                      {/* <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} />{' '}
                        55%
                      </span>{' '}
                      increase in today sales. */}
                      Last Campaign Performance
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> updated 1 minutes ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Completed Tasks</h4>
                  </CardHeader>
                  <CardBody>
                    <ChartistGraph
                      className="ct-chart"
                      data={emailsSubscriptionChart.data}
                      type="Bar"
                      options={emailsSubscriptionChart.options}
                      responsiveOptions={
                        emailsSubscriptionChart.responsiveOptions
                      }
                      listener={emailsSubscriptionChart.animation}
                    />

                    <p className={classes.cardCategory}>
                      Last Campaign Performance
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> updated 1 minutes ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Completed Tasks</h4>
                  </CardHeader>
                  <CardBody>
                    <ChartistGraph
                      className="ct-chart"
                      data={completedTasksChart.data}
                      type="Line"
                      options={completedTasksChart.options}
                      listener={completedTasksChart.animation}
                    />

                    <p className={classes.cardCategory}>
                      Last Campaign Performance
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> updated 1 minutes ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Completed Tasks</h4>
                  </CardHeader>
                  <CardBody>
                    <ChartistGraph
                      data={reportAttendanceChart.data}
                      type="Pie"
                      options={reportAttendanceChart.options}
                    />
                  </CardBody>
                  <CardFooter chart></CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Completed Tasks</h4>
                  </CardHeader>
                  <CardBody>
                    <ChartistGraph
                      data={reportAttendanceChart.data}
                      type="Pie"
                      options={reportAttendanceChart.options}
                    />
                  </CardBody>
                  <CardFooter chart></CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitle}>Completed Tasks</h4>
                  </CardHeader>
                  <CardBody>
                    <ChartistGraph
                      data={reportAttendanceChart.data}
                      type="Pie"
                      options={reportAttendanceChart.options}
                    />
                  </CardBody>
                  <CardFooter chart></CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
})

export default connect(mapStateToProps, null)(ActualDashboard)
