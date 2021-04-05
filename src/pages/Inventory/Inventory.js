/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Inventory.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
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
import moment from 'moment'

import {
  Visibility,
  Delete,
  Add,
  ArrowLeft,
  ArrowRight,
  Print,
} from '@material-ui/icons'

// redux
import {
  getInventoryHome,
  postInventory,
  deleteInventory,
  exportInventory,
  inventoryCategory,
} from '../../redux/actions/inventory'
import { sendNotif } from '../../redux/actions/fcm'
import { newToken } from '../../redux/actions/login'
import { allInvoiceId } from '../../redux/actions/invoice'

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

class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoadingAddInventory: false,
      isLoadingExportInventory: false,
      showAddModal: false,
      showDeleteModal: false,
      name: '',
      brand: '',
      serialNo: '',
      note: '',
      expDate: '',
      fileInventory: '',
      fileInventory2: '',
      fileInventory3: '',
      warranty: 0,
      warrantyDate: '',
      accessories: '',
      invoiceId: 0,
      category: 1,
      purchaseDate: '',
      deleteId: 0,
      search: '',
      page: 1,
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.addInventory = this.addInventory.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.delete = this.delete.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.export = this.export.bind(this)
  }

  handleSearch(event) {
    this.setState({ [event.target.name]: event.target.value })
    setTimeout(() => {
      this.fetch()
    }, 100)
  }

  nextPage() {
    if (this.state.page < this.props.inventory.infoInventory.totalPage)
      this.setState({ page: this.state.page + 1 })
    setTimeout(() => {
      this.fetch()
    }, 100)
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
      .getInventoryHome(
        this.props.login.token,
        this.state.search,
        this.state.page,
      )
      .then((res) => {
        this.props
          .inventoryCategory(res.action.payload.data.newToken)
          .then(() => {
            this.props
              .allInvoiceId(res.action.payload.data.newToken)
              .then(() => {
                this.props.newToken(res.action.payload.data.newToken)
                this.setState({ isLoading: false })
              })
          })
      })
  }

  export() {
    this.setState({ isLoadingExportInventory: true })
    this.props.exportInventory(this.props.login.token).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.action.payload.data]),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `Inventory-Report_${moment().format('DD-MM-YY')}.pdf`,
      )
      document.body.appendChild(link)
      link.click()
      this.setState({ isLoadingExportInventory: false })
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

  toggleDeleteModal(id) {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      deleteId: id,
    })
  }

  pressed() {
    const dataSubmit = {
      to: '/topics/gmiadmin',
      notification: {
        title: 'New Inventory Added',
        body: `${this.props.login.dataLogin.name} add new inventory`,
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

  addInventory() {
    this.setState({ isLoadingAddInventory: true })
    const warrantyDate = `${this.state.warrantyDate.slice(
      0,
      4,
    )}-${this.state.warrantyDate.slice(5, 7)}-${this.state.warrantyDate.slice(8, 10)}`
    const purchaseDate = `${this.state.purchaseDate.slice(
      0,
      4,
    )}-${this.state.purchaseDate.slice(5, 7)}-${this.state.purchaseDate.slice(8, 10)}`

    const dataSubmit = new FormData()
    dataSubmit.append('name', this.state.name)
    dataSubmit.append('brand', this.state.brand)
    dataSubmit.append('note', this.state.note)
    dataSubmit.append('serialno', this.state.serialNo)
    dataSubmit.append('fileInventory1', this.state.fileInventory)
    if (this.state.fileInventory2 !== '') {
      dataSubmit.append('fileInventory2', this.state.fileInventory2)
    }
    if (this.state.fileInventory3 !== '') {
      dataSubmit.append('fileInventory3', this.state.fileInventory3)
    }
    if (this.state.invoiceId !== 0) {
      dataSubmit.append('invoice_id', this.state.invoiceId)
    }
    dataSubmit.append('category', this.state.category)
    dataSubmit.append('accessories', this.state.accessories)
    dataSubmit.append('warranty', this.state.warranty)
    if (this.state.warranty !== 0) {
      dataSubmit.append('warranty_date', warrantyDate)
    }
    dataSubmit.append('purchase_date', purchaseDate)

    this.props
      .postInventory(dataSubmit, this.props.login.token)
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        this.fetch()
        this.setState({
          isLoadingAddInventory: false,
          showAddModal: false,
          name: '',
          brand: '',
          note: '',
          serialNo: '',
          fileInventory: '',
          fileInventory2: '',
          fileInventory3: '',
          warranty: 0,
          warrantyDate: '',
          accessories: '',
          invoiceId: 0,
          category: 0,
        })
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Inventory successfully created',
        })
        // this.pressed()
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to create inventory',
        })
      })
  }

  delete() {
    this.props
      .deleteInventory(this.state.deleteId, this.props.login.token)
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        this.fetch()
        this.setState({ showDeleteModal: false })
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Inventory successfully deleted',
        })
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to delete inventory',
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

    const invoiceData = this.props.invoice.dataAllInvoiceId
    const invoiceList = invoiceData.map((val) => (
      <option key={val.id} value={val.id}>
        {val.invoice_no}
      </option>
    ))

    const inventoryCategoryData = this.props.inventory.dataInventoryCategory
    const categoryList = inventoryCategoryData.map((val) => (
      <option key={val.category} value={val.category}>
        {val.category_name}
      </option>
    ))
    return (
      <>
        {!this.props.login.isLogin ? (
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
                        {this.state.isLoadingExportInventory ? (
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
                      <CardHeader color="danger">
                        <div className="d-flex flex-row justify-content-between">
                          <h4 className={classes.cardTitleWhite}>Inventory</h4>
                          {/* <p className={classes.cardCategoryWhite}>
                            Last Updated{' '}
                            {this.props.inventory.dataInventory[0] === undefined
                              ? '-'
                              : this.props.inventory.dataInventory[0]
                                  .created_at}
                          </p> */}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <TableContainer>
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
                                  <TableRow
                                    className={classes.tableRow}
                                    key={i}
                                  >
                                    <TableCell
                                      component="th"
                                      className={classesBody.tablePicture}
                                    >
                                      <Avatar
                                        src={`http://10.7.9.6:8443/node/${res.image_url}?boAgRwlfX5=${this.props.login.token}`}
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
                                      {res.created_at}
                                    </TableCell>
                                    <TableCell
                                      className={classesBody.tableActions}
                                    >
                                      <Link
                                        to={{
                                          pathname: `/admin/inventory/${res.id}`,
                                          state: {
                                            id: `${res.id}`,
                                            name: `${res.name}`,
                                            brand: `${res.brand}`,
                                            serial_no: `${res.serial_no}`,
                                            exp_date: `${res.exp_date}`,
                                            note: `${res.note}`,
                                            created_at: `${res.created_at}`,
                                            image_url: `${res.image_url}`,
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
                                            this.toggleDeleteModal(res.id)
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
                              15 of{' '}
                              {this.props.inventory.infoInventory.totalData}
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
                      <h6>Accessories</h6>
                      <Input
                        type="textarea"
                        name="accessories"
                        className="mb-2 shadow-none"
                        onChange={this.handleChange}
                      />
                      <FormGroup>
                        <h6>Category</h6>
                        <Input
                          value={this.state.invoiceId}
                          type="select"
                          name="category"
                          id="exampleSelect"
                          onChange={this.handleChange}
                        >
                          {categoryList}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <h6>Invoice</h6>
                        <Input
                          value={this.state.invoiceId}
                          type="select"
                          name="invoiceId"
                          id="exampleSelect"
                          onChange={this.handleChange}
                        >
                          <option key={0} value={0}>
                            -
                          </option>
                          {invoiceList}
                        </Input>
                      </FormGroup>
                      <h6>Purchase Date</h6>
                      <Input
                        value={this.state.purchaseDate}
                        type="date"
                        name="purchaseDate"
                        className="mb-2 shadow-none"
                        onChange={this.handleChange}
                      />
                      <FormGroup>
                        <h6>Warranty</h6>
                        <Input
                          value={this.state.warranty}
                          type="select"
                          name="warranty"
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
                      {this.state.warranty !== 0 ? (
                        <>
                          <h6>Warranty Date</h6>
                          <Input
                            value={this.state.warrantyDate}
                            type="date"
                            name="warrantyDate"
                            className="mb-2 shadow-none"
                            onChange={this.handleChange}
                          />
                        </>
                      ) : (
                        <></>
                      )}
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
                      {this.state.fileInventory !== '' ? (
                        <FormGroup className="mb-2 shadow-none">
                          <h6>Picture 2</h6>
                          <CustomInput
                            type="file"
                            id="exampleCustomFileBrowser"
                            name="fileInventory2"
                            onChange={(e) =>
                              this.setState({
                                fileInventory2: e.target.files[0],
                              })
                            }
                          />
                        </FormGroup>
                      ) : (
                        <></>
                      )}
                      {this.state.fileInventory2 !== '' ? (
                        <FormGroup className="mb-2 shadow-none">
                          <h6>Picture 3</h6>
                          <CustomInput
                            type="file"
                            id="exampleCustomFileBrowser"
                            name="fileInventory3"
                            onChange={(e) =>
                              this.setState({
                                fileInventory3: e.target.files[0],
                              })
                            }
                          />
                        </FormGroup>
                      ) : (
                        <></>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      {this.state.isLoadingAddInventory ? (
                        <Button color="primary" onClick={this.addInventory}>
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
                {/* Delete Modal */}
                <Modal isOpen={this.state.showDeleteModal}>
                  <ModalBody className="h4">Are you sure?</ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.delete}>
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
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  inventory: state.inventory,
  invoice: state.invoice,
  login: state.login,
})

const mapDispatchToProps = {
  getInventoryHome,
  postInventory,
  deleteInventory,
  sendNotif,
  exportInventory,
  newToken,
  allInvoiceId,
  inventoryCategory,
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
