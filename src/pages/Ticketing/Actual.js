import React, { Component } from 'react'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
// import Icon from '@material-ui/core/Icon'
// import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
// import Badge from '@material-ui/core/Badge'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
// import Fab from '@material-ui/core/Fab'
// @material-ui/icons
import Store from '@material-ui/icons/Store'
// import Warning from '@material-ui/icons/Warning'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Visibility from '@material-ui/icons/Visibility'
import Accessibility from '@material-ui/icons/Accessibility'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'

// import Danger from '../../components/Typography/Danger'
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'
import CardIcon from '../../components/Card/CardIcon'
import CardFooter from '../../components/Card/CardFooter'

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

// const useStyles(){
//   return makeStyles(styles);
// }
export default class Ticketing extends Component {
  // useStyles(){
  //   return makeStyles(styles);
  // }
  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Department</p>
                <h3 className={classes.cardTitle}>00</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>Department</div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Observer</p>
                <h3 className={classes.cardTitle}>00</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>Observer</div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Received</p>
                <h3 className={classes.cardTitle}>00</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>Received</div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Sent</p>
                <h3 className={classes.cardTitle}>00</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>Sent</div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Ticketing Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  Last Updated 11/11/2020
                </p>
              </CardHeader>
              <CardBody>
                <Table className={classesHead.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell component="th">No</TableCell>
                      <TableCell component="th">Requester</TableCell>
                      <TableCell component="th">Assign To</TableCell>
                      <TableCell component="th">Observer</TableCell>
                      <TableCell component="th">Status</TableCell>
                      <TableCell component="th">Is Late</TableCell>
                      <TableCell component="th">Created At</TableCell>
                      <TableCell component="th">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={classesBody.tableRow}>
                      <TableCell component="th">1-GMI-11-11-2020</TableCell>
                      <TableCell component="th">Samantha</TableCell>
                      <TableCell component="th">John</TableCell>
                      <TableCell component="th">Marsha</TableCell>
                      <TableCell component="th">
                        <span className="badge badge-pill badge-warning">
                          Waiting
                        </span>
                        <span className="badge badge-pill badge-danger">
                          Rejected
                        </span>
                        <span className="badge badge-pill badge-success">
                          Approved
                        </span>
                        <span className="badge badge-pill badge-primary">
                          Processed
                        </span>
                        <span className="badge badge-pill badge-dark">
                          Closed
                        </span>
                      </TableCell>
                      <TableCell className={classesBody.tableActions}>
                        <Tooltip
                          id="tooltip-top-start"
                          title="Out time"
                          placement="top"
                          classes={{ tooltip: classesBody.tooltip }}
                        >
                          <CheckCircle className={classesBody.CheckCircle} />
                        </Tooltip>
                      </TableCell>
                      <TableCell component="th">11/11/2020</TableCell>
                      <TableCell className={classesBody.tableActions}>
                        <Tooltip
                          id="tooltip-top-start"
                          title="Click to Detail"
                          placement="top"
                          classes={{ tooltip: classesBody.tooltip }}
                        >
                          <Visibility className={classesBody.CheckCircle} />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
