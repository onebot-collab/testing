/* eslint-disable lines-between-class-members */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react'
// import Calendar from 'rc-calendar';
import FullCalendar from 'rc-calendar/lib/full-calendar'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/en-gb'
// import { connect } from 'react-redux'
import 'react-pro-sidebar/dist/css/styles.css'
import './Calendar.css'
import { makeStyles } from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
// import IconButton from '@material-ui/core/IconButton'
// import Avatar from '@material-ui/core/Avatar'
// import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
// import TableHead from '@material-ui/core/TableHead'
// import TableCell from '@material-ui/core/TableCell'
// import TableBody from '@material-ui/core/TableBody'
// import TableRow from '@material-ui/core/TableRow'
// import Fab from '@material-ui/core/Fab'

// @material-ui/icons
// import Edit from '@material-ui/icons/Edit'
// import { Visibility } from '@material-ui/icons'
// import Delete from '@material-ui/icons/Delete'

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
// import stylesBody from '../../assets/jss/material-dashboard-react/components/tasksStyle'

// import img1 from '../../assets/img/new_logo.png'
const format = 'YYYY-MM-DD'
const cn = location.search.indexOf('cn') !== -1

function onSelect(value) {
  console.log('select', value.format(format))
}

const now = moment()
if (cn) {
  now.locale('zh-cn').utcOffset(8)
} else {
  now.locale('en-gb').utcOffset(0)
}

const defaultCalendarValue = now.clone()
defaultCalendarValue.add(-1, 'month')

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'month',
    }
    this.handleChange = this.handleChange.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
  }
  componentDidMount() {}

  renderEvents() {}

  render() {
    const classes = makeStyles(styles)
    const classesHead = makeStyles(stylesHead)
    // const classesBody = makeStyles(stylesBody)
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitleWhite}>Calendar Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  Last Updated 11/11/2020
                </p>
              </CardHeader>
              <CardBody>
                <Table className={classesHead.table}>
                  <FullCalendar
                    style={{ margin: 10 }}
                    Select={onSelect}
                    fullscreen
                    defaultValue={now}
                    onSelect={onSelect}
                    type={this.state.type}
                    onTypeChange={this.onTypeChange}
                    locale={cn ? this.zhCN : this.enUS}
                  />
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
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
