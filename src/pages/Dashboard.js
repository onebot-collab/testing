// @material-ui/icons
import iconDashboard from '@material-ui/icons/Dashboard'
import iconAnnouncement from '@material-ui/icons/Announcement'
import iconAttendance from '@material-ui/icons/Person'
import iconCalendar from '@material-ui/icons/CalendarToday'
import iconInventory from '@material-ui/icons/Archive'
import iconInvoice from '@material-ui/icons/ShoppingCart'
import iconPermissions from '@material-ui/icons/Assignment'
import iconReport from '@material-ui/icons/Bookmarks'
import iconTicketing from '@material-ui/icons/ConfirmationNumber'
import iconUser from '@material-ui/icons/GroupAdd'

// core components/views for Admin layout
import ActualDashboard from './ActualDashboard/ActualDashboard'
import Announcement from './Announcement/Announcement'
import Attendance from './Attendance/Actual'
// import AllUserAttendance from './Attendance/AllUser'
// import IdUserAttendance from './Attendance/IdUser'
import CalendarScreen from './Calendar/Calendar'
import Inventory from './Inventory/Inventory'
import Invoice from './Invoice/Invoice'
import Permissions from './Permissions/Permissions'
import Report from './Report/Report'
import Ticketing from './Ticketing/Actual'
// import Department from './Ticketing/Department'
// import Observer from './Ticketing/Observer'
// import Sent from './Ticketing/Sent'
import User from './User/Actual'
// import AddUser from './User/AddUser'
// import EditUser from './User/EditUser'
// import ListUser from './User/ListUser'

const DashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: iconDashboard,
    component: ActualDashboard,
    layout: '/admin',
  },
  {
    path: '/attendance',
    name: 'Attendance',
    icon: iconAttendance,
    component: Attendance,
    layout: '/admin',
  },
  {
    path: '/announcement',
    name: 'Announcement',
    icon: iconAnnouncement,
    component: Announcement,
    layout: '/admin',
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: iconCalendar,
    component: CalendarScreen,
    layout: '/admin',
  },
  {
    path: '/inventory',
    name: 'Inventory',
    icon: iconInventory,
    component: Inventory,
    layout: '/admin',
  },
  {
    path: '/invoice',
    name: 'Invoice',
    icon: iconInvoice,
    component: Invoice,
    layout: '/admin',
  },
  {
    path: '/permissions',
    name: 'Permissions',
    icon: iconPermissions,
    component: Permissions,
    layout: '/admin',
  },
  {
    path: '/report',
    name: 'Report',
    icon: iconReport,
    component: Report,
    layout: '/admin',
  },
  {
    path: '/ticketing',
    name: 'Ticketing',
    icon: iconTicketing,
    component: Ticketing,
    layout: '/admin',
  },
  {
    path: '/user',
    name: 'User',
    icon: iconUser,
    component: User,
    layout: '/admin',
  },
]

export default DashboardRoutes
