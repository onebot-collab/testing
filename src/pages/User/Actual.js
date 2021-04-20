/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import swal from 'sweetalert2'
import './Actual.css'
// @material-ui/core components
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
// import TextField from '@material-ui/core/TextField'
// import MenuItem from '@material-ui/core/MenuItem'
// import TablePagination from '@material-ui/core/TablePagination'
// Reactstrap/code
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Visibility from '@material-ui/icons/Visibility'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Add from '@material-ui/icons/Add'
import Sort from '@material-ui/icons/Sort'
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  FormGroup,
} from 'reactstrap'
// import Select from 'react-select'
// core components
// import moment from 'moment'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
// import Button from '../../components/CustomButtons/Button'
import Card from '../../components/Card/Card'
import CardIcon from '../../components/Card/CardIcon'
import CardBody from '../../components/Card/CardBody'
// import CardFooter from '../../components/Card/CardFooter'

import {
  getUser,
  registerUser,
  editFormPersonal,
  editFormBackground,
  editFormAsset,
} from '../../redux/actions/user'
import { getDepartment } from '../../redux/actions/department'
import { newToken } from '../../redux/actions/login'
import { sendNotif } from '../../redux/actions/fcm'
import { getRosterByUser } from '../../redux/actions/presence'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      search: '',
      page: 1,
      department: '',
      showFilterModal: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.toggleFilterModal = this.toggleFilterModal.bind(this)
    this.fetch = this.fetch.bind(this)
    this.toDetail = this.toDetail.bind(this)
  }

  toggleFilterModal() {
    this.setState({
      showFilterModal: !this.state.showFilterModal,
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      this.fetch()
    }, 100)
  }

  nextPage() {
    if (this.state.page < this.props.user.infoUser.totalPage) {
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
    this.setState({ isLoadingUser: true, showFilterModal: false })
    this.props
      .getUser(
        this.props.login.token,
        this.state.search,
        this.state.page,
        this.state.department,
      )
      .then((res) => {
        this.setState({ isLoadingUser: false })
        this.props
          .getDepartment(res.action.payload.data.newToken)
          .then((res) => {
            this.props.newToken(res.action.payload.data.newToken)
          })
      })
  }

  redirect() {
    this.props.history.push('/login')
  }

  pressed() {
    const dataSubmit = {
      to: '/topics/gmiadmin',
      notification: {
        title: 'New User Registered',
        body: `${this.props.login.dataLogin.name} add ${this.state.name}`,
        mutable_content: true,
        sound: 'Tri-tone',
      },
      data: {
        route: 'Inventory',
        initialRoute: 'Inventory',
      },
    }

    this.props.sendNotif(dataSubmit)
  }

  toDetail(res) {
    const dataSubmitPersonal = {
      id: res.id,
      firstName: res.firstName,
      name: res.name,
      lastName: res.lastName,
      email: res.email,
      emailPrivate: res.emailPrivate,
      phone: res.phone,
      phone2: res.phone2,
      photo_url: res.photo_url,
      birthdate: res.birthdate,
      birthplace: res.birthplace,
      maritalStatus: res.maritalStatus,
      religion: res.religion,
      bloodType: res.bloodType,
      gender: res.gender,
      employmentType: res.employmentType,
      employmentDuration: res.employmentDuration,
      joined_date: res.joined_date,
      role: res.role,
      address: res.address,
      department_id: res.department_id,
      departmentName: res.departmentName,
      typeTime: res.typeTime,
      total_leave: res.total_leave,
    }

    const dataSubmitBackground = {
      edu: [
        {
          id: res.educationBackground[0].id,
          level: res.educationBackground[0].level,
          institution: res.educationBackground[0].institution,
          period: res.educationBackground[0].period,
          major: res.educationBackground[0].major,
          grade: res.educationBackground[0].grade,
        },
        {
          id: res.educationBackground[1].id,
          level: res.educationBackground[1].level,
          institution: res.educationBackground[1].institution,
          period: res.educationBackground[1].period,
          major: res.educationBackground[1].major,
          grade: res.educationBackground[1].grade,
        },
        {
          id: res.educationBackground[2].id,
          level: res.educationBackground[2].level,
          institution: res.educationBackground[2].institution,
          period: res.educationBackground[2].period,
          major: res.educationBackground[2].major,
          grade: res.educationBackground[2].grade,
        },
        {
          id: res.educationBackground[3].id,
          level: res.educationBackground[3].level,
          institution: res.educationBackground[3].institution,
          period: res.educationBackground[3].period,
          major: res.educationBackground[3].major,
          grade: res.educationBackground[3].grade,
        },
        {
          id: res.educationBackground[4].id,
          level: res.educationBackground[4].level,
          institution: res.educationBackground[4].institution,
          period: res.educationBackground[4].period,
          major: res.educationBackground[4].major,
          grade: res.educationBackground[4].grade,
        },
      ],
      fam: [
        {
          id: res.familyBackground[0].id,
          name: res.familyBackground[0].name,
          gender: res.familyBackground[0].gender,
          phone: res.familyBackground[0].phone,
          relation: res.familyBackground[0].relation,
          occupation: res.familyBackground[0].occupation,
          address: res.familyBackground[0].address,
        },
        {
          id: res.familyBackground[1].id,
          name: res.familyBackground[1].name,
          gender: res.familyBackground[1].gender,
          phone: res.familyBackground[1].phone,
          relation: res.familyBackground[1].relation,
          occupation: res.familyBackground[1].occupation,
          address: res.familyBackground[1].address,
        },
        {
          id: res.familyBackground[2].id,
          name: res.familyBackground[2].name,
          gender: res.familyBackground[2].gender,
          phone: res.familyBackground[2].phone,
          relation: res.familyBackground[2].relation,
          occupation: res.familyBackground[2].occupation,
          address: res.familyBackground[2].address,
        },
        {
          id: res.familyBackground[3].id,
          name: res.familyBackground[3].name,
          gender: res.familyBackground[3].gender,
          phone: res.familyBackground[3].phone,
          relation: res.familyBackground[3].relation,
          occupation: res.familyBackground[3].occupation,
          address: res.familyBackground[3].address,
        },
        {
          id: res.familyBackground[4].id,
          name: res.familyBackground[4].name,
          gender: res.familyBackground[4].gender,
          phone: res.familyBackground[4].phone,
          relation: res.familyBackground[4].relation,
          occupation: res.familyBackground[4].occupation,
          address: res.familyBackground[4].address,
        },
      ],
      work: [
        {
          id: res.workingExperience[0].id,
          company: res.workingExperience[0].company,
          period: res.workingExperience[0].period,
          firstRole: res.workingExperience[0].firstRole,
          lastRole: res.workingExperience[0].lastRole,
          lastSalary: res.workingExperience[0].lastSalary,
        },
        {
          id: res.workingExperience[1].id,
          company: res.workingExperience[1].company,
          period: res.workingExperience[1].period,
          firstRole: res.workingExperience[1].firstRole,
          lastRole: res.workingExperience[1].lastRole,
          lastSalary: res.workingExperience[1].lastSalary,
        },
        {
          id: res.workingExperience[2].id,
          company: res.workingExperience[2].company,
          period: res.workingExperience[2].period,
          firstRole: res.workingExperience[2].firstRole,
          lastRole: res.workingExperience[2].lastRole,
          lastSalary: res.workingExperience[2].lastSalary,
        },
        {
          id: res.workingExperience[3].id,
          company: res.workingExperience[3].company,
          period: res.workingExperience[3].period,
          firstRole: res.workingExperience[3].firstRole,
          lastRole: res.workingExperience[3].lastRole,
          lastSalary: res.workingExperience[3].lastSalary,
        },
        {
          id: res.workingExperience[4].id,
          company: res.workingExperience[4].company,
          period: res.workingExperience[4].period,
          firstRole: res.workingExperience[4].firstRole,
          lastRole: res.workingExperience[4].lastRole,
          lastSalary: res.workingExperience[4].lastSalary,
        },
      ],
      onHand: [
        {
          id: res.onHand[0].id,
          userId: res.onHand[0].userId,
          title: res.onHand[0].title,
          description: res.onHand[0].description,
          file: res.onHand[0].file,
        },
        {
          id: res.onHand[1].id,
          userId: res.onHand[1].userId,
          title: res.onHand[1].title,
          description: res.onHand[1].description,
          file: res.onHand[1].file,
        },
        {
          id: res.onHand[2].id,
          userId: res.onHand[2].userId,
          title: res.onHand[2].title,
          description: res.onHand[2].description,
          file: res.onHand[2].file,
        },
        {
          id: res.onHand[3].id,
          userId: res.onHand[3].userId,
          title: res.onHand[3].title,
          description: res.onHand[3].description,
          file: res.onHand[3].file,
        },
        {
          id: res.onHand[4].id,
          userId: res.onHand[4].userId,
          title: res.onHand[4].title,
          description: res.onHand[4].description,
          file: res.onHand[4].file,
        },
      ],
      offHand: [
        {
          id: res.offHand[0].id,
          userId: res.offHand[0].userId,
          title: res.offHand[0].title,
          description: res.offHand[0].description,
          file: res.offHand[0].file,
        },
        {
          id: res.offHand[1].id,
          userId: res.offHand[1].userId,
          title: res.offHand[1].title,
          description: res.offHand[1].description,
          file: res.offHand[1].file,
        },
        {
          id: res.offHand[2].id,
          userId: res.offHand[2].userId,
          title: res.offHand[2].title,
          description: res.offHand[2].description,
          file: res.offHand[2].file,
        },
        {
          id: res.offHand[3].id,
          userId: res.offHand[3].userId,
          title: res.offHand[3].title,
          description: res.offHand[3].description,
          file: res.offHand[3].file,
        },
        {
          id: res.offHand[4].id,
          userId: res.offHand[4].userId,
          title: res.offHand[4].title,
          description: res.offHand[4].description,
          file: res.offHand[4].file,
        },
      ],
    }

    this.props.editFormPersonal(dataSubmitPersonal)
    setTimeout(() => {
      this.props.editFormBackground(dataSubmitBackground)
    }, 100)
    setTimeout(() => {
      this.props.history.push(`/admin/user/${res.id}`)
    }, 200)
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
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardIcon color="danger">
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
                              className="btn btn-outline-light my-2 my-sm-0"
                              type="submit"
                            >
                              Search
                            </button>
                          </form>
                          <button
                            className="btn my-2 mx-2 my-sm-0"
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
                          <Link
                            to="/admin/user/stepOne"
                            className="btn my-2 mx-2 my-sm-0"
                          >
                            <Tooltip
                              id="tooltip-top-start"
                              title="Add User"
                              placement="top"
                              classes={{
                                tooltip: classesBody.tooltip,
                              }}
                            >
                              <Add className="iconWhiteColor" />
                              {/* )} */}
                            </Tooltip>
                          </Link>
                          {/* </button> */}
                        </nav>
                      </CardIcon>
                      {this.state.isLoadingUser ? (
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
                          <CardBody>
                            <TableContainer>
                              <Table className={classesHead.table}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell component="th">
                                      <h6 className="textPrimaryColor">
                                        Image
                                      </h6>
                                    </TableCell>
                                    <TableCell component="th">
                                      <h6 className="textPrimaryColor">Name</h6>
                                    </TableCell>
                                    <TableCell component="th">
                                      <h6 className="textPrimaryColor">
                                        Department
                                      </h6>
                                    </TableCell>
                                    <TableCell component="th">
                                      <h6 className="textPrimaryColor">
                                        Email
                                      </h6>
                                    </TableCell>
                                    <TableCell component="th">
                                      <h6 className="textPrimaryColor">
                                        Action
                                      </h6>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {this.props.user.dataUser.map((res, i) => (
                                    <TableRow
                                      className={classes.tableRow}
                                      key={i}
                                    >
                                      <TableCell
                                        component="th"
                                        size="small"
                                        className={classesBody.tablePicture}
                                      >
                                        <Avatar
                                          src={`${process.env.REACT_APP_URL}${res.photo_url}?boAgRwlfX5=${this.props.login.token}`}
                                        />
                                      </TableCell>
                                      <TableCell
                                        className="textPrimaryColor"
                                        component="th"
                                        size="small"
                                      >
                                        {res.name}
                                      </TableCell>
                                      <TableCell
                                        className="textPrimaryColor"
                                        component="th"
                                        size="small"
                                      >
                                        {res.departmentName}
                                      </TableCell>
                                      <TableCell
                                        className="textPrimaryColor"
                                        component="th"
                                        size="small"
                                      >
                                        {res.email}
                                      </TableCell>
                                      <TableCell
                                        className={classesBody.tableActions}
                                        size="small"
                                      >
                                        <Link
                                          onClick={() => this.toDetail(res)}
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
                                  15 of {this.props.user.infoUser.totalData}
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
                      <FormGroup>
                        <Input
                          value={this.state.department}
                          type="select"
                          name="department"
                          id="exampleSelect"
                          onChange={this.handleChange}
                        >
                          <option key={0} value="">
                            All
                          </option>
                          {departmentData.map((res) => (
                            <option key={res.id} value={res.id}>
                              {res.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
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
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  user: state.user,
  department: state.department,
  presence: state.presence,
})
const mapDispatchToProps = {
  getUser,
  registerUser,
  getDepartment,
  sendNotif,
  newToken,
  getRosterByUser,
  editFormPersonal,
  editFormBackground,
  editFormAsset,
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
