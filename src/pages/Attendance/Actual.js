/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import './Actual.css'
// import { connect } from 'react-redux'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import { TableContainer } from '@material-ui/core'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
// import Button from '@material-ui/core/Button'
// import Fab from '@material-ui/core/Fab'

import moment from 'moment'
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  FormGroup,
} from 'reactstrap'

// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
import Visibility from '@material-ui/icons/Visibility'
// import File from '@material-ui/icons/InsertDriveFile'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import { Cancel, CheckCircle, Print, Sort } from '@material-ui/icons'
import { allLog, exportAllLog } from '../../redux/actions/presence'
import { getDepartment } from '../../redux/actions/department'
import { newToken } from '../../redux/actions/login'

// import Check from '@material-ui/icons/Check'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// core components
// import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class Attendance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoadingExportAllLog: false,
      search: '',
      page: 1,
      showFilterModal: false,
      date: '',
      onTime: '',
    }
    this.fetch = this.fetch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.export = this.export.bind(this)
    this.toggleFilterModal = this.toggleFilterModal.bind(this)
  }

  toggleFilterModal() {
    this.setState({
      showFilterModal: !this.state.showFilterModal,
    })
  }

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      this.fetch()
    }, 100)
  }

  nextPage() {
    if (this.state.page < this.props.presence.infoAllLog.totalPage) {
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
    this.props
      .allLog(this.props.login.token, this.state.search, this.state.page)
      .then((res) => {
        this.props
          .getDepartment(res.action.payload.data.newToken)
          .then((res) => {
            this.setState({ isLoading: false })
            this.props.newToken(res.action.payload.data.newToken)
          })
      })
  }

  export() {
    this.setState({ isLoadingExportAllLog: true })
    this.props.exportAllLog(this.props.login.token).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.action.payload.data]),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `Report-All-User-Attendance_${moment().format('DD-MM-YY')}.pdf`,
      )
      document.body.appendChild(link)
      link.click()
      this.setState({ isLoadingExportAllLog: false })
    })
  }

  redirect() {
    this.props.history.push('/login')
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    // const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)

    const departmentData = this.props.department.dataDepartment
    return (
      <div>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <nav className="navbar navbar-light bg-light d-flex justify-content-end">
              <div className="d-flex flex-row">
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
                <button
                  className="btn btn-danger m-2 my-sm-0"
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
                    {this.state.isLoadingExportAllLog ? (
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
                      <CardHeader color="danger">
                        <div className="d-flex flex-row justify-content-between">
                          <h4 className="col-12 col-sm-12">Attendance</h4>
                          {/* <p className="col-6 col-sm-12">
                            Last Updated{' '}
                            {this.props.presence.dataAllLog[0] === undefined
                              ? '-'
                              : this.props.presence.dataAllLog[0].updated_at}
                          </p> */}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
                          <Table className={classesHead.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <h6>
                                    <strong className="textPrimaryColor">
                                      Name
                                    </strong>
                                  </h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6>
                                    <strong className="textPrimaryColor">
                                      Department
                                    </strong>
                                  </h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6>
                                    <strong className="textPrimaryColor">
                                      Check In
                                    </strong>
                                  </h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6>
                                    <strong className="textPrimaryColor">
                                      Check Out
                                    </strong>
                                  </h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6>
                                    <strong className="textPrimaryColor">
                                      Date
                                    </strong>
                                  </h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6>
                                    <strong className="textPrimaryColor">
                                      On Time
                                    </strong>
                                  </h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6>
                                    <strong className="textPrimaryColor">
                                      Action
                                    </strong>
                                  </h6>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.props.presence.dataAllLog.map((res, i) => (
                                <TableRow
                                  className={classesBody.tableRow}
                                  key={i}
                                >
                                  <TableCell component="th">
                                    {res.nameUser}
                                  </TableCell>
                                  <TableCell component="th">
                                    {res.name}
                                  </TableCell>
                                  <TableCell component="th">
                                    {res.att_time}
                                  </TableCell>
                                  <TableCell component="th">
                                    {res.end_time === null ? '-' : res.end_time}
                                  </TableCell>
                                  <TableCell component="th">
                                    {res.att_date}
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    {res.isLate === 1 ? (
                                      <Tooltip
                                        id="tooltip-top-start"
                                        title="Late"
                                        placement="top"
                                        classes={{
                                          tooltip: classesBody.tooltip,
                                        }}
                                      >
                                        <Cancel className="iconSecondaryColor" />
                                      </Tooltip>
                                    ) : (
                                      <Tooltip
                                        id="tooltip-top-start"
                                        title="On time"
                                        placement="top"
                                        classes={{
                                          tooltip: classesBody.tooltip,
                                        }}
                                      >
                                        <CheckCircle className="iconPrimaryColor" />
                                      </Tooltip>
                                    )}
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    <Link
                                      to={{
                                        pathname: `/admin/attendance/detail`,
                                        state: {
                                          nameUser: `${res.nameUser}`,
                                          name: `${res.name}`,
                                          user_id: `${res.user_id}`,
                                        },
                                      }}
                                    >
                                      <Tooltip
                                        id="tooltip-top-start"
                                        title="Click to Detail"
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
                          <div className="d-flex flex-row justify-content-end">
                            <div className="p-2 d-flex align-items-center align-self-center">
                              <h6>
                                15 of {this.props.presence.infoAllLog.totalData}
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
                            <div>
                              <p>{this.state.page}</p>
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
                        </TableContainer>
                      </CardBody>
                    </>
                  )}
                </Card>
              </GridItem>
            </GridContainer>
          </>
        )}
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
                value={this.state.date}
                type="date"
                name="start_date"
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>End Date</h6>
              <Input
                value={this.state.date}
                type="date"
                name="end_date"
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <FormGroup>
                <h6>On Time</h6>
                <Input
                  value={this.state.onTime}
                  type="select"
                  name="onTime"
                  id="exampleSelect"
                  onChange={this.handleChange}
                >
                  <option key={0} value={0}>
                    NO
                  </option>
                  <option key={1} value={1}>
                    YES
                  </option>
                </Input>
              </FormGroup>
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
              <Button color="secondary" onClick={this.toggleFilterModal}>
                Submit
              </Button>
              {/* )} */}
              <Button color="primary" onClick={this.toggleFilterModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  presence: state.presence,
  login: state.login,
  department: state.department,
})
const mapDispatchToProps = { allLog, exportAllLog, newToken, getDepartment }

export default connect(mapStateToProps, mapDispatchToProps)(Attendance)
