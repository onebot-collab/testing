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
// import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
// import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
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

import { getAllTicket } from '../../redux/actions/ticket'
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
    }
    this.handleChange = this.handleChange.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption })
    console.log(`Option selected:`, selectedOption)
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
    this.props.getAllTicket().then(() => {
      this.setState({ isLoading: false })
    })
  }

  componentDidMount() {
    this.fetch()
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
            <GridContainer>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Store />
                    </CardIcon>
                    <p className="cardCategory">Open</p>
                    <h3 className="cardTitle">00</h3>
                  </CardHeader>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                      <Store />
                    </CardIcon>
                    <p className="cardCategory">Processed</p>
                    <h3 className="cardTitle">00</h3>
                  </CardHeader>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Store />
                    </CardIcon>
                    <p className="cardCategory">Solved</p>
                    <h3 className="cardTitle">00</h3>
                  </CardHeader>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <Accessibility />
                    </CardIcon>
                    <p className="cardCategory">Closed</p>
                    <h3 className="cardTitle">00</h3>
                  </CardHeader>
                </Card>
              </GridItem>
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
                        <h4 className={classes.cardTitleWhite}>Ticketing</h4>
                        {this.props.ticket.dataAllTicket[0] === undefined ||
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
                        )}
                      </CardHeader>
                      <CardBody>
                        <Table className={classesHead.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell component="th">No</TableCell>
                              <TableCell component="th">Requester</TableCell>
                              <TableCell component="th">Assign To</TableCell>
                              <TableCell component="th">Observer</TableCell>
                              <TableCell component="th">Status</TableCell>
                              <TableCell component="th">On Time</TableCell>
                              <TableCell component="th">Created At</TableCell>
                              <TableCell component="th">Action</TableCell>
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
                                    <span className="badge badge-pill badge-dark">
                                      Closed
                                    </span>
                                  ) : (
                                    <></>
                                  )}
                                </TableCell>
                                <TableCell className={classesBody.tableActions}>
                                  {res.isLate === '1' ? (
                                    <Tooltip
                                      id="tooltip-top-start"
                                      title="Late"
                                      placement="top"
                                      classes={{
                                        tooltip: classesBody.tooltip,
                                      }}
                                    >
                                      <Cancel
                                        className={classesBody.CheckCircle}
                                      />
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
                                      <CheckCircle
                                        className={classesBody.CheckCircle}
                                      />
                                    </Tooltip>
                                  )}
                                </TableCell>
                                <TableCell component="th">
                                  {res.date.slice(8, 10)}-{res.date.slice(5, 8)}
                                  {res.date.slice(0, 4)}
                                </TableCell>
                                <TableCell className={classesBody.tableActions}>
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
                                        end_date: `${res.end_date}`,
                                        description: `${res.description}`,
                                        statusid: `${res.statusid}`,
                                        date: `${res.date}`,
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
                                      <Visibility
                                        className={classesBody.CheckCircle}
                                      />
                                    </Tooltip>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
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
const mapDispatchToProps = { getAllTicket }

export default connect(mapStateToProps, mapDispatchToProps)(Ticketing)
