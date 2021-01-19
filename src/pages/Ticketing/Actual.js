/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
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

import { getAllTicket, getTicketStats } from '../../redux/actions/ticket'
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

const options = [
  { value: 'General', label: 'General' },
  { value: 'Development', label: 'Development' },
  { value: 'Networking', label: 'Networking' },
]
class Ticketing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddModal: false,
      selectedOption: false,
      isLoading: true,
      isLoadingStats: true,
      search: '',
      page: 1,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption })
    console.log(`Option selected:`, selectedOption)
  }

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      this.fetch()
    }, 100);
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
    setTimeout(() => {
      this.fetch()
    }, 100);
  }

  prevPage() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
      setTimeout(() => {
        this.fetch()
      }, 100);
    }
  }

  toggleAddModal() {
    this.setState({
      showAddModal: !this.state.showAddModal,
    })
  }

  redirect() {
    this.props.history.push('/login')
  }

  fetch() {
    this.props.getAllTicket(this.props.login.token, this.state.search, this.state.page).then(() => {
      this.setState({ isLoading: false })
    })
  }

  fetchStats() {
    this.setState({ isLoadingStats: true })
    this.props.getTicketStats(this.props.login.token).then(() => {
      this.setState({ isLoadingStats: false })
    })
  }

  componentDidMount() {
    this.fetch()
    this.fetchStats()
  }

  // useStyles(){
  //   return makeStyles(styles);
  // }
  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    const { selectedOption } = this.state
    return (
      <div>
        {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <>
            <nav className="navbar navbar-light bg-light d-flex justify-content-end">
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
                  className="btn btn-outline-danger my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
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
                                  <h5 className="textPrimaryColor">No</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Requester
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">
                                    Assign To
                                  </h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Observer</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">Status</h5>
                                </TableCell>
                                <TableCell component="th">
                                  <h5 className="textPrimaryColor">On Time</h5>
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
                              {this.props.ticket.dataAllTicket.map((res, i) => (
                                <TableRow
                                  className={classesBody.tableRow}
                                  key={i}
                                >
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.no_ticket}
                                    </p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.nameFrom}
                                    </p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.category === '2'
                                        ? res.nameAssignGroup
                                        : res.nameAssign}
                                    </p>
                                  </TableCell>
                                  <TableCell component="th">
                                    <p className="textPrimaryColor">
                                      {res.nameObserve === null
                                        ? '-'
                                        : res.nameObserve}
                                    </p>
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
                                    <p className="textPrimaryColor">
                                      {res.date.slice(8, 10)}-
                                      {res.date.slice(5, 8)}
                                      {res.date.slice(0, 4)}
                                    </p>
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
                                        title="Click to Detail Ticket"
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
                              1 - 15 of {this.props.ticket.dataAllTicket.length}
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
                  <h6>Cover Folder (PDF Maks. 10 Mb)</h6>
                  {/* <Input
                type="file"
                name="image"
                className="mb-2"
                onChange={}
              /> */}
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
  ticket: state.ticket,
})
const mapDispatchToProps = { getAllTicket, getTicketStats }

export default connect(mapStateToProps, mapDispatchToProps)(Ticketing)
