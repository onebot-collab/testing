/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
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
// import Fab from '@material-ui/core/Fab'
// @material-ui/icons
import Store from '@material-ui/icons/Store'
// import Warning from '@material-ui/icons/Warning'
import Add from '@material-ui/icons/Add'
import CheckCircle from '@material-ui/icons/CheckCircle'
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
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'

// import Danger from '../../components/Typography/Danger'
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'
import CardIcon from '../../components/Card/CardIcon'
import CardFooter from '../../components/Card/CardFooter'

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
export default class Ticketing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddModal: false,
      selectedOption: false,
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
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Store />
                </CardIcon>
                <p className="cardCategory">Department</p>
                <h3 className="cardTitle">00</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>Department</div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className="cardCategory">Observer</p>
                <h3 className="cardTitle">00</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>Observer</div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Store />
                </CardIcon>
                <p className="cardCategory">Received</p>
                <h3 className="cardTitle">00</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>Received</div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className="cardCategory">Sent</p>
                <h3 className="cardTitle">00</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>Sent</div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
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
                <h4 className={classes.cardTitleWhite}>Ticketing Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  Last Updated 11/11/2020
                </p>
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
                      <TableCell component="th">Is Late</TableCell>
                      <TableCell component="th">Created At</TableCell>
                      <TableCell component="th">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={classesBody.tableRow}>
                      <TableCell component="th">1-GMI-11-11-2020</TableCell>
                      <TableCell component="th">Samantha</TableCell>
                      <TableCell component="th">John</TableCell>
                      <TableCell component="th">Marsha</TableCell>
                      <TableCell component="th">
                        <span className="badge badge-pill badge-warning">
                          Waiting
                        </span>
                        <span className="badge badge-pill badge-danger">
                          Rejected
                        </span>
                        <span className="badge badge-pill badge-success">
                          Approved
                        </span>
                        <span className="badge badge-pill badge-primary">
                          Processed
                        </span>
                        <span className="badge badge-pill badge-dark">
                          Closed
                        </span>
                      </TableCell>
                      <TableCell className={classesBody.tableActions}>
                        <Tooltip
                          id="tooltip-top-start"
                          title="Out time"
                          placement="top"
                          classes={{ tooltip: classesBody.tooltip }}
                        >
                          <CheckCircle className={classesBody.CheckCircle} />
                        </Tooltip>
                      </TableCell>
                      <TableCell component="th">11/11/2020</TableCell>
                      <TableCell className={classesBody.tableActions}>
                        <Tooltip
                          id="tooltip-top-start"
                          title="Click to Detail"
                          placement="top"
                          classes={{ tooltip: classesBody.tooltip }}
                        >
                          <Visibility className={classesBody.CheckCircle} />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
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
      </div>
    )
  }
}
