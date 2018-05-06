import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Auth from "./modules/Auth"

import Dashboard from "layouts/Dashboard.jsx"
import Pages from "layouts/Pages.jsx"
import dashRoutes from "routes/dashboard.jsx"
import pagesRoutes from "routes/pages.jsx"

import ExtendedTables from "views/Tables/ExtendedTables.jsx"
import ReactTables from "views/Tables/ReactTables.jsx"
import Charts from "views/Charts/Charts.jsx"
import LoginPage from "views/Pages/LoginPage.jsx"
import RegisterPage from "views/Pages/RegisterPage.jsx"

// import pagesRoutes from "./pages.jsx"

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard"
import Image from "@material-ui/icons/Image"

import GridOn from "@material-ui/icons/GridOn"

import Timeline from "@material-ui/icons/Timeline"
import InsertChart from "@material-ui/icons/InsertChart"

import Homepage from "views/Homepage"

class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: Auth.isUserAuthenticated()
    }
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }

  handleRegisterSubmit(e, data) {
    e.preventDefault()
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        user: data
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        // if (res.token) {
        console.log(res)
        // Auth.authenticateToken(res.token)
        // this.setState({
        //   auth: Auth.isUserAuthenticated()
      })
    //   }
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }

  handleLoginSubmit(e) {
    e.preventDefault()
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.loginUserName,
        password: this.state.loginPassword
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.token) {
          Auth.authenticateToken(res.token)
          this.setState({
            auth: Auth.isUserAuthenticated(),
            loginUserName: "",
            loginUserPassword: ""
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Router>
        <div className="container">
          {/* <Route exact="/dashboard" component={Dashboard} /> */}
          {/* <Route exact path="/pages/login-page" component={Pages} /> */}
          <Route exact path="/register-page" render={() => <RegisterPage />} />
        </div>
      </Router>
    )
  }
}

export default App
