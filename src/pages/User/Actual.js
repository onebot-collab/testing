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
// core components
// import moment from 'moment'
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
// import Button from '../../components/CustomButtons/Button'
import Card from '../../components/Card/Card'
import CardIcon from '../../components/Card/CardIcon'
import CardBody from '../../components/Card/CardBody'
// import CardFooter from '../../components/Card/CardFooter'

import { getUser, registerUser } from '../../redux/actions/user'
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
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
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
    this.setState({ isLoadingUser: true })
    this.props
      .getUser(this.props.login.token, this.state.search, this.state.page)
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

  componentDidMount() {
    this.fetch()
  }

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)

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
                          <CardIcon color="danger">
                            <nav className="navbar d-flex justify-content-end">
                              <form className="form-inline">
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
                                          src={`http://10.7.10.6:8443/node/${res.photo_url}?boAgRwlfX5=${this.props.login.token}`}
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
                                          to={{
                                            pathname: `/admin/user/${res.id}`,
                                            state: {
                                              id: `${res.id}`,
                                              name: `${res.name}`,
                                              email: `${res.email}`,
                                              phone: `${res.phone}`,
                                              photo_url: `${res.photo_url}`,
                                              birthdate: `${res.birthdate}`,
                                              joined_date: `${res.joined_date}`,
                                              role: `${res.role}`,
                                              address: `${res.address}`,
                                              department_id: `${res.department_id}`,
                                              departmentName: `${res.departmentName}`,
                                              typeTime: `${res.typeTime}`,
                                              total_leave: `${res.total_leave}`,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
