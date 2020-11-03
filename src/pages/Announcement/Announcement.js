/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
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
// import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Close from '@material-ui/icons/Close'
import { connect } from 'react-redux'
import { getAllCampaign } from '../../redux/actions/campaign'
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

class Announcement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingCampaign: true,
    }
    this.fetch = this.fetch.bind(this)
  }

  fetch() {
    this.props.getAllCampaign().then(() => {
      this.setState({ isLoadingCampaign: false })
    })
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              {this.state.isLoadingCampaign ? (
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
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitleWhite}>Announcement</h4>
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
                          <TableCell component="th">Department</TableCell>
                          <TableCell component="th">By</TableCell>
                          <TableCell component="th">Date</TableCell>
                          <TableCell component="th">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.props.campaign.dataCampaign.map(
                          (campaign, index) => (
                            <TableRow className={classes.tableRow} key={index}>
                              <TableCell component="th">
                                {campaign.title}
                              </TableCell>
                              <TableCell component="th">
                                {campaign.description}
                              </TableCell>
                              <TableCell component="th">General</TableCell>
                              <TableCell component="th">
                                {campaign.createdby_name}
                              </TableCell>
                              <TableCell component="th">
                                {campaign.created_at}
                              </TableCell>
                              <TableCell className={classesBody.tableActions}>
                                <Tooltip
                                  id="tooltip-top"
                                  title="Edit Task"
                                  placement="top"
                                  classes={{ tooltip: classesBody.tooltip }}
                                >
                                  <IconButton
                                    aria-label="Edit"
                                    className={classesBody.tableActionButton}
                                  >
                                    <Edit
                                      className={`${classesBody.tableActionButtonIcon} ${classesBody.edit}`}
                                    />
                                  </IconButton>
                                </Tooltip>
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
                                    <Close
                                      className={`${classesBody.tableActionButtonIcon} ${classesBody.close}`}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </CardBody>
                </>
              )}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaign,
})

const mapDispatchToProps = { getAllCampaign }

export default connect(mapStateToProps, mapDispatchToProps)(Announcement)
