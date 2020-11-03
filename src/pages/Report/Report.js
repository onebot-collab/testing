/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import 'react-pro-sidebar/dist/css/styles.css'
import './Report.css'
import { makeStyles } from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
// import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
// import Fab from '@material-ui/core/Fab'

// @material-ui/icons
import Add from '@material-ui/icons/Add'
import Visibility from '@material-ui/icons/Visibility'

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
  { value: 'General', label: 'General' },
  { value: 'Development', label: 'Development' },
  { value: 'Networking', label: 'Networking' },
]

export default class Report extends Component {
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

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    const classesBody = makeStyles(stylesBody)
    const { selectedOption } = this.state
    return (
      <div>
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
                <h4 className={classes.cardTitleWhite}>Report Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  Last Updated 11/11/2020
                </p>
              </CardHeader>
              <CardBody>
                <Table className={classesHead.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell component="th">Name</TableCell>
                      <TableCell component="th">Description</TableCell>
                      <TableCell component="th">Attachment</TableCell>
                      <TableCell component="th">Created At</TableCell>
                      <TableCell component="th">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={classes.tableRow}>
                      <TableCell component="th">Samantha</TableCell>
                      <TableCell component="th">
                        Lorem ipsum dolor ....
                      </TableCell>
                      <TableCell component="th">
                        <span className="badge badge-success">Report.pdf</span>
                        <span className="badge badge-secondary">
                          No Attachment
                        </span>
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

// const mapStateToProps = state => ({ events: state.events })

// const mapDispatchToProps = {}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Announcement)
