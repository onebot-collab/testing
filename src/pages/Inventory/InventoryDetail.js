/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable block-scoped-var */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './InventoryDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
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
import moment from 'moment'
import swal from 'sweetalert2'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
// import { Visibility } from '@material-ui/icons'

// import Check from '@material-ui/icons/Check'
// core components
import { patchInventory } from '../../redux/actions/inventory'
import { newToken } from '../../redux/actions/login'

import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'

// Import Image
// import image1 from '../../assets/img/faces/marc.jpg'

class InventoryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditModal: false,
      name: `${this.props.location.state.name}`,
      brand: `${this.props.location.state.brand}`,
      serial_no: `${this.props.location.state.serial_no}`,
      note: `${this.props.location.state.note}`,
      purchase_date: `${this.props.location.state.purchase_date}`,
      warranty: `${this.props.location.state.warranty}`,
      warranty_exp: `${this.props.location.state.warranty_exp}`,
      invoice_id: `${
        this.props.location.state.invoice_id == null
          ? 0
          : this.props.location.state.invoice_id
      }`,
      category: this.props.location.state.category,
      accessories: this.props.location.state.accessories,
      // exp_date: `${this.props.location.state.exp_date.slice(
      //   6,
      //   10,
      // )}-${this.props.location.state.exp_date.slice(
      //   3,
      //   5,
      // )}-${this.props.location.state.exp_date.slice(0, 2)}`,
      fileInventory: '',
      fileInventory2: '',
      fileInventory3: '',
      isLoadingUpdate: false,
    }
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleEditModal() {
    this.setState({
      showEditModal: !this.state.showEditModal,
    })
  }

  update() {
    this.setState({ isLoadingUpdate: true })
    const id = `${this.props.location.state.id}`
    const dataSubmit = new FormData()

    dataSubmit.append('name', this.state.name)
    dataSubmit.append('brand', this.state.brand)
    dataSubmit.append('serialno', this.state.serial_no)
    dataSubmit.append('note', this.state.note)
    dataSubmit.append('category', this.state.category)
    dataSubmit.append('accessories', this.state.accessories)
    dataSubmit.append(
      'purchase_date',
      moment(this.state.purchase_date).format('YYYY-MM-DD'),
    )
    dataSubmit.append('warranty', this.state.warranty)
    if (this.state.invoice_id != 0) {
      dataSubmit.append('invoice_id', this.state.invoice_id)
    }
    if (parseInt(this.state.warranty) !== 0) {
      dataSubmit.append(
        'warranty_date',
        moment(this.state.warranty_exp).format('YYYY-MM-DD'),
      )
    }
    if (this.state.fileInventory !== '') {
      dataSubmit.append('fileInventory1', this.state.fileInventory)
    }
    if (this.state.fileInventory2 !== '') {
      dataSubmit.append('fileInventory2', this.state.fileInventory2)
    }
    if (this.state.fileInventory3 !== '') {
      dataSubmit.append('fileInventory3', this.state.fileInventory3)
    }

    this.props
      .patchInventory(dataSubmit, id, this.props.login.token)
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken)
        this.setState({ isLoadingUpdate: false })
        this.props.history.push('/admin/inventory')
        swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Inventory successfully edited',
        })
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to edit inventory',
        })
      })
  }

  componentDidMount() {}

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)

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
    const slideImages = [
      `http://10.7.10.6:8443/node/${this.props.location.state.image_url}?boAgRwlfX5=${this.props.login.token}`,
      `http://10.7.10.6:8443/node/${this.props.location.state.image_url2}?boAgRwlfX5=${this.props.login.token}`,
      `http://10.7.10.6:8443/node/${this.props.location.state.image_url3}?boAgRwlfX5=${this.props.login.token}`,
    ]
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className={classes.cardTitleWhite}>
                    {this.props.location.state.name}
                  </h4>
                  {/* <p className={classes.cardCategoryWhite}>
                    Last Updated {this.props.location.state.created_at}
                  </p> */}
                </div>
              </CardHeader>
              <CardBody>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={4}>
                    <div className="slide-container">
                      <Slide>
                        <div className="each-slide">
                          <img
                            className="rounded mx-auto d-block img-responsive wrapperImage"
                            src={`http://10.7.10.6:8443/node/${this.props.location.state.image_url}?boAgRwlfX5=${this.props.login.token}`}
                            alt="inventory img"
                          />
                        </div>
                        <div className="each-slide">
                          <div>
                            <Paper className="wrapperNoImage" elevation={3}>
                              <img
                                className="rounded mx-auto d-block img-responsive wrapperImage"
                                src={
                                  this.props.location.state.image_url2 !==
                                  'null'
                                    ? `http://10.7.10.6:8443/node/${this.props.location.state.image_url2}?boAgRwlfX5=${this.props.login.token}`
                                    : 'https://digitalfinger.id/wp-content/uploads/2019/12/no-image-available-icon-6.png'
                                }
                                alt="inventory img"
                              />
                            </Paper>
                          </div>
                        </div>
                        <div className="each-slide">
                          <div>
                            <Paper className="wrapperNoImage" elevation={3}>
                              <img
                                className="rounded mx-auto d-block img-responsive wrapperImage"
                                src={
                                  this.props.location.state.image_url3 !==
                                  'null'
                                    ? `http://10.7.10.6:8443/node/${this.props.location.state.image_url3}?boAgRwlfX5=${this.props.login.token}`
                                    : 'https://digitalfinger.id/wp-content/uploads/2019/12/no-image-available-icon-6.png'
                                }
                                alt="inventory img"
                              />
                            </Paper>
                          </div>
                        </div>
                      </Slide>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    justifyContent="space-between"
                  >
                    {/* <div className="d-flex flex-column align-items-end btnEdit"> */}
                    <div className="col-12 col-md-12 col-xl-12 d-flex flex-column align-self-start align-items-start">
                      <div className="col-12 col-md-12 col-xl-12">
                        <dl className="row">
                          <dt className="col-sm-2 h5"> Product ID</dt>
                          <dd className="col-sm-10 h3">
                            {' '}
                            {this.props.location.state.inventory_no}
                          </dd>
                        </dl>
                      </div>
                      <div className="col-12 col-md-12 col-xl-12">
                        <dl className="row">
                          <dt className="col-sm-2 h5"> Brand</dt>
                          <dd className="col-sm-10 h3">
                            {' '}
                            {this.props.location.state.brand}
                          </dd>
                        </dl>
                      </div>
                      <div className="col-12 col-md-12 col-xl-12">
                        <dl className="row">
                          <dt className="col-sm-2 h5"> Serial Number</dt>
                          <dd className="col-sm-10 h3">
                            {' '}
                            {this.props.location.state.serial_no}
                          </dd>
                        </dl>
                      </div>
                      <div className="col-12 col-md-12 col-xl-12">
                        <dl className="row">
                          <dt className="col-sm-2 h5"> Category</dt>
                          <dd className="col-sm-10 h3">
                            {' '}
                            {this.props.location.state.category_name}
                          </dd>
                        </dl>
                      </div>
                      <div className="col-12 col-md-12 col-xl-12">
                        <dl className="row">
                          <dt className="col-sm-2 h5"> Status</dt>
                          <dd className="col-sm-10 h3">
                            {' '}
                            {this.props.location.state.status_name}
                          </dd>
                        </dl>
                      </div>
                      <div className="col-12 col-md-12 col-xl-12">
                        <dl className="row">
                          <dt className="col-sm-2 h5"> Purchase Date</dt>
                          <dd className="col-sm-10 h3">
                            {' '}
                            {this.props.location.state.purchase_date}
                          </dd>
                        </dl>
                      </div>
                      <div className="col-12 col-md-12 col-xl-12">
                        <dl className="row">
                          <dt className="col-sm-2 h5"> Invoice No</dt>
                          <dd className="col-sm-10 h3">
                            {' '}
                            {this.props.location.state.invoice_no == 'null'
                              ? '-'
                              : this.props.location.state.invoice_no}
                          </dd>
                        </dl>
                      </div>
                      <div className="col-12 col-md-12 col-xl-12">
                        <dl className="row">
                          <dt className="col-sm-2 h5"> Warranty Date</dt>
                          <dd className="col-sm-10 h3">
                            {' '}
                            {this.props.location.state.warranty == 1
                              ? this.props.location.state.warranty_exp
                              : '-'}
                          </dd>
                        </dl>
                      </div>
                      <div className="col-12 col-md-12 col-xl-12">
                        <dl className="row">
                          <dt className="col-sm-2 h5"> Accessories</dt>
                          <dd className="col-sm-10 h3">
                            {' '}
                            {this.props.location.state.accessories}
                          </dd>
                        </dl>
                      </div>
                      <div className="col-12 col-md-12 col-xl-12">
                        <dl className="row">
                          <dt className="col-sm-2 h5"> Description</dt>
                          <dd className="col-sm-10 h3">
                            {' '}
                            {this.props.location.state.note}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    {/* </div> */}

                    {/* <Button
                      onClick={this.toggleEditModal}
                      variant="contained"
                      color="primary"
                      startIcon={<Edit />}
                    >
                      Edit
                    </Button> */}
                  </Grid>
                  {/* <Grid item xs>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className="ButtonApprove mb-3"
                      onClick={() => {
                        alert('Approved')
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      className="ButtonRejected mb-3"
                      onClick={() => {
                        alert('Rejected')
                      }}
                    >
                      Reject
                    </Button>
                  </Grid> */}
                </Grid>
                <div className="d-flex flex-row justify-content-between pt-3">
                  <div className="d-flex flex-fill p-2">
                    <button
                      type="button"
                      className="btn btn-block btn-outline-danger"
                      onClick={this.toggleEditModal}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="d-flex flex-fill p-2">
                    <a
                      target="_blank"
                      href={`http://10.7.10.6:8443/node/${this.props.location.state.codeQr}?boAgRwlfX5=${this.props.login.token}`}
                      className="btn btn-block btn-outline-danger"
                    >
                      QR Code
                    </a>
                  </div>
                </div>
                <div className="pl-2 pr-2">
                  <Link
                    to="/admin/inventory"
                    className="btn btn-block btn-outline-danger"
                  >
                    Close
                  </Link>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {/* Edit Modal */}
        <Modal isOpen={this.state.showEditModal}>
          <ModalHeader className="h1">Edit Inventory</ModalHeader>
          <Form>
            <ModalBody>
              <h6>Name</h6>
              <Input
                type="text"
                name="name"
                value={this.state.name}
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Brand</h6>
              <Input
                type="text"
                name="brand"
                value={this.state.brand}
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Serial No</h6>
              <Input
                type="text"
                name="serial_no"
                value={this.state.serial_no}
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Note</h6>
              <Input
                type="textarea"
                name="note"
                value={this.state.note}
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Accessories</h6>
              <Input
                type="textarea"
                name="accessories"
                value={this.state.accessories}
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <FormGroup>
                <h6>Category</h6>
                <Input
                  value={this.state.category}
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
                value={this.state.purchase_date}
                type="date"
                name="purchase_date"
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
              {parseInt(this.state.warranty) !== 0 ? (
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
                <h6>Picture 1</h6>
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
            </ModalBody>
            <ModalFooter>
              {this.state.isLoadingUpdate ? (
                <Button color="primary">
                  <div
                    className="spinner-border spinner-border-sm text-danger"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </Button>
              ) : (
                <Button
                  color="secondary"
                  onClick={() => {
                    this.update()
                  }}
                >
                  Submit
                </Button>
              )}
              <Button color="primary" onClick={this.toggleEditModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  inventory: state.inventory,
  invoice: state.invoice,
  login: state.login,
})
const mapDispatchToProps = { patchInventory, newToken }

export default connect(mapStateToProps, mapDispatchToProps)(InventoryDetail)
