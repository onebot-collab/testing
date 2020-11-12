/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React from 'react'
import { Switch, Route } from 'react-router-dom'
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import Navbar from '../components/Navbars/Navbar'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import FixedPlugin from '../components/FixedPlugin/FixedPlugin'

// Dashboard Sidebar
import DashboardRoutes from '../pages/Dashboard'

// core components/views for routes
import ActualDashboard from '../pages/ActualDashboard/ActualDashboard'
import Announcement from '../pages/Announcement/Announcement'
import AnnouncementDetail from '../pages/Announcement/AnnouncementDetail'
import Attendance from '../pages/Attendance/Actual'
import IdUserAttendance from '../pages/Attendance/IdUser'
import CalendarScreen from '../pages/Calendar/Calendar'
import Inventory from '../pages/Inventory/Inventory'
import Invoice from '../pages/Invoice/Invoice'
import InvoiceDetail from '../pages/Invoice/InvoiceDetail'
import Permissions from '../pages/Permissions/Permissions'
import PermissionsDetail from '../pages/Permissions/PermissionsDetail'
import Report from '../pages/Report/Report'
import ReportDetail from '../pages/Report/ReportDetail'
import Ticketing from '../pages/Ticketing/Actual'
import TicketingDetail from '../pages/Ticketing/TicketingDetail'
import User from '../pages/User/Actual'

import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle'

import bgImage from '../assets/img/sidebar-2.jpg'
import logo from '../assets/img/reactlogo.png'

let ps

// const switchRoutes = (
//   <Switch>
//     {DashboardRoutes.map((prop, key) => {
//       if (prop.layout === '/admin') {
//         return (
//           <Route
//             path={prop.layout + prop.path}
//             component={prop.component}
//             key={key}
//           />
//         )
//       }
//       return null
//     })}
//     <Redirect from="/admin" to="/admin/dashboard" />
//   </Switch>
// )

const switchRoutes = (
  <Switch>
    <Route exact path="/admin/dashboard" component={ActualDashboard} />
    <Route exact path="/admin/announcement" component={Announcement} />
    <Route exact path="/admin/announcement/:id" component={AnnouncementDetail} />
    <Route exact path="/admin/attendance" component={Attendance} />
    <Route exact path="/admin/id-attendance" component={IdUserAttendance} />
    <Route exact path="/admin/calendar" component={CalendarScreen} />
    <Route exact path="/admin/inventory" component={Inventory} />
    <Route exact path="/admin/invoice" component={Invoice} />
    <Route exact path="/admin/invoice/:id" component={InvoiceDetail} />
    <Route exact path="/admin/permissions" component={Permissions} />
    <Route exact path="/admin/permissions/:id" component={PermissionsDetail} />
    <Route exact path="/admin/report" component={Report} />
    <Route exact path="/admin/report/:id" component={ReportDetail} />
    <Route exact path="/admin/ticketing" component={Ticketing} />
    <Route exact path="/admin/ticketing/:id" component={TicketingDetail} />
    <Route exact path="/admin/user" component={User} />
  </Switch>
)

const useStyles = makeStyles(styles)

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles()
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef()
  // states and functions
  const [image, setImage] = React.useState(bgImage)
  const [color, setColor] = React.useState('red')
  const [fixedClasses, setFixedClasses] = React.useState('dropdown')
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleImageClick = (image) => {
    setImage(image)
  }
  const handleColorClick = (color) => {
    setColor(color)
  }
  const handleFixedClick = () => {
    if (fixedClasses === 'dropdown') {
      setFixedClasses('dropdown show')
    } else {
      setFixedClasses('dropdown')
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const getRoute = () => window.location.pathname !== '/admin/maps'
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false)
    }
  }
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
      document.body.style.overflow = 'hidden'
    }
    window.addEventListener('resize', resizeFunction)
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
      window.removeEventListener('resize', resizeFunction)
    }
  }, [mainPanel])
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={DashboardRoutes}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={DashboardRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  )
}
