import Dashboard from "views/Dashboard/Dashboard.jsx"
import PortfolioTable from "views/Tables/PortfolioTable.jsx"
import InvestmentTables from "views/Tables/InvestmentTables.jsx"
import Charts from "views/Charts/Charts.jsx"
import UserProfile from "views/Pages/UserProfile.jsx"

import pagesRoutes from "./pages.jsx"

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard"
import GridOn from "@material-ui/icons/GridOn"
import Timeline from "@material-ui/icons/Timeline"
import InsertChart from "@material-ui/icons/InsertChart"
import Fingerprint from "@material-ui/icons/Fingerprint"

var pages = [].concat(pagesRoutes)

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
    name: "User Actions",
    state: "openPages",
    icon: Fingerprint,
    views: pages
  },
  {
    path: "/table",
    name: "Investment Hub",
    icon: Timeline,
    component: InvestmentTables
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    icon: GridOn,
    component: PortfolioTable
  },
  {
    path: "/charts",
    name: "Charts",
    icon: InsertChart,
    component: Charts
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
]
export default dashRoutes
