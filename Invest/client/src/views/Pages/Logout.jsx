import React from "react"
import PropTypes from "prop-types"
import Auth from "modules/Auth"
import { Redirect } from "react-router-dom"
//
// // material-ui components
// import withStyles from "material-ui/styles/withStyles";
//
// // @material-ui/icons
// import Weekend from "@material-ui/icons/Weekend";
// import Home from "@material-ui/icons/Home";
// import Business from "@material-ui/icons/Business";
// import AccountBalance from "@material-ui/icons/AccountBalance";
//
// // core components
// import GridContainer from "components/Grid/GridContainer.jsx";
// import ItemGrid from "components/Grid/ItemGrid.jsx";
// import PricingCard from "components/Cards/PricingCard.jsx";
// import Button from "components/CustomButtons/Button.jsx";
//
// import pricingPageStyle from "assets/jss/material-dashboard-pro-react/views/pricingPageStyle.jsx";

class Logout extends React.Component {
  constructor(props) {
    super(props)
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      auth: Auth.isUserAuthenticated()
    }
  }
  render() {
    return this.state.auth ? (
      (fetch("/pages/logout", {
        method: "DELETE",
        headers: {
          Authorization: `Token ${Auth.getToken()}`,
          token: Auth.getToken()
        }
      }).then(res => {
        Auth.deauthenticateUser()
        this.setState({
          auth: Auth.isUserAuthenticated()
        })
      }),
      <Redirect to="/dashboard" />)
    ) : (
      <Redirect to="/pages/login" />
    )
  }
}

export default Logout
