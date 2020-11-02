import React, { Component } from 'react'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Table from '../../components/Table/Table'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'

// const useStyles(){
//   return makeStyles(styles);
// }
export default class Attendance extends Component {
  // useStyles(){
  //   return makeStyles(styles);
  // }
  render() {
    const classes = makeStyles(styles)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Attendance Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  Last Updated 11/11/2020
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="danger"
                  tableHead={[
                    'ID',
                    'Name',
                    'Check In',
                    'Check Out',
                    'Monthly Stat',
                  ]}
                  tableData={[
                    ['1', 'Dakota Rice', '08.45', '17.45', '24/31'],
                    ['2', 'Minerva Hooper', '08.45', '17.45', '24/31'],
                    ['3', 'Sage Rodriguez', '08.45', '17.45', '24/31'],
                    ['4', 'Philip Chaney', '08.45', '17.45', '24/31'],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
