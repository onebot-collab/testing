/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable radix */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
// import Fab from '@material-ui/core/Fab'

// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
import Visibility from '@material-ui/icons/Visibility'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
// import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import { connect } from 'react-redux'
import Add from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Select from 'react-select'
import swal from 'sweetalert2'
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from 'reactstrap'
import {
  getAllCampaign,
  deleteCampaign,
  postCampaign,
} from '../../redux/actions/campaign'
import { getDepartment } from '../../redux/actions/department'
import { sendNotif } from '../../redux/actions/fcm'
import { newToken } from '../../redux/actions/login'
// import Check from '@material-ui/icons/Check'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// Add Reactstrap Modal

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class Announcement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingCampaign: true,
      isLoadingAddCampaign: false,
      showAddModal: false,
      showDeleteModal: false,
      selectedDepartment: false,
      title: '',
      description: '',
      deleteId: 0,
      search: '',
      page: 1,
    }
    this.fetch = this.fetch.bind(this)
    this.deleteAct = this.deleteAct.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.addAnnouncement = this.addAnnouncement.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
  }

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      this.fetch()
    }, 100)
  }

  nextPage() {
    if (this.state.page < this.props.campaign.infoCampaign.totalPage) {
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
      .getAllCampaign(
        this.props.login.token,
        this.state.search,
        this.state.page,
      )
      .then((res) => {
        this.setState({ isLoadingCampaign: false })
        this.props
          .getDepartment(res.action.payload.data.newToken)
          .then((res) => {
            this.props.newToken(res.action.payload.data.newToken)
          })
      })
  }

  deleteAct() {
    this.props
      .deleteCampaign(this.state.deleteId, this.props.login.token)
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Announcement successfully deleted',
        })
        this.fetch()
        this.setState({ showDeleteModal: false })
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to delete announcement',
        })
        this.setState({ showDeleteModal: false })
      })
  }

  redirect() {
    this.props.history.push('/login')
  }

  toggleAddModal() {
    this.setState({
      showAddModal: !this.state.showAddModal,
    })
  }

  toggleDeleteModal(id) {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      deleteId: id,
    })
  }

  handleDepartmentChange(e) {
    this.setState({ selectedDepartment: e.value })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  pressed(id) {
    if (id !== 1) {
      var dataSubmit = {
        to: `/topics/gmid${id}`,
        notification: {
          title: 'Announcement',
          body: `${this.state.title}`,
          mutable_content: true,
          sound: 'Tri-tone',
        },
        data: {
          route: 'Campaign',
          initialRoute: 'Campaign',
        },
      }
    } else {
      var dataSubmit = {
        to: '/topics/gmi',
        notification: {
          title: 'Announcement',
          body: `${this.state.title}`,
          mutable_content: true,
          sound: 'Tri-tone',
        },
        data: {
          route: 'Campaign',
          initialRoute: 'Campaign',
        },
      }
    }

    this.props.sendNotif(dataSubmit)
  }

  addAnnouncement(e) {
    e.preventDefault()
    this.setState({ isLoadingAddCampaign: true })
    const dataSubmit = {
      title: this.state.title,
      description: this.state.description,
      department: this.state.selectedDepartment,
      created_by: this.props.login.dataLogin.id,
    }

    this.props
      .postCampaign(dataSubmit, this.props.login.token)
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        this.setState({ isLoadingAddCampaign: false, showAddModal: false })
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Announcement successfully created',
        })
        this.fetch()
        // this.pressed(dataSubmit.department)
      })
      .catch(() => {
        this.setState({ isLoadingAddCampaign: false })
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to create announcement',
        })
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
    // const departmentList = departmentData.map((val) => (
    //   <option key={val.id} value={val.id}>
    //     {val.name}
    //   </option>
    // ))

    return (
      <div>
        {!this.props.login.isLogin ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <nav className="navbar navbar-light bg-light">
              <Button
                onClick={this.toggleAddModal}
                variant="contained"
                color="primary"
                // className="buttonAdd"
                startIcon={<Add />}
              >
                Add
              </Button>
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  name="search"
                  onChange={this.handleSearch}
                  type="search"
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
            </nav>

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
                        <div className="d-flex flex-row justify-content-between">
                          <h4 className={classes.cardTitleWhite}>
                            Announcement
                          </h4>
                          {/* <p className={classes.cardCategoryWhite}>
                            Last Updated{' '}
                            {this.props.campaign.dataCampaign[0] === undefined
                              ? '-'
                              : this.props.campaign.dataCampaign[0].created_at}
                          </p> */}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
                          <Table className={classesHead.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell component="th">
                                  <h6 className="textPrimaryColor">Title</h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6 className="textPrimaryColor">
                                    Description
                                  </h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6 className="textPrimaryColor">
                                    Department
                                  </h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6 className="textPrimaryColor">By</h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6 className="textPrimaryColor">Date</h6>
                                </TableCell>
                                <TableCell component="th">
                                  <h6 className="textPrimaryColor">Action</h6>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {this.props.campaign.dataCampaign.map(
                                (campaign, index) => (
                                  <TableRow
                                    className={classes.tableRow}
                                    key={index}
                                  >
                                    <TableCell component="th">
                                      <p className="textPrimaryColor">
                                        {campaign.title}
                                      </p>
                                    </TableCell>
                                    <TableCell component="th">
                                      <p className="textPrimaryColor">
                                        {campaign.description}
                                      </p>
                                    </TableCell>
                                    <TableCell component="th">
                                      <p className="textPrimaryColor">
                                        {campaign.departmentName}
                                      </p>
                                    </TableCell>
                                    <TableCell component="th">
                                      <p className="textPrimaryColor">
                                        {campaign.createdby_name}
                                      </p>
                                    </TableCell>
                                    <TableCell component="th">
                                      <p className="textPrimaryColor">
                                        {campaign.created_at}
                                      </p>
                                    </TableCell>
                                    <TableCell
                                      className={classesBody.tableActions}
                                    >
                                      <Tooltip
                                        id="tooltip-top"
                                        title="Click to Detail"
                                        placement="top"
                                        classes={{
                                          tooltip: classesBody.tooltip,
                                        }}
                                      >
                                        <IconButton
                                          aria-label="Edit"
                                          className={
                                            classesBody.tableActionButton
                                          }
                                        >
                                          <Link
                                            to={{
                                              pathname: `/admin/announcement/${campaign.id}`,
                                              state: {
                                                id: `${campaign.id}`,
                                                createdby_name: `${campaign.createdby_name}`,
                                                title: `${campaign.title}`,
                                                description: `${campaign.description}`,
                                                departmentName: `${campaign.departmentName}`,
                                                departmentId: `${campaign.departmentId}`,
                                                created_at: `${campaign.created_at}`,
                                              },
                                            }}
                                          >
                                            <Visibility className="iconWhiteColor" />
                                          </Link>
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip
                                        id="tooltip-top-start"
                                        title="Remove"
                                        placement="top"
                                        classes={{
                                          tooltip: classesBody.tooltip,
                                        }}
                                      >
                                        <IconButton
                                          onClick={() =>
                                            this.toggleDeleteModal(campaign.id)
                                          }
                                          aria-label="Close"
                                          className={
                                            classesBody.tableActionButton
                                          }
                                        >
                                          <Delete className="iconWhiteColor" />
                                        </IconButton>
                                      </Tooltip>
                                    </TableCell>
                                  </TableRow>
                                ),
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <div className="d-flex flex-row justify-content-end">
                          <div className="p-2 d-flex align-items-center align-self-center">
                            <h6>
                              15 of {this.props.campaign.infoCampaign.totalData}
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

            {/* Add Modal */}
            <Modal isOpen={this.state.showAddModal}>
              <ModalHeader className="h1">Add Announcement</ModalHeader>
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
                  <Select
                    onChange={this.handleDepartmentChange}
                    options={departmentData.map((res) => ({
                      value: res.id,
                      label: res.name,
                    }))}
                  />
                </ModalBody>
                <ModalFooter>
                  {this.state.isLoadingAddCampaign ? (
                    <Button color="primary">
                      <div
                        className="spinner-border spinner-border-sm text-danger"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </Button>
                  ) : (
                    <Button color="secondary" onClick={this.addAnnouncement}>
                      Submit
                    </Button>
                  )}
                  <Button color="primary" onClick={this.toggleAddModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={this.state.showDeleteModal}>
              <ModalBody className="h4">Are you sure?</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.deleteAct}>
                  Delete
                </Button>
                <Button
                  color="primary"
                  onClick={() => this.toggleDeleteModal(0)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaign,
  login: state.login,
  department: state.department,
})

const mapDispatchToProps = {
  getAllCampaign,
  deleteCampaign,
  postCampaign,
  getDepartment,
  sendNotif,
  newToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcement)
