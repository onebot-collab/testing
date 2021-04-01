/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable radix */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './AnnouncementDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
// import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import Paper from '@material-ui/core/Paper'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
// import { Link } from 'react-router-dom'
import Select from 'react-select'
import {
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from 'reactstrap'
import swal from 'sweetalert2'

// @material-ui/icons
import Edit from '@material-ui/icons/Edit'
// import { Visibility } from '@material-ui/icons'
// import CalendarToday from '@material-ui/icons/CalendarToday'
// import Apartment from '@material-ui/icons/Apartment'
// import AssignmentInd from '@material-ui/icons/AssignmentInd'
// import Attachment from '@material-ui/icons/Attachment'
// import CheckCircle from '@material-ui/icons/CheckCircle'
// import Cancel from '@material-ui/icons/Cancel'
// import {
//   getAllCampaign,
//   deleteCampaign,
//   postCampaign,
// } from '../../redux/actions/campaign'
import { getDepartment } from '../../redux/actions/department'
import { patchCampaign } from '../../redux/actions/campaign'
import { newToken } from '../../redux/actions/login'

// import Check from '@material-ui/icons/Check'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'

// core components
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
// import stylesHead from '../../assets/jss/material-dashboard-react/components/tableStyle'
// import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

class AnnouncementDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditModal: false,
      title: `${this.props.location.state.title}`,
      description: `${this.props.location.state.description}`,
      departmentId: `${this.props.location.state.departmentId}`,
      isLoadingUpdate: false,
    }
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleDepartmentChange(e) {
    this.setState({ departmentId: e.value })
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
    const dataSubmit = {
      title: this.state.title,
      description: this.state.description,
      department: parseInt(this.state.departmentId),
    }

    this.props
      .patchCampaign(id, dataSubmit, this.props.login.token)
      .then((res) => {
        this.props.newToken(res.action.payload.data.newToken).then(() => {
          this.setState({ isLoadingUpdate: false })
          this.props.history.push('/admin/announcement')
          swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Announcement successfully edited',
          })
        })
      })
      .catch(() => {
        swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to edit announcement',
        })
      })
  }

  componentDidMount() {
    this.props.getDepartment(this.props.login.token).then((res) => {
      this.props.newToken(res.action.payload.data.newToken)
    })
  }

  render() {
    const classes = makeStyles(styles)
    // const classesHead = makeStyles(stylesHead)
    // const classesBody = makeStyles(stylesBody)
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
                <div className="d-flex flex-row justify-content-between">
                  <h4 className={classes.cardTitleWhite}>
                    {this.props.location.state.title}
                  </h4>
                  {/* <p className={classes.cardCategoryWhite}>
                    by {this.props.location.state.createdby_name}
                  </p> */}
                </div>
              </CardHeader>
              <CardBody>
                <div className="column">
                  <div className="col-12 col-md-12 col-xl-12">
                    <dl className="row">
                      <dt className="col-sm-2"> Created at</dt>
                      <dd className="col-sm-10">
                        {' '}
                        {this.props.location.state.created_at}
                      </dd>
                    </dl>
                  </div>
                  <div className="col-12 col-md-12 col-xl-12">
                    <dl className="row">
                      <dt className="col-sm-2"> Department</dt>
                      <dd className="col-sm-10">
                        {' '}
                        {this.props.location.state.departmentName}
                      </dd>
                    </dl>
                  </div>
                  <div className="col-12 col-md-12 col-xl-12">
                    <dl className="row">
                      <dt className="col-sm-2"> Description</dt>
                      <dd className="col-sm-10">
                        {' '}
                        {this.props.location.state.description}
                      </dd>
                    </dl>
                  </div>
                  <blockquote className="blockquote text-right">
                    <footer className="blockquote-footer">
                      by {this.props.location.state.createdby_name}{' '}
                    </footer>
                  </blockquote>
                </div>

                {/* <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs> 
                    <ListItem className="listItemWidth">
                      <ListItemText>
                        <Typography variant="subtitle1">
                          {this.props.location.state.departmentName}
                        </Typography>
                        <Typography variant="subtitle1">
                          {this.props.location.state.created_at}
                        </Typography>
                      </ListItemText>
                    </ListItem>

                    <Typography variant="body2" className="paperGridCentre">
                      <p className="textPrimaryColor">
                        {this.props.location.state.description}
                      </p>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Paper elevation={2} className="d-flex flex-row p-3">
                      <ListItem>
                        <ListItemIcon>
                          <Attachment edge="start" />
                        </ListItemIcon>
                        <ListItemText>file.pdf</ListItemText>
                        <ListItemIcon>
                          <Cancel edge="end" className="CancelColor" />
                          <CheckCircle
                            edge="end"
                            className="CheckCircleColor"
                          />
                        </ListItemIcon>
                      </ListItem>
                    </Paper>
                  </Grid>
                </Grid> */}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {/* Edit Modal */}
        <Modal isOpen={this.state.showEditModal}>
          <ModalHeader className="h1">Edit Announcement</ModalHeader>
          <Form>
            <ModalBody>
              <h6>Title</h6>
              <Input
                type="text"
                name="title"
                value={this.state.title}
                className="mb-2 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Description</h6>
              <Input
                type="textarea"
                name="description"
                value={this.state.description}
                className="mb-3 shadow-none"
                onChange={this.handleChange}
              />
              <h6>Department</h6>
              <Select
                onChange={this.handleDepartmentChange}
                options={this.props.department.dataDepartment.map((res) => ({
                  value: res.id,
                  label: res.name,
                }))}
              />
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
                  Edit
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

const mapDispatchToProps = {
  getDepartment,
  patchCampaign,
  newToken,
}
const mapStateToProps = (state) => ({
  department: state.department,
  campaign: state.campaign,
  login: state.login,
})

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementDetail)
