import React, { Component } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Auth from "./modules/Auth"

import Dashboard from "layouts/Dashboard.jsx"
import Pages from "layouts/Pages.jsx"
import dashRoutes from "routes/dashboard.jsx"
import pagesRoutes from "routes/pages.jsx"

import ExtendedTables from "views/Tables/ExtendedTables.jsx"
import ReactTables from "views/Tables/ReactTables.jsx"
import Charts from "views/Charts/Charts.jsx"
import LoginPage from "views/Pages/LoginPage.jsx"
import LoginForm from "views/Pages/LoginPage.jsx"
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
      auth: Auth.isUserAuthenticated(),
      username: "",
      password: ""
    }
    // this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleLoginSubmit(e) {
    e.preventDefault()
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
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
            username: "",
            password: ""
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { username } = this.state
    return (
      <Router>
        <div className="container">
          <Route path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/login"
            render={() =>
              !this.state.auth ? (
                <LoginForm
                  auth={this.state.auth}
                  username={this.state.username}
                  password={this.state.password}
                  handleInputChange={this.handleInputChange}
                  handleLoginSubmit={this.handleLoginSubmit}
                />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route exact path="/register-page" render={() => <RegisterPage />} />
        </div>
      </Router>
    )
  }
}

export default App
