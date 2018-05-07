// import React from "react"
// import PropTypes from "prop-types"
//
// // material-ui components
// import withStyles from "material-ui/styles/withStyles"
// import InputAdornment from "material-ui/Input/InputAdornment"
//
// // @material-ui/icons
// // import Face from "@material-ui/icons/Face"
// import Email from "@material-ui/icons/Email"
// import LockOutline from "@material-ui/icons/LockOutline"
//
// // core components
// import GridContainer from "components/Grid/GridContainer.jsx"
// import ItemGrid from "components/Grid/ItemGrid.jsx"
// import LoginCard from "components/Cards/LoginCard.jsx"
// import CustomInput from "components/CustomInput/CustomInput.jsx"
// import Button from "components/CustomButtons/Button.jsx"
//
// import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx"
// import api from "../../Api"
// import Auth from "modules/Auth"

// class LoginPage extends React.Component {
//   constructor(props) {
//     super(props)
//     // we use this to make the card to appear after the page has been rendered
//     this.state = {
//       cardAnimaton: "cardHidden",
//       username: "",
//       password: "",
//       loginUser: false,
//       auth: Auth.isUserAuthenticated(),
//       loginUserName: "",
//       loginUserPassword: ""
//     }
//     // this.handleChange = this.handleChange.bind(this)
//     // this.loginUser = this.loginUser.bind(this)
//   }
//
//   // handleChange(evt) {
//   //   let val = evt.target.value
//   //   let input = evt.target.name
//   //   this.setState({
//   //     [input]: val
//   //   })
//   // }
//
//   // loginUser(evt) {
//   //   evt.preventDefault()
//   //   const { username, password } = this.state
//   //   const body = {
//   //     username: username,
//   //     password: password
//   //   }
//   //   api
//   //     .loginUser(body)
//   //     .then(response => {
//   //       if (response.token) {
//   //         Auth.authenticateToken(response.token)
//   //         this.setState({
//   //           auth: Auth.isUserAuthenticated(),
//   //           loginUserName: "",
//   //           loginUserPassword: "",
//   //           loginUser: true
//   //         })
//   //       }
//   //     })
//   //     .catch(err => {
//   //       console.log(err)
//   //     })
//   // }
//
//   componentDidMount() {
//     // we add a hidden class to the card and after 700 ms we delete it and the transition appears
//     setTimeout(
//       function() {
//         this.setState({ cardAnimaton: "" })
//       }.bind(this),
//       700
//     )
//   }
//
//   render() {
//     const { classes } = this.props
//     const handleChange = this.handleChange
//     const loginUser = this.loginUser
//     const auth = this.state
//
//     return (
//       <div className={classes.content}>
//         <div className={classes.container}>
//           <GridContainer justify="center">
//             <ItemGrid xs={12} sm={6} md={4}>
//               <form>
//                 <LoginCard
//                   customCardClass={classes[this.state.cardAnimaton]}
//                   headerColor="green"
//                   cardTitle="Login"
//                   cardSubtitle="Let's Make Money"
//                   footerAlign="center"
//                   footer={
//                     <Button color="white" type="submit" wd size="lg">
//                       Let's Go
//                     </Button>
//                   }
//                   content={
//                     <div>
//                       <CustomInput
//                         labelText="Username..."
//                         id="username"
//                         formControlProps={{
//                           fullWidth: true
//                         }}
//                         inputProps={{
//                           name: "username",
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <Email className={classes.inputAdornmentIcon} />
//                             </InputAdornment>
//                           )
//                         }}
//                       />
//                       <CustomInput
//                         labelText="Password"
//                         id="password"
//                         formControlProps={{
//                           fullWidth: true
//                         }}
//                         inputProps={{
//                           name: "password",
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <LockOutline
//                                 className={classes.inputAdornmentIcon}
//                               />
//                             </InputAdornment>
//                           )
//                         }}
//                       />
//                     </div>
//                   }
//                 />
//               </form>
//             </ItemGrid>
//           </GridContainer>
//         </div>
//       </div>
//     )
//   }
// }

// class LoginPage extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       username: "",
//       password: ""
//     }
//     this.handleChange = this.handleChange.bind(this)
//   }
//
//   handleChange(e) {
//     let name = e.target.name
//     let val = e.target.value
//     // console.log(name + " - " + val)
//     this.setState({
//       [name]: val
//     })
//     console.log(this.state.username)
//   }
//   render() {
//     return (
//       <div>
//         <form
//           onSubmit={e => {
//             this.props.handleLoginSubmit(e, this.state)
//           }}>
//           <input
//             type="text"
//             name="username"
//             value={this.state.username}
//             placeholder="Username"
//             onChange={this.handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             value={this.state.password}
//             placeholder="Password"
//             onChange={this.handleChange}
//           />
//           <input type="submit" value="Log in!" />
//         </form>
//       </div>
//     )
//   }
// }

// LoginPage.propTypes = {
//   classes: PropTypes.object.isRequired
// }
//
// export default withStyles(loginPageStyle)(LoginPage)
// export default LoginPage

import React from "react"

const LoginForm = props => {
  return (
    <form className="loginform" onSubmit={props.handleLoginSubmit}>
      <input
        type="text"
        name="username"
        value={props.username}
        placeholder="Username"
        onChange={props.handleInputChange}
      />
      <input
        type="password"
        name="password"
        value={props.password}
        placeholder="Password"
        onChange={props.handleInputChange}
      />
      <input type="submit" value="Log in!" />
    </form>
  )
}

export default LoginForm
