/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import './InventoryDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import { Link } from 'react-router-dom'
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
// @material-ui/icons
import Edit from '@material-ui/icons/Edit'
// import { Visibility } from '@material-ui/icons'

// import Check from '@material-ui/icons/Check'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'

// Import Image
// import image1 from '../../assets/img/faces/marc.jpg'

export default class InventoryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditModal: false,
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

  componentDidMount() {}

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)
    return (
      <div>
        <Button
          onClick={this.toggleEditModal}
          variant="contained"
          color="primary"
          // className="buttonAdd"
          startIcon={<Edit />}
        >
          Edit
        </Button>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Inventory Detail</h4>
                <p className={classes.cardCategoryWhite}>
                  {this.props.location.state.created_at}
                </p>
              </CardHeader>
              <CardBody>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={4}>
                    <div>
                      <Paper className="wrapperNoImage" elevation={3}>
                        <img
                          className="rounded mx-auto d-block img-responsive wrapperImage"
                          src={`http://10.5.1.38:5000/${this.props.location.state.image_url}`}
                          alt="inventory img"
                        />
                      </Paper>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    className="contentDescWrapper"
                  >
                    <ListItem className="listItemWidth">
                      <ListItemText>
                        <h2>{this.props.location.state.name}</h2>
                        <h5>{this.props.location.state.brand}</h5>
                      </ListItemText>
                    </ListItem>
                    <ListItem className="textBodyRow">
                      <h6 className="textBodyBold">S/N : </h6>
                      <h6>&nbsp;{this.props.location.state.serial_no}</h6>
                    </ListItem>
                    <ListItem className="textBodyRow">
                      <h6 className="textBodyBold">Exp Date : </h6>
                      <h6>&nbsp;{this.props.location.state.exp_date}</h6>
                    </ListItem>
                    <Typography variant="body2">
                      <p className="textPrimaryColor">
                        {this.props.location.state.note}
                      </p>
                    </Typography>
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
                  // onChange={(e) =>
                  //   this.setState({
                  //     fileInventory: e.target.files[0],
                  //   })
                  // }
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
                <Button
                  color="secondary"
                  onClick={() => {
                    alert('Edit Modal')
                  }}
                >
                  Submit
                </Button>
              )}
              <Button color="secondary" onClick={this.toggleEditModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}
