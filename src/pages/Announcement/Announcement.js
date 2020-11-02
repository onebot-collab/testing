import React, { Component } from 'react'
// import { connect } from 'react-redux'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
// import Fab from '@material-ui/core/Fab'

// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
// import Check from '@material-ui/icons/Check'
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

export default class Announcement extends Component {
  componentDidMount() {}

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Announcement Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  Last Updated 11/11/2020
                </p>
              </CardHeader>
              <CardBody>
                <Table className={classesHead.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell component="th">Title</TableCell>
                      <TableCell component="th">Description</TableCell>
                      <TableCell component="th">Created By</TableCell>
                      <TableCell component="th">Department</TableCell>
                      <TableCell component="th">Create At</TableCell>
                      <TableCell component="th">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={classes.tableRow}>
                      <TableCell component="th">Welcome</TableCell>
                      <TableCell component="th">Welcome to GMI</TableCell>
                      <TableCell component="th">Samantha</TableCell>
                      <TableCell component="th">General</TableCell>
                      <TableCell component="th">11/11/2020</TableCell>
                      <TableCell className={classesBody.tableActions}>
                        <Tooltip
                          id="tooltip-top-start"
                          title="Remove"
                          placement="top"
                          classes={{ tooltip: classesBody.tooltip }}
                        >
                          <IconButton
                            aria-label="Close"
                            className={classesBody.tableActionButton}
                          >
                            <Delete
                              className={`${classesBody.tableActionButtonIcon} ${classesBody.close}`}
                            />
                          </IconButton>
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

// const mapStateToProps = state => ({ events: state.events })

// const mapDispatchToProps = {}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Announcement)
