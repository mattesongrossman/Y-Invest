import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
// import { Redirect } from "react-router-dom"

// material-ui components
// import Logout from "views/Pages/Logout.jsx"
import withStyles from "material-ui/styles/withStyles"
import IconButton from "material-ui/IconButton"
import Hidden from "material-ui/Hidden"

// @material-ui/icons
import Person from "@material-ui/icons/Person"
// import Search from "@material-ui/icons/Search"
import LockOpen from "@material-ui/icons/LockOpen"

// core components
// import CustomInput from "components/CustomInput/CustomInput.jsx"
// import SearchButton from "components/CustomButtons/IconButton.jsx"

import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle"
import Auth from "../../modules/Auth"

class HeaderLinks extends React.Component {
  state = {
    open: false
  }
  handleClick = () => {
    this.setState({ open: !this.state.open })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  render() {
    const { classes, rtlActive } = this.props
    // const searchButton = classes.top + " " + classes.searchButton
    //+ " " +
    // classNames({
    //   [classes.searchRTL]: rtlActive
    // })
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    })

    return (
      <div className={wrapper}>
        {/* <CustomInput
          // rtlActive={rtlActive}
          formControlProps={{
            className: classes.top + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
              className: classes.searchInput
            }
          }}
        />
        <SearchButton
          color="white"
          aria-label="edit"
          customClass={searchButton}>
          <Search className={classes.searchIcon} />
        </SearchButton> */}
        <IconButton
          style={
            Auth.isUserAuthenticated() === true
              ? { color: "#37B067" }
              : { color: "red" }
          }
          // color="inherit"
          aria-label="Person"
          className={classes.buttonLink}
          classes={{
            label: ""
          }}>
          <Person className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </IconButton>
        <IconButton
          onClick={() => {
            // ;<Redirect to="/pages/login" />
          }}
          style={{ color: "red" }}
          // color="inherit"
          aria-label="LockOpen"
          className={classes.buttonLink}
          classes={{
            label: ""
          }}>
          <LockOpen className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Logout</p>
          </Hidden>
        </IconButton>
      </div>
    )
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
}

export default withStyles(headerLinksStyle)(HeaderLinks)
