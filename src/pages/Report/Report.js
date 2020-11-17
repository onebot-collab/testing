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
    }
    this.handleChange = this.handleChange.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption })
    console.log(`Option selected:`, selectedOption)
  }

  redirect() {
    this.props.history.push('/login')
  }

  fetch() {
    this.props.getAllReport().then(() => {
      this.setState({ isLoading: false })
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
        {!this.props.login.token ? (
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
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
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
                          <h4 className={classes.cardTitleWhite}>Report</h4>
                          {this.props.report.dataAllReport[0] === undefined ? (
                            <p className={classes.cardCategoryWhite}>
                              Last Updated -
                            </p>
                          ) : (
                            <p className={classes.cardCategoryWhite}>
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
                          )}
                        </div>
                      </CardHeader>
                      <CardBody>
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
                                <h5 className="textPrimaryColor">Attachment</h5>
                              </TableCell>
                              <TableCell component="th">
                                <h5 className="textPrimaryColor">Created At</h5>
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
                                    {res.fileName === null ? (
                                      <span className="badge badge-secondary">
                                        No Attachment
                                      </span>
                                    ) : (
                                      <span className="badge badge-success">
                                        {res.fileName.slice(7)}
                                      </span>
                                    )}
                                  </p>
                                </TableCell>
                                <TableCell component="th">
                                  <p className="textPrimaryColor">
                                    {res.created_at.slice(8, 10)}
                                    {res.created_at.slice(5, 8)}
                                    {res.created_at.slice(0, 5)}
                                  </p>
                                </TableCell>
                                <TableCell className={classesBody.tableActions}>
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
                                      title="Click to Detail Report"
                                      placement="top"
                                      classes={{ tooltip: classesBody.tooltip }}
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
                            <h6>1 - 5 of 20</h6>
                          </div>
                          <div className="p-2">
                            <IconButton>
                              <ArrowLeft
                                className="iconWhiteColor"
                                fontSize="large"
                              />
                            </IconButton>
                          </div>
                          <div className="p-2">
                            <IconButton>
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

const mapDispatchToProps = { getAllReport }

export default connect(mapStateToProps, mapDispatchToProps)(Report)
