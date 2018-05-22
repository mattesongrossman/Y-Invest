import Logout from "views/Pages/Logout.jsx"
import LoginPage from "views/Pages/LoginPage.jsx"
import RegisterPage from "views/Pages/RegisterPage.jsx"
// import LockScreenPage from "views/Pages/LockScreenPage.jsx"

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd"
import Fingerprint from "@material-ui/icons/Fingerprint"
import LockOpen from "@material-ui/icons/LockOpen"

const pagesRoutes = [
  {
    path: "/pages/register",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    icon: PersonAdd,
    component: RegisterPage
  },
  {
    path: "/pages/login",
    name: "Login",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    path: "/pages/logout",
    name: "Logout",
    short: "Logout",
    mini: "LOG",
    icon: LockOpen,
    component: Logout
  },
  // {
  //   path: "/pages/lock-screen-page",
  //   name: "Lock Screen Page",
  //   short: "Lock",
  //   mini: "LSP",
  //   icon: LockOpen,
  //   component: LockScreenPage
  // },
  {
    redirect: true,
    path: "/pages",
    pathTo: "/register",
    name: "Register Page"
  }
]

export default pagesRoutes
