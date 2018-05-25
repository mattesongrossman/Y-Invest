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

class EditTableModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      security: "",
      quantity: "",
      purchase_date: "",
      price: "",
      editPortfolio: false,
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.editInvestment = this.editInvestment.bind(this)
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
  editInvestment(evt) {
    evt.preventDefault()
    const { security, quantity, purchase_date, price, id } = this.props
    console.log(id)
    const body = {
      security: security,
      quantity: quantity,
      price: price,
      purchase_date: purchase_date
    }
    api.editInvestment(id, body).then(response => {
      this.setState({
        editPortfolio: true
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
          onClose={this.props.close}>
          <DialogTitle>Add:</DialogTitle>
          <DialogContent>
            <DialogContentText>Add Investment</DialogContentText>
            <form id="editItem" onSubmit={this.editInvestment}>
              <TextField
                onChange={this.props.onChange}
                autoFocus
                value={this.props.security}
                name="security"
                id={this.props.id}
                label="Investment Name"
                type="text"
                fullWidth
              />
              <TextField
                onChange={this.props.onChange}
                autoFocus
                name="quantity"
                value={this.props.quantity}
                id="quantity"
                label="Quantity"
                type="number"
              />
              <br />
              <TextField
                onChange={this.props.onChange}
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
                onChange={this.props.onChange}
                name="purchase_date"
                value={this.props.purchase_date}
                autoFocus
                id="date"
                type="date"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} variant="raised" color="danger">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="raised"
              color="success"
              form="editItem">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(modalStyle)(EditTableModal)
