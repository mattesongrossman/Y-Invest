import Dashboard from "views/Dashboard/Dashboard.jsx"
// import Buttons from "views/Components/Buttons.jsx"
// import GridSystem from "views/Components/GridSystem.jsx"
// import Panels from "views/Components/Panels.jsx"
// import SweetAlert from "views/Components/SweetAlert.jsx"
// import Notifications from "views/Components/Notifications.jsx"
// import Icons from "views/Components/Icons.jsx"
// import Typography from "views/Components/Typography.jsx"
// import RegularForms from "views/Forms/RegularForms.jsx"
// import ExtendedForms from "views/Forms/ExtendedForms.jsx"
// import ValidationForms from "views/Forms/ValidationForms.jsx"
// import Wizard from "views/Forms/Wizard.jsx"
// import RegularTables from "views/Tables/RegularTables.jsx"
// import ExtendedTables from "views/Tables/ExtendedTables.jsx"
import ReactTables from "views/Tables/ReactTables.jsx"
// import GoogleMaps from "views/Maps/GoogleMaps.jsx"
// import FullScreenMap from "views/Maps/FullScreenMap.jsx"
// import VectorMap from "views/Maps/VectorMap.jsx"
import Charts from "views/Charts/Charts.jsx"
// import Calendar from "views/Calendar/Calendar.jsx"
// import Widgets from "views/Widgets/Widgets.jsx"
// import UserProfile from "views/Pages/UserProfile.jsx"
// import TimelinePage from "views/Pages/Timeline.jsx"
// import RTLSupport from "views/Pages/RTLSupport.jsx"

import pagesRoutes from "./pages.jsx"

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard"
import Image from "@material-ui/icons/Image"
// import Apps from "@material-ui/icons/Apps"
// import ContentPaste from "@material-ui/icons/ContentPaste"
import GridOn from "@material-ui/icons/GridOn"
// import Place from "@material-ui/icons/Place"
// import WidgetsIcon from "@material-ui/icons/Widgets"
import Timeline from "@material-ui/icons/Timeline"
// import DateRange from "@material-ui/icons/DateRange"

import Homepage from "views/Homepage"

var pages = [
  {
    path: "/users",
    name: "User Page",
    mini: "UP",
    component: Homepage
  }
].concat(pagesRoutes)

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    collapse: true,
    path: "-page",
    name: "Profile",
    state: "openPages",
    icon: Image,
    views: pages
  },

  // {
  //   collapse: true,
  //   path: "/forms",
  //   name: "Forms",
  //   state: "openForms",
  //   icon: ContentPaste,
  //   views: [
  //     {
  //       path: "/forms/regular-forms",
  //       name: "Regular Forms",
  //       mini: "RF",
  //       component: RegularForms
  //     },
  //     {
  //       path: "/forms/extended-forms",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms
  //     },
  //     {
  //       path: "/forms/validation-forms",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms
  //     },
  //     { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard }
  //   ]
  // },
  // {
  //   collapse: true,
  //   path: "/tables",
  //   name: "Tables",
  //   state: "openTables",
  //   icon: GridOn,
  //   views: [
  //     {
  //       path: "/tables/regular-tables",
  //       name: "Regular Tables",
  //       mini: "RT",
  //       component: RegularTables
  //     },
  //     {
  //       path: "/tables/extended-tables",
  //       name: "Extended Tables",
  //       mini: "ET",
  //       component: ExtendedTables
  //     },
  //     {
  //       path: "/tables/react-tables",
  //       name: "React Tables",
  //       mini: "RT",
  //       component: ReactTables
  //     }
  //   ]
  // },
  // { path: "/widgets", name: "Widgets", icon: WidgetsIcon, component: Widgets },
  // { path: "/charts", name: "Charts", icon: Timeline, component: Charts },
  // { path: "/calendar", name: "Calendar", icon: DateRange, component: Calendar },
  {
    path: "/table",
    name: "Investment Hub",
    icon: GridOn,
    component: ReactTables
  },
  { path: "/charts", name: "Portfolio", icon: Timeline, component: Charts },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
]
export default dashRoutes
