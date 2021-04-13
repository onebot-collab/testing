/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ReportDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

// @material-ui/icons
import Attachment from '@material-ui/icons/Attachment'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Cancel from '@material-ui/icons/Cancel'
import Print from '@material-ui/icons/Print'

import moment from 'moment'

// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

import { exportReportDetail } from '../../redux/actions/report'
// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
// import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class ReportDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingExportReportDetail: false,
      nameUser: props.location.state.nameUser,
      // created_at: props.location.state.created_at,
      nameReport: props.location.state.nameReport,
      fileName: props.location.state.fileName,
    }
    this.export = this.export.bind(this)
  }

  export() {
    this.setState({ isLoadingExportReportDetail: true })
    this.props
      .exportReportDetail(this.props.login.token, this.props.location.state.id)
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.action.payload.data]),
        )
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
          'download',
          `Report-Report-Detail-${this.props.location.state.id}-${
            this.props.location.state.id
          }_${moment().format('DD-MM-YY')}.pdf`,
        )
        document.body.appendChild(link)
        link.click()
        this.setState({ isLoadingExportReportDetail: false })
      })
  }

  componentDidMount() {}

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)
    // const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    return (
      <div>
        <nav className="navbar navbar-light bg-light d-flex justify-content-end">
          <div className="d-flex flex-row">
            <button
              className="btn btn-danger my-2 my-sm-0"
              type="submit"
              onClick={this.export}
            >
              <Tooltip
                id="tooltip-top-start"
                title="Export to PDF"
                placement="top"
                classes={{
                  tooltip: classesBody.tooltip,
                }}
              >
                {this.state.isLoadingExportReportDetail ? (
                  <div
                    className="spinner-border spinner-border-sm text-white"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <Print className="iconWhiteColor" />
                )}
              </Tooltip>
            </button>
          </div>
        </nav>
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
                          {this.state.fileName === 'public/report/img.jpg' ? (
                            'No Attachment'
                          ) : (
                            <>
                              <a
                                target="_blank"
                                href={`http://10.7.9.6:8443/node/${this.state.fileName}?boAgRwlfX5=${this.props.login.token}`}
                              >
                                {this.state.fileName.replace(
                                  'public/report/',
                                  '',
                                )}
                              </a>
                            </>
                          )}
                        </ListItemText>
                        <ListItemIcon>
                          {this.state.fileName === 'public/report/img.jpg' ? (
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

const mapStateToProps = (state) => ({
  login: state.login,
  report: state.report,
})
const mapDispatchToProps = { exportReportDetail }

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail)
