import React, { Component } from 'react'
// react plugin for creating charts
// import ChartistGraph from 'react-chartist'
// @material-ui/core
// import { makeStyles } from '@material-ui/core/styles'
// import Icon from '@material-ui/core/Icon'
// @material-ui/icons
// import Store from '@material-ui/icons/Store'
// import Warning from '@material-ui/icons/Warning'
// import DateRange from '@material-ui/icons/DateRange'
// import LocalOffer from '@material-ui/icons/LocalOffer'
// import Update from '@material-ui/icons/Update'
// import ArrowUpward from '@material-ui/icons/ArrowUpward'
// import AccessTime from '@material-ui/icons/AccessTime'
// import Accessibility from '@material-ui/icons/Accessibility'
import BugReport from '@material-ui/icons/BugReport'
import Code from '@material-ui/icons/Code'
import Cloud from '@material-ui/icons/Cloud'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
// import Table from '../../components/Table/Table'
import Tasks from '../../components/Tasks/Tasks'
import CustomTabs from '../../components/CustomTabs/CustomTabs'
// import Danger from '../../components/Typography/Danger'
// import Card from '../../components/Card/Card'
// import CardHeader from '../../components/Card/CardHeader'
// import CardIcon from '../../components/Card/CardIcon'
// import CardBody from '../../components/Card/CardBody'
// import CardFooter from '../../components/Card/CardFooter'

import { bugs, website, server } from '../../variables/general'

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from '../../variables/charts'

// import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'

// const useStyles(){
//   return makeStyles(styles);
// }
export default class Inventory extends Component {
  // useStyles(){
  //   return makeStyles(styles);
  // }
  render() {
    // const classes = makeStyles(styles)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: 'Bugs',
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[]}
                      tasksIndexes={[0]}
                      tasks={bugs}
                    />
                  ),
                },
                {
                  tabName: 'Website',
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  ),
                },
                {
                  tabName: 'Server',
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
