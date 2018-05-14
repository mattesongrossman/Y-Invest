import React from "react"
import PropTypes from "prop-types"
import Auth from "../../modules/Auth"
// material-ui components
import withStyles from "material-ui/styles/withStyles"
import InputAdornment from "material-ui/Input/InputAdornment"

// @material-ui/icons
import Face from "@material-ui/icons/Face"
import Email from "@material-ui/icons/Email"
import LockOutline from "@material-ui/icons/LockOutline"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import ItemGrid from "components/Grid/ItemGrid.jsx"
import LoginCard from "components/Cards/LoginCard.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"
import Button from "components/CustomButtons/Button.jsx"

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx"
import { Redirect } from "react-router-dom"

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      auth: Auth.isUserAuthenticated(),
      username: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" })
      }.bind(this),
      700
    )
  }

  handleLoginSubmit(e) {
    e.preventDefault()
    fetch("/pages/login", {
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

  handleChange(e) {
    let name = e.target.name
    let val = e.target.value
    // console.log(name + " - " + val)
    this.setState({
      [name]: val
    })
    // console.log(this.state.username)
  }

  render() {
    const { classes } = this.props
    const handleChange = this.handleChange
    const handleLoginSubmit = this.handleLoginSubmit
    const loginUser = this.loginUser
    const auth = this.state

    return this.state.auth ? (
      (setTimeout(function() {
        alert("Logged in")
      }, 500),
      <Redirect to="/dashboard" />)
    ) : (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <ItemGrid xs={12} sm={6} md={4}>
              <form onSubmit={handleLoginSubmit}>
                <LoginCard
                  customCardClass={classes[this.state.cardAnimaton]}
                  headerColor="green"
                  cardTitle="Login"
                  cardSubtitle="Let's Make Money"
                  footerAlign="center"
                  footer={
                    <Button color="white" type="submit" wd size="lg">
                      Let's Go
                    </Button>
                  }
                  content={
                    <div>
                      <CustomInput
                        labelText="Username..."
                        id="username"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: handleChange,
                          name: "username",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: handleChange,
                          type: "password",
                          name: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline
                                className={classes.inputAdornmentIcon}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                  }
                />
              </form>
            </ItemGrid>
          </GridContainer>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(loginPageStyle)(LoginPage)
