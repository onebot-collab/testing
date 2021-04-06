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
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from 'reactstrap'
import Select from 'react-select'

import { getAllReport } from '../../redux/actions/report'
import { newToken } from '../../redux/actions/login'
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

const options = [
  { value: 1, label: 'General' },
  { value: 2, label: 'Development' },
  { value: 3, label: 'Networking' },
]

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddModal: false,
      selectedOption: false,
      isLoading: true,
      search: '',
      page: 1,
      showFilterModal: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleFilterModal = this.toggleFilterModal.bind(this)
  }

  toggleFilterModal() {
    this.setState({
      showFilterModal: !this.state.showFilterModal,
    })
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption })
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
    this.props
      .getAllReport(this.props.login.token, this.state.search, this.state.page)
      .then((res) => {
        this.setState({ isLoading: false })
        this.props.newToken(res.action.payload.data.newToken)
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
    const { selectedOption } = this.state
    return (
      <div>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <>
            {/* <Button
              onClick={this.toggleAddModal}
              variant="contained"
              color="primary"
              // className="buttonAdd"
              startIcon={<Add />}
            >
              Add
            </Button> */}
            <nav className="navbar navbar-light bg-light d-flex justify-content-end">
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
                          <h4 className={(classes.cardTitleWhite, 'd-flex')}>
                            Report
                          </h4>
                          {/* {this.props.report.dataAllReport[0] === undefined ? (
                            <p
                              className={(classes.cardCategoryWhite, 'd-flex')}
                            >
                              Last Updated -
                            </p>
                          ) : (
                            <p
                              className={(classes.cardCategoryWhite, 'd-flex')}
                            >
                              Last Updated{' '}
                              {this.props.report.dataAllReport[0].created_at.slice(
                                8,
                                10,
                              )}
                              {this.props.report.dataAllReport[0].created_at.slice(
                                5,
                                8,
                              )}
                              {this.props.report.dataAllReport[0].created_at.slice(
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
                                  <h5 className="textPrimaryColor">Name</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Description
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Attachment
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Created At
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Action</h5>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.props.report.dataAllReport.map((res, i) => (
                                <TableRow className={classes.tableRow} key={i}>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.nameUser}
                                    </p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.nameReport}
                                    </p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
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
                                    </p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.created_at}
                                    </p>
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
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
                  <h6>Name</h6>
                  <Input
                    value={this.state.name}
                    type="text"
                    name="name"
                    className="mb-2 shadow-none"
                    onChange={this.handleChange}
                  />
                  <h6>Department</h6>
                  <Input
                    value={this.state.department}
                    type="text"
                    name="department"
                    className="mb-2 shadow-none"
                    onChange={this.handleChange}
                  />
                  <h6>Date</h6>
                  <Input
                    value={this.state.date}
                    type="date"
                    name="Date"
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
            {/* Add Modal */}
            <Modal isOpen={this.state.showAddModal}>
              <ModalHeader className="h1">Add Report</ModalHeader>
              <Form>
                <ModalBody>
                  <h6>Title</h6>
                  <Input
                    type="text"
                    name="title"
                    className="mb-2 shadow-none"
                    onChange={this.handleChange}
                  />
                  <h6>Description</h6>
                  <Input
                    type="textarea"
                    name="description"
                    className="mb-3 shadow-none"
                    onChange={this.handleChange}
                  />
                  <h6>Department</h6>
                  {/* <Input type='select' name='genre' className="mb-3 shadow-none" onChange={this.handleChange} 
									 value={this.state.genre}>
                    {this.state.genreList.map((genre, index) =>(
                    <option className="list-group-item bg-light" value={genre.id}>{genre.name}</option>
                    ))}
                  </Input>  */}
                  {/* REACT-SELECT */}
                  <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                  />
                  {/* <Select onChange={this.genreChange} options={
										dataGenre.map((genre) =>(
											{ value: genre.id, label: genre.name}
											))
									}/> */}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.addBook}>
                    Add Report
                  </Button>
                  <Button color="secondary" onClick={this.toggleAddModal}>
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
})

const mapDispatchToProps = { getAllReport, newToken }

export default connect(mapStateToProps, mapDispatchToProps)(Report)
