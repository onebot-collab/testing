/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import './AnnouncementDetail.css'
import 'react-pro-sidebar/dist/css/styles.css'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
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

// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
// import { Visibility } from '@material-ui/icons'
// import CalendarToday from '@material-ui/icons/CalendarToday'
// import Apartment from '@material-ui/icons/Apartment'
// import AssignmentInd from '@material-ui/icons/AssignmentInd'
import Edit from '@material-ui/icons/Edit'
import Attachment from '@material-ui/icons/Attachment'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Cancel from '@material-ui/icons/Cancel'
// import {
//   getAllCampaign,
//   deleteCampaign,
//   postCampaign,
// } from '../../redux/actions/campaign'
// import { getDepartment } from '../../redux/actions/department'

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

export default class AnnouncementDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditModal: false,
      // selectedDepartment: false,
    }
    this.toggleEditModal = this.toggleEditModal.bind(this)
    // this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // handleDepartmentChange(e) {
  //   this.setState({ selectedDepartment: e.value })
  // }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleEditModal() {
    this.setState({
      showEditModal: !this.state.showEditModal,
    })
  }

  renderEvents() {}

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
                <h4 className={classes.cardTitleWhite}>
                  {this.props.location.state.title}
                </h4>
                <p className={classes.cardCategoryWhite}>
                  by {this.props.location.state.createdby_name}
                </p>
              </CardHeader>
              <CardBody>
                <Grid item xs container direction="column" spacing={2}>
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
                </Grid>
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
              <Select
              // onChange={this.handleDepartmentChange}
              // options={departmentData.map((res) => ({
              //   value: res.id,
              //   label: res.name,
              // }))}
              />
            </ModalBody>
            <ModalFooter>
              {this.state.isLoadingAddCampaign ? (
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
                    alert('Updated Alert')
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

// const mapDispatchToProps = {
//   getAllCampaign,
//   deleteCampaign,
//   postCampaign,
//   getDepartment,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementDetail)
