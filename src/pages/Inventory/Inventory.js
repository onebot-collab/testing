/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
// import Fab from '@material-ui/core/Fab'

// import Select from 'react-select'

import {
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  CustomInput,
} from 'reactstrap'
import swal from 'sweetalert2'

// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
import { Visibility } from '@material-ui/icons'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Add from '@material-ui/icons/Add'
// import Delete from '@material-ui/icons/Delete'

// import Check from '@material-ui/icons/Check'

// redux
import { getInventoryHome, postInventory } from '../../redux/actions/inventory'

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

// const options = [
//   { value: 1, label: 'General' },
//   { value: 2, label: 'Development' },
//   { value: 3, label: 'Networking' },
// ]

class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoadingAddInventory: false,
      showAddModal: false,
      name: '',
      brand: '',
      serialNo: '',
      note: '',
      expDate: '',
      fileInventory: '',
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.addInventory = this.addInventory.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  fetch() {
    this.props.getInventoryHome().then(() => {
      this.setState({ isLoading: false })
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  redirect() {
    this.props.history.push('/login')
  }

  toggleAddModal() {
    this.setState({
      showAddModal: !this.state.showAddModal,
    })
  }

  addInventory() {
    this.setState({ isLoadingAddInventory: true })
    const expDate = `${this.state.expDate.slice(
      0,
      4,
    )}-${this.state.expDate.slice(5, 7)}-${this.state.expDate.slice(8, 10)}`

    const dataSubmit = new FormData()
    dataSubmit.append('name', this.state.name)
    dataSubmit.append('brand', this.state.brand)
    dataSubmit.append('note', this.state.note)
    dataSubmit.append('serialno', this.state.serialNo)
    dataSubmit.append('status', 2)
    dataSubmit.append('expdate', expDate)
    dataSubmit.append('fileinventory', this.state.fileInventory)

    this.props
      .postInventory(dataSubmit)
      .then(() => {
        this.fetch()
        this.setState({
          isLoadingAddInventory: false,
          showAddModal: false,
          name: '',
          brand: '',
          note: '',
          serialNo: '',
          fileInventory: '',
        })
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Inventory successfully created',
        })
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to create inventory',
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
    return (
      <>
        {!this.props.login.token ? (
          <>{this.redirect()}</>
        ) : (
          <div>
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
                <Button
                  onClick={this.toggleAddModal}
                  variant="contained"
                  color="primary"
                  // className="buttonAdd"
                  startIcon={<Add />}
                >
                  Add
                </Button>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="danger">
                        <h4 className={classes.cardTitleWhite}>Inventory</h4>
                        <p className={classes.cardCategoryWhite}>
                          Last Updated{' '}
                          {this.props.inventory.dataInventory[0] === undefined
                            ? '-'
                            : this.props.inventory.dataInventory[0].created_at}
                        </p>
                      </CardHeader>
                      <CardBody>
                        <Table className={classesHead.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell component="th">
                                <h6 className="textPrimaryColor">Image</h6>
                              </TableCell>
                              <TableCell component="th">
                                <h6 className="textPrimaryColor">Name</h6>
                              </TableCell>
                              <TableCell component="th">
                                <h6 className="textPrimaryColor">Brand</h6>
                              </TableCell>
                              <TableCell component="th">
                                <h6 className="textPrimaryColor">
                                  Created Date
                                </h6>
                              </TableCell>
                              <TableCell component="th">
                                <h6 className="textPrimaryColor">Action</h6>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.props.inventory.dataInventory.map(
                              (res, i) => (
                                <TableRow className={classes.tableRow} key={i}>
                                  <TableCell
                                    component="th"
                                    className={classesBody.tablePicture}
                                  >
                                    <Avatar
                                      src={`http://10.5.1.38:5000/${res.image_url}`}
                                    />
                                  </TableCell>
                                  <TableCell
                                    className="textPrimaryColor"
                                    component="th"
                                  >
                                    {res.name}
                                  </TableCell>
                                  <TableCell
                                    className="textPrimaryColor"
                                    component="th"
                                  >
                                    {res.brand}
                                  </TableCell>
                                  <TableCell
                                    className="textPrimaryColor"
                                    component="th"
                                  >
                                    {res.date}
                                  </TableCell>
                                  <TableCell
                                    className={classesBody.tableActions}
                                  >
                                    <Link to="/admin/inventory/detail">
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
                              ),
                            )}
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
                    </Card>
                  </GridItem>
                </GridContainer>
                {/* Add Modal */}
                <Modal isOpen={this.state.showAddModal}>
                  <ModalHeader className="h1">Add Inventory</ModalHeader>
                  <Form>
                    <ModalBody>
                      <h6>Name</h6>
                      <Input
                        type="text"
                        name="name"
                        className="mb-2 shadow-none"
                        onChange={this.handleChange}
                      />
                      <h6>Brand</h6>
                      <Input
                        type="text"
                        name="brand"
                        className="mb-2 shadow-none"
                        onChange={this.handleChange}
                      />
                      <h6>Serial No</h6>
                      <Input
                        type="text"
                        name="serialNo"
                        className="mb-2 shadow-none"
                        onChange={this.handleChange}
                      />
                      <h6>Note</h6>
                      <Input
                        type="textarea"
                        name="note"
                        className="mb-2 shadow-none"
                        onChange={this.handleChange}
                      />
                      <h6>Expired Date</h6>
                      <Input
                        value={this.state.birthDate}
                        type="date"
                        name="expDate"
                        className="mb-2 shadow-none"
                        onChange={this.handleChange}
                      />
                      <FormGroup className="mb-2 shadow-none">
                        <h6>Picture</h6>
                        <CustomInput
                          type="file"
                          id="exampleCustomFileBrowser"
                          name="fileInventory"
                          onChange={(e) =>
                            this.setState({
                              fileInventory: e.target.files[0],
                            })
                          }
                        />
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                      {this.state.isLoadingAddInventory ? (
                        <Button color="primary">
                          <div
                            className="spinner-border spinner-border-sm text-danger"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </Button>
                      ) : (
                        <Button color="secondary" onClick={this.addInventory}>
                          Submit
                        </Button>
                      )}
                      <Button color="secondary" onClick={this.toggleAddModal}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Form>
                </Modal>
              </>
            )}
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  inventory: state.inventory,
  login: state.login,
})

const mapDispatchToProps = { getInventoryHome, postInventory }

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
