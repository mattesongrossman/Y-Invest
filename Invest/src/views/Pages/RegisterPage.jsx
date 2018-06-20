import React from "react"
import PropTypes from "prop-types"

// material-ui components
import withStyles from "material-ui/styles/withStyles"
import InputAdornment from "material-ui/Input/InputAdornment"
// import Checkbox from "material-ui/Checkbox"
// import FormControlLabel from "material-ui/Form/FormControlLabel"

// @material-ui/icons
// import Timeline from "@material-ui/icons/Timeline"
// import Code from "@material-ui/icons/Code"
// import Group from "@material-ui/icons/Group"
import Face from "@material-ui/icons/Face"
import Email from "@material-ui/icons/Email"
import LockOutline from "@material-ui/icons/LockOutline"
// import Check from "@material-ui/icons/Check"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import ItemGrid from "components/Grid/ItemGrid.jsx"
import RegularCard from "components/Cards/RegularCard.jsx"
import Button from "components/CustomButtons/Button.jsx"
// import IconButton from "components/CustomButtons/IconButton.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"
// import InfoArea from "components/InfoArea/InfoArea.jsx"

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle"

import api from "../../Api"

class RegisterPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createdUser: false,
      username: "",
      password: "",
      email: "",
      name: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.createUser = this.createUser.bind(this)
  }

  //MOVE THIS INTO SEPERATE FILE IN FUTURE
  handleChange(evt) {
    let val = evt.target.value
    let input = evt.target.name
    this.setState({
      [input]: val
    })
  }

  //MOVE THIS INTO SEPERATE FILE IN FUTURE
  createUser(evt) {
    evt.preventDefault()
    const { email, password, username, name } = this.state
    const body = {
      user: {
        username: username,
        password: password,
        email: email,
        name: name
      }
    }
    api.createUser(body).then(response => {
      this.setState({
        createdUser: true,
        username: "",
        password: "",
        email: "",
        name: ""
      })
    })
    alert("User registered, please proceed to login")
  }

  render() {
    const { classes } = this.props
    const handleChange = this.handleChange
    const createUser = this.createUser

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <ItemGrid xs={12} sm={12} md={10}>
            <RegularCard
              cardTitle="Register"
              titleAlign="center"
              alignItems="center"
              customCardTitleClasses={classes.cardTitle}
              customCardClasses={classes.cardClasses}
              content={
                <GridContainer justify="center">
                  <ItemGrid xs={12} sm={12} md={5}>
                    <div
                      style={{
                        flexFlow: "wrap",
                        justifyContent: "center"
                      }}>
                      <form className={classes.form} onSubmit={createUser}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            onChange: handleChange,
                            name: "username",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}>
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Username..."
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            type: "password",
                            onChange: handleChange,
                            name: "password",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}>
                                <LockOutline
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            ),
                            placeholder: "Password..."
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            onChange: handleChange,
                            name: "email",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}>
                                <Email className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Email..."
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            onChange: handleChange,
                            name: "name",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}>
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Name..."
                          }}
                        />
                        <div className={classes.center}>
                          <Button round color="primary" type="submit">
                            Get started
                          </Button>
                        </div>
                      </form>
                    </div>
                  </ItemGrid>
                </GridContainer>
              }
            />
          </ItemGrid>
        </GridContainer>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(registerPageStyle)(RegisterPage)
