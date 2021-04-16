/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
import 'react-pro-sidebar/dist/css/styles.css'
import './Report.css'
import { makeStyles } from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import { Link } from 'react-router-dom'
// import Fab from '@material-ui/core/Fab'

// @material-ui/icons
// import Add from '@material-ui/icons/Add'
import Visibility from '@material-ui/icons/Visibility'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Sort from '@material-ui/icons/Sort'

// Add Reactstrap
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from 'reactstrap'
import Select from 'react-select'

import { getAllReport } from '../../redux/actions/report'
import { newToken } from '../../redux/actions/login'
import { getDepartment } from '../../redux/actions/department'
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

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddModal: false,
      isLoading: true,
      search: '',
      page: 1,
      showFilterModal: false,
      filterDepartment: '',
      filterStartDate: '',
      filterEndDate: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.fetch = this.fetch.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleFilterModal = this.toggleFilterModal.bind(this)
  }

  toggleFilterModal() {
    this.setState({
      showFilterModal: !this.state.showFilterModal,
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleDepartmentChange(e) {
    this.setState({ filterDepartment: e.value })
  }

  redirect() {
    this.props.history.push('/login')
  }

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      this.fetch()
    }, 100)
  }

  nextPage() {
    if (this.state.page < this.props.report.infoAllReport.totalPage) {
      this.setState({ page: this.state.page + 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    }
  }

  prevPage() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
      setTimeout(() => {
        this.fetch()
      }, 100)
    }
  }

  fetch() {
    this.setState({ isLoading: true, showFilterModal: false })
    const { filterDepartment, filterStartDate, filterEndDate } = this.state
    this.props
      .getAllReport(
        this.props.login.token,
        this.state.search,
        this.state.page,
        filterDepartment,
        filterStartDate,
        filterEndDate,
      )
      .then((res) => {
        this.props
          .getDepartment(res.action.payload.data.newToken)
          .then((res) => {
            this.setState({ isLoading: false })
            this.props.newToken(res.action.payload.data.newToken)
          })
      })
  }

  toggleAddModal() {
    this.setState({
      showAddModal: !this.state.showAddModal,
    })
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    const departmentData = this.props.department.dataDepartment
    return (
      <div>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
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
                      <CardHeader>
                        <nav className="navbar d-flex justify-content-end">
                          <form className="form-inline mr-5">
                            <input
                              className="form-control mr-sm-2"
                              type="search"
                              name="search"
                              onChange={this.handleSearch}
                              placeholder="Type Something ..."
                              aria-label="Search"
                            ></input>
                            <button
                              className="btn btn-outline-danger my-2 my-sm-0"
                              type="submit"
                            >
                              Search
                            </button>
                          </form>
                          <button
                            className="btn btn-danger m-2 my-sm-0"
                            type="submit"
                            onClick={this.toggleFilterModal}
                          >
                            <Tooltip
                              id="tooltip-top-start"
                              title="Filter"
                              placement="top"
                              classes={{
                                tooltip: classesBody.tooltip,
                              }}
                            >
                              {this.state.isLoadingExportAllLog ? (
                                <div
                                  className="spinner-border spinner-border-sm text-white"
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              ) : (
                                <Sort className="iconWhiteColor" />
                              )}
                            </Tooltip>
                          </button>
                        </nav>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
                          <Table className={classesHead.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      Name
                                    </strong>
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      Description
                                    </strong>
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      Attachment
                                    </strong>
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      Created At
                                    </strong>
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      Action
                                    </strong>
                                  </h5>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.props.report.dataAllReport.map((res, i) => (
                                <TableRow className={classes.tableRow} key={i}>
                                  <TableCell component="th" size="small">
                                    {res.nameUser}
                                  </TableCell>
                                  <TableCell component="th" size="small">
                                    {res.nameReport}
                                  </TableCell>
                                  <TableCell component="th" size="small">
                                    {res.fileName ===
                                    'public/report/img.jpg' ? (
                                      <span className="badge badge-secondary">
                                        No Attachment
                                      </span>
                                    ) : (
                                      <span className="badge badge-success">
                                        {res.fileName.replace(
                                          'public/report/',
                                          '',
                                        )}
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell component="th" size="small">
                                    {res.created_at}
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                    size="small"
                                  >
                                    <Link
                                      to={{
                                        pathname: `/admin/report/${res.reportId}`,
                                        state: {
                                          id: `${res.reportId}`,
                                          nameUser: `${res.nameUser}`,
                                          created_at: `${res.created_at}`,
                                          nameReport: `${res.nameReport}`,
                                          fileName: `${res.fileName}`,
                                          fileName2: `${res.fileName2}`,
                                          fileName3: `${res.fileName3}`,
                                        },
                                      }}
                                    >
                                      <Tooltip
                                        id="tooltip-top-start"
                                        title="Click to Report"
                                        placement="top"
                                        classes={{
                                          tooltip: classesBody.tooltip,
                                        }}
                                      >
                                        <Visibility className="iconWhiteColor" />
                                      </Tooltip>
                                    </Link>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <div className="d-flex flex-row justify-content-end">
                          <div className="p-2 d-flex align-items-center align-self-center">
                            <h6>
                              15 of {this.props.report.infoAllReport.totalData}
                            </h6>
                          </div>
                          <div className="p-2">
                            <IconButton onClick={this.prevPage}>
                              <ArrowLeft
                                className="iconWhiteColor"
                                fontSize="large"
                              />
                            </IconButton>
                          </div>
                          <div className="d-flex align-items-center">
                            {this.state.page}
                          </div>
                          <div className="p-2">
                            <IconButton onClick={this.nextPage}>
                              <ArrowRight
                                className="iconWhiteColor"
                                fontSize="large"
                              />
                            </IconButton>
                          </div>
                        </div>
                      </CardBody>
                    </>
                  )}
                </Card>
              </GridItem>
            </GridContainer>
            {/* Filter Modal */}
            <Modal isOpen={this.state.showFilterModal}>
              <ModalHeader className="h1">Add Filter</ModalHeader>
              <Form>
                <ModalBody>
                  <h6>Department</h6>
                  {this.state.isLoading ? (
                    <></>
                  ) : (
                    <Select
                      onChange={this.handleDepartmentChange}
                      options={departmentData.map((res) => ({
                        value: res.id,
                        label: res.name,
                      }))}
                    />
                  )}
                  <h6>Start Date</h6>
                  <Input
                    value={this.state.filterStartDate}
                    type="date"
                    name="filterStartDate"
                    className="mb-2 shadow-none"
                    onChange={this.handleChange}
                  />
                  <h6>End Date</h6>
                  <Input
                    value={this.state.filterEndDate}
                    type="date"
                    name="filterEndDate"
                    className="mb-2 shadow-none"
                    onChange={this.handleChange}
                  />
                </ModalBody>
                <ModalFooter>
                  {/* {this.state.isLoadingAddCampaign ? (
                <Button color="primary">
                  <div
                    className="spinner-border spinner-border-sm text-danger"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </Button>
              ) : ( */}
                  <Button color="secondary" onClick={this.fetch}>
                    Submit
                  </Button>
                  {/* )} */}
                  <Button color="primary" onClick={this.toggleFilterModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </Modal>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  report: state.report,
  department: state.department,
})

const mapDispatchToProps = { getAllReport, newToken, getDepartment }

export default connect(mapStateToProps, mapDispatchToProps)(Report)
