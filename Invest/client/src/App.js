// import React, { Component } from "react"
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
// import Auth from "./modules/Auth"
//
// import Dashboard from "layouts/Dashboard.jsx"
// // import Sidebar from "components/Sidebar/Sidebar.jsx"
// // import Pages from "layouts/Pages.jsx"
// // import dashRoutes from "routes/dashboard.jsx"
// // import pagesRoutes from "routes/pages.jsx"
// // import indexRoutes from "routes/index.jsx"
// //
// // import ExtendedTables from "views/Tables/ExtendedTables.jsx"
// // import ReactTables from "views/Tables/ReactTables.jsx"
// // import Charts from "views/Charts/Charts.jsx"
// // import LoginPage from "views/Pages/LoginPage.jsx"
// import LoginForm from "views/Pages/LoginPage.jsx"
// import RegisterPage from "views/Pages/RegisterPage.jsx"
//
// // import pagesRoutes from "./pages.jsx"
//
// // @material-ui/icons
// // import DashboardIcon from "@material-ui/icons/Dashboard"
// // import Image from "@material-ui/icons/Image"
//
// // import GridOn from "@material-ui/icons/GridOn"
//
// // import Timeline from "@material-ui/icons/Timeline"
// // import InsertChart from "@material-ui/icons/InsertChart"
// //
// // import Homepage from "views/Homepage"
//
// class App extends Component {
//   constructor() {
//     super()
//     this.state = {
//       auth: Auth.isUserAuthenticated(),
//       username: "",
//       password: ""
//     }
//     // this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
//     this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
//     this.handleInputChange = this.handleInputChange.bind(this)
//     this.handleLogout = this.handleLogout.bind(this)
//   }
//   handleInputChange(e) {
//     const name = e.target.name
//     const value = e.target.value
//     this.setState({
//       [name]: value
//     })
//   }
//
//   handleLoginSubmit(e) {
//     e.preventDefault()
//     fetch("/login", {
//       method: "POST",
//       body: JSON.stringify({
//         username: this.state.username,
//         password: this.state.password
//       }),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//       .then(res => res.json())
//       .then(res => {
//         console.log(res)
//         if (res.token) {
//           Auth.authenticateToken(res.token)
//           this.setState({
//             auth: Auth.isUserAuthenticated(),
//             username: "",
//             password: ""
//           })
//         }
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
//
//   handleLogout(e) {
//     console.log("logout test")
//   }
//
//   render() {
//     // const { username } = this.state
//   //   return (
//   //     <Router>
//   //       <div className="container">
//   //         {/* RENDER OF DASHBORD WITH SWITCH ROUTES MESSES UP LOGIN */}
//   //         <Route path="/" component={Dashboard} />
//   //         <Route path="/" component={Dashboard} />
//   //         {/* <Route
//   //           exact
//   //           path="/pages/login"
//   //           render={() =>
//   //             !this.state.auth ? (
//   //               <LoginForm
//   //                 auth={this.state.auth}
//   //                 username={this.state.username}
//   //                 password={this.state.password}
//   //                 handleInputChange={this.handleInputChange}
//   //                 handleLoginSubmit={this.handleLoginSubmit}
//   //               />
//   //             ) : (
//   //               <div>
//   //                 (setTimeout(function() {alert("Already logged in")}, 500),
//   //                 <Redirect to="/dashboard" />)
//   //               </div>
//   //             )
//   //           }
//   //         /> */}
//   //         }
//   //         <Route exact path="/register" render={() => <RegisterPage />} />
//   //       </div>
//   //     </Router>
//   //   )
//   // }
//   <Router history={hist}>
//   <Switch>
//     {indexRoutes.map((prop, key) => {
//       return <Route path={prop.path} component={prop.component} key={key} />;
//     })}
//   </Switch>
// </Router>
// }
//
// export default App
