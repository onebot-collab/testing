/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
// import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
// import Fab from '@material-ui/core/Fab'

// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
import { Visibility } from '@material-ui/icons'
// import Delete from '@material-ui/icons/Delete'

// import Check from '@material-ui/icons/Check'

// redux
import { getInventoryHome } from '../../redux/actions/inventory'

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

class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  fetch() {
    this.props.getInventoryHome().then(() => {
      this.setState({ isLoading: false })
    })
  }

  redirect() {
    this.props.history.push('/login')
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    return (
      <>
        {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <div>
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
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="danger">
                      <h4 className={classes.cardTitleWhite}>Inventory</h4>
                      <p className={classes.cardCategoryWhite}>
                        Last Updated{' '}
                        {this.props.inventory.dataInventory[0] === undefined
                          ? '-'
                          : this.props.inventory.dataInventory[0].created_at}
                      </p>
                    </CardHeader>
                    <CardBody>
                      <Table className={classesHead.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell component="th">Image</TableCell>
                            <TableCell component="th">Name</TableCell>
                            <TableCell component="th">Brand</TableCell>
                            <TableCell component="th">Created Date</TableCell>
                            <TableCell component="th">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.props.inventory.dataInventory.map((res, i) => (
                            <TableRow className={classes.tableRow} key={i}>
                              <TableCell
                                component="th"
                                className={classesBody.tablePicture}
                              >
                                <Avatar
                                  src={`http://10.5.1.38:5000/${res.image_url}`}
                                />
                              </TableCell>
                              <TableCell component="th">{res.name}</TableCell>
                              <TableCell component="th">{res.brand}</TableCell>
                              <TableCell component="th">{res.date}</TableCell>
                              <TableCell className={classesBody.tableActions}>
                                <Tooltip
                                  id="tooltip-top-start"
                                  title="Delete"
                                  placement="top"
                                  classes={{ tooltip: classesBody.tooltip }}
                                >
                                  <Visibility
                                    className={classesBody.CheckCircle}
                                  />
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            )}
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  inventory: state.inventory,
  login: state.login,
})

const mapDispatchToProps = { getInventoryHome }

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
