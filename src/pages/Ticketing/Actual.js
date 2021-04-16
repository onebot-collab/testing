/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import './Actual.css'
// import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
// import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import { Link } from 'react-router-dom'
// import Fab from '@material-ui/core/Fab'
// @material-ui/icons
import Store from '@material-ui/icons/Store'
// import Warning from '@material-ui/icons/Warning'
// import Add from '@material-ui/icons/Add'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Cancel from '@material-ui/icons/Cancel'
import Visibility from '@material-ui/icons/Visibility'
import Accessibility from '@material-ui/icons/Accessibility'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Print from '@material-ui/icons/Print'
import Sort from '@material-ui/icons/Sort'

import moment from 'moment'

// Add Reactstrap
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  FormGroup,
} from 'reactstrap'
import Select from 'react-select'

import {
  getAllTicket,
  getTicketStats,
  exportAllTicket,
} from '../../redux/actions/ticket'
import { newToken } from '../../redux/actions/login'
import { getDepartment } from '../../redux/actions/department'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'

// import Danger from '../../components/Typography/Danger'
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'
import CardIcon from '../../components/Card/CardIcon'

import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

// const useStyles(){
//   return makeStyles(styles);
// }

class Ticketing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoadingStats: true,
      isLoadingExportAllTicket: false,
      search: '',
      page: 1,
      showFilterModal: false,
      filterDepartment: '',
      filterStartDate: '',
      filterEndDate: '',
      filterStatus: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.export = this.export.bind(this)
    this.toggleFilterModal = this.toggleFilterModal.bind(this)
    this.fetch = this.fetch.bind(this)
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

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      this.fetch()
    }, 100)
  }

  nextPage() {
    if (this.state.page < this.props.ticket.infoAllTicket.totalPage) {
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

  redirect() {
    this.props.history.push('/login')
  }

  fetch() {
    this.setState({ isLoading: true, showFilterModal: false })
    const {
      filterDepartment,
      filterStatus,
      filterStartDate,
      filterEndDate,
    } = this.state
    this.props
      .getAllTicket(
        this.props.login.token,
        this.state.search,
        this.state.page,
        filterDepartment,
        filterStatus,
        filterStartDate,
        filterEndDate,
      )
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        this.setState({ isLoading: false })
      })
  }

  export() {
    this.setState({ isLoadingExportAllTicket: true })
    this.props.exportAllTicket(this.props.login.token).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.action.payload.data]),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `Report-All-Ticket${moment().format('DD-MM-YY')}.pdf`,
      )
      document.body.appendChild(link)
      link.click()
      this.setState({ isLoadingExportAllTicket: false })
    })
  }

  componentDidMount() {
    this.setState({ isLoadingStats: true })
    const {
      filterDepartment,
      filterStatus,
      filterStartDate,
      filterEndDate,
    } = this.state
    this.props
      .getAllTicket(
        this.props.login.token,
        this.state.search,
        this.state.page,
        filterDepartment,
        filterStatus,
        filterStartDate,
        filterEndDate,
      )
      .then((res) => {
        this.setState({ isLoading: false })
        this.props
          .getTicketStats(res.action.payload.data.newToken)
          .then((res) => {
            this.props
              .getDepartment(res.action.payload.data.newToken)
              .then((res) => {
                this.setState({ isLoadingStats: false })
                this.props.newToken(res.action.payload.data.newToken)
              })
          })
      })
  }

  // useStyles(){
  //   return makeStyles(styles);
  // }
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
                    {this.state.isLoadingExportAllTicket ? (
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
              {this.state.isLoadingStats ? (
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
                  <GridItem xs={12} sm={6} md={3}>
                    <Card
                      onClick={() => {
                        alert('Sorting Ticket Status Open')
                      }}
                    >
                      <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                          <Store />
                        </CardIcon>
                        <div className="pr-2">
                          <p className="cardCategory">Open</p>
                          <h3 className="cardTitle">
                            {this.props.ticket.dataTicketStats[0].Open}
                          </h3>
                        </div>
                      </CardHeader>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={3}>
                    <Card
                      onClick={() => {
                        alert('Sorting Ticket Status Processed')
                      }}
                    >
                      <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                          <Store />
                        </CardIcon>
                        <div className="pr-2">
                          <p className="cardCategory">Processed</p>
                          <h3 className="cardTitle">
                            {this.props.ticket.dataTicketStats[0].InProgress}
                          </h3>
                        </div>
                      </CardHeader>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={3}>
                    <Card
                      onClick={() => {
                        alert('Sorting Ticket Status Solved')
                      }}
                    >
                      <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                          <Store />
                        </CardIcon>
                        <div className="pr-2">
                          <p className="cardCategory">Solved</p>
                          <h3 className="cardTitle">
                            {this.props.ticket.dataTicketStats[0].Solved}
                          </h3>
                        </div>
                      </CardHeader>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={3}>
                    <Card
                      onClick={() => {
                        alert('Sorting Ticket Status Closed')
                      }}
                    >
                      <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                          <Accessibility />
                        </CardIcon>
                        <div className="pr-2">
                          <p className="cardCategory">Closed</p>
                          <h3 className="cardTitle">
                            {this.props.ticket.dataTicketStats[0].Closed}
                          </h3>
                        </div>
                      </CardHeader>
                    </Card>
                  </GridItem>
                </>
              )}
            </GridContainer>
            {/* <Button
              onClick={this.toggleAddModal}
              variant="contained"
              color="primary"
              // className="buttonAdd"
              startIcon={<Add />}
            >
              Add
            </Button> */}
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
                          <h4 className={classes.cardTitleWhite}>Ticketing</h4>
                          {/* {this.props.ticket.dataAllTicket[0] === undefined ||
                          this.props.ticket.dataAllTicket === undefined ? (
                            <p className={classes.cardCategoryWhite}>
                              Last Updated -
                            </p>
                          ) : (
                            <p className={classes.cardCategoryWhite}>
                              Last Updated{' '}
                              {this.props.ticket.dataAllTicket[0].updated_at.slice(
                                8,
                                10,
                              )}
                              -
                              {this.props.ticket.dataAllTicket[0].updated_at.slice(
                                5,
                                8,
                              )}
                              {this.props.ticket.dataAllTicket[0].updated_at.slice(
                                0,
                                4,
                              )}
                            </p>
                          )} */}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
                          <Table className={classesHead.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      No
                                    </strong>
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      Requester
                                    </strong>
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      Assign To
                                    </strong>
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      Observer
                                    </strong>
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      Status
                                    </strong>
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5>
                                    <strong className="textPrimaryColor">
                                      On Time
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
                              {this.props.ticket.dataAllTicket.map((res, i) => (
                                <TableRow
                                  className={classesBody.tableRow}
                                  key={i}
                                >
                                  <TableCell component="th">
                                    {res.no_ticket}
                                  </TableCell>
                                  <TableCell component="th">
                                    {res.nameFrom}
                                  </TableCell>
                                  <TableCell component="th">
                                    {res.category === '2'
                                      ? res.nameAssignGroup
                                      : res.nameAssign}
                                  </TableCell>
                                  <TableCell component="th">
                                    {res.nameObserve === null
                                      ? '-'
                                      : res.nameObserve}
                                  </TableCell>
                                  <TableCell component="th">
                                    {res.statusid === 1 ? (
                                      <span className="badge badge-pill badge-warning">
                                        Open
                                      </span>
                                    ) : res.statusid === 2 ? (
                                      <span className="badge badge-pill badge-primary">
                                        Processed
                                      </span>
                                    ) : res.statusid === 3 ? (
                                      <span className="badge badge-pill badge-success">
                                        Solved
                                      </span>
                                    ) : res.statusid === 4 ? (
                                      <span className="badge badge-pill badge-light">
                                        Closed
                                      </span>
                                    ) : (
                                      <></>
                                    )}
                                  </TableCell>
                                  {res.statusid < 4 ? (
                                    <>
                                      <TableCell
                                        className={classesBody.tableActions}
                                      >
                                        <p>-</p>
                                      </TableCell>
                                    </>
                                  ) : (
                                    <TableCell
                                      className={classesBody.tableActions}
                                    >
                                      {res.isLate === '1' ? (
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
                                  )}
                                  <TableCell component="th">
                                    {res.date.slice(8, 10)}-
                                    {res.date.slice(5, 8)}
                                    {res.date.slice(0, 4)}
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    {' '}
                                    <Link
                                      to={{
                                        pathname: `/admin/ticketing/${res.id}`,
                                        state: {
                                          id: `${res.id}`,
                                          no_ticket: `${res.no_ticket}`,
                                          title: `${res.title}`,
                                          nameFrom: `${res.nameFrom}`,
                                          nameAssign: `${res.nameAssign}`,
                                          nameObserve: `${res.nameObserve}`,
                                          start_date: `${res.start_date}`,
                                          end_date: `${res.end_date}`,
                                          description: `${res.description}`,
                                          statusid: `${res.statusid}`,
                                          date: `${res.date}`,
                                          assignId: `${res.assignId}`,
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
                        </TableContainer>
                        <div className="d-flex flex-row justify-content-end">
                          <div className="p-2 d-flex align-items-center align-self-center">
                            <h6>
                              15 of {this.props.ticket.infoAllTicket.totalData}
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
                  <FormGroup>
                    <h6>Status</h6>
                    <Input
                      value={this.state.filterStatus}
                      type="select"
                      name="filterStatus"
                      id="exampleSelect"
                      onChange={this.handleChange}
                    >
                      <option key={0} value="">
                        All
                      </option>
                      <option key={1} value={1}>
                        Open
                      </option>
                      <option key={2} value={2}>
                        Processed
                      </option>
                      <option key={3} value={3}>
                        Solved
                      </option>
                      <option key={4} value={4}>
                        Closed
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
  ticket: state.ticket,
  department: state.department,
})
const mapDispatchToProps = {
  getAllTicket,
  getTicketStats,
  exportAllTicket,
  newToken,
  getDepartment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticketing)
