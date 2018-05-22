import React from "react"

import Auth from "modules/Auth"
import { Redirect } from "react-router-dom"

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
