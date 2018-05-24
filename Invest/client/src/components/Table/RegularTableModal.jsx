import React from "react"

import Button from "components/CustomButtons/Button.jsx"
// import IconButton from "components/CustomButtons/IconButton.jsx"

import withStyles from "material-ui/styles/withStyles"
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx"
import TextField from "material-ui/TextField"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog"

import api from "../../Api"
import { Redirect } from "react-router"

class RegularTableModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      security: "",
      quantity: "",
      purchase_date: "",
      price: "",
      createdPortfolio: false,
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.addPortfolioItem = this.addPortfolioItem.bind(this)
  }

  handleOpen = evt => {
    this.setState({
      open: true
      // security: evt.name,
      // price: evt.price_usd
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  //handles input change on TextField
  handleChange(evt) {
    let val = evt.target.value
    let input = evt.target.name
    this.setState({
      [input]: val
    })
  }
  //creates portfolio
  addPortfolioItem(evt) {
    evt.preventDefault()
    const { security, quantity, purchase_date, price } = this.state
    console.log("test")
    const body = {
      security: security,
      quantity: quantity,
      price: price,
      purchase_date: purchase_date
    }
    api.addPortfolioItem(body).then(response => {
      this.setState({
        createdPortfolio: true
      })
    })
    window.location.reload()
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/portfolio" />
    }
    return (
      <div>
        <Dialog
          open={this.props.open}
          style={{
            backgroundColor: "white"
          }}
          onClose={this.handleClose}>
          <DialogTitle>Add:</DialogTitle>
          <DialogContent>
            <DialogContentText>Add Investment</DialogContentText>
            <form id="addItem" onSubmit={this.addPortfolioItem}>
              <TextField
                onChange={this.handleChange}
                autoFocus
                value={this.props.security}
                name="security"
                id="investment"
                label="Investment Name"
                type="text"
                fullWidth
              />
              <TextField
                onChange={this.handleChange}
                autoFocus
                name="quantity"
                value={this.props.quantity}
                id="quantity"
                label="Quantity"
                type="number"
              />
              <br />
              <TextField
                onChange={this.handleChange}
                name="price"
                value={this.props.price}
                autoFocus
                id="price"
                label="Price"
                type="number"
              />
              <br />
              <br />
              <TextField
                onChange={this.handleChange}
                name="purchase_date"
                value={this.props.purchase_date}
                autoFocus
                id="date"
                type="date"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="raised" color="danger">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="raised"
              color="success"
              form="addItem">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(modalStyle)(RegularTableModal)
