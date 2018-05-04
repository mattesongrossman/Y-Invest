import React from "react"
// react component for creating dynamic tables
import ReactTable from "react-table"

// @material-ui/icons
import PlaylistAdd from "@material-ui/icons/PlaylistAdd"
import ShowChart from "@material-ui/icons/ShowChart"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import ItemGrid from "components/Grid/ItemGrid.jsx"
import IconCard from "components/Cards/IconCard.jsx"
// import IconButton from "components/CustomButtons/IconButton.jsx"
import Button from "material-ui/Button"
import portfolio from "components/CustomInput/PortfolioActions.jsx"
import { Redirect } from "react-router"

import api from "../../Api"
import TextField from "material-ui/TextField"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog"

class CryptoTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      crypto: [],
      open: false,
      investment_name: "",
      quantity: null,
      purchase_date: "",
      price: "",
      createdPortfolio: false,
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.addPortfolioItem = this.addPortfolioItem.bind(this)
  }

  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    api.getCrypto().then(crypto => {
      let cryptoData = Object.values(crypto)
      let cryptoArray = cryptoData.map(function(obj) {
        return Object.keys(obj).map(function(key) {
          return obj[key]
        })
      })
      let key = cryptoArray.map((prop, key) => {
        return key
      })
      this.setState({
        crypto: cryptoArray,
        cryptoObj: cryptoData,
        key: key
      })
    })
  }

  getProps = (state, rowInfo, column) => {
    if (rowInfo) {
      return {
        style: {
          color: rowInfo.row.percent_change_24h > 0 ? "green" : "red",
          fontWeight: "bold"
        }
      }
    }
    return {}
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
    const { investment_name, quantity, purchase_date, price, date } = this.state
    console.log("test")
    const body = {
      investment_name: investment_name,
      quantity: quantity,
      purchase_date: purchase_date,
      price: price,
      date: date
    }
    api.addPortfolioItem(body).then(response => {
      this.setState({
        createdPortfolio: true,
        redirect: true
      })
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/portfolio" />
    }
    console.log(this.state.crypto)
    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <IconCard
            icon={ShowChart}
            title="CryptoTable"
            content={
              <ReactTable
                data={this.state.crypto.map((prop, key) => {
                  return {
                    id: prop[0],
                    symbol: prop[2],
                    name: prop[1],
                    price: `$ ` + prop[4],
                    percent_change_24h: prop[12],
                    rank: Number(prop[3]),
                    market_cap: Number(prop[7]).toLocaleString(),
                    action: (
                      <div className="actions">
                        <Button
                          onClick={this.handleOpen}
                          variant="raised"
                          color="primary">
                          <PlaylistAdd />
                        </Button>
                        <Dialog
                          open={this.state.open}
                          style={{
                            backgroundColor: "white"
                          }}
                          onClose={this.handleClose}>
                          <DialogTitle>Add:</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Add Investment
                            </DialogContentText>
                            <form id="addItem" onSubmit={this.addPortfolioItem}>
                              <TextField
                                onChange={this.handleChange}
                                autoFocus
                                name="investment_name"
                                id="investment"
                                label="Investment Name"
                                // value=""
                                type="text"
                                fullWidth
                              />
                              <TextField
                                onChange={this.handleChange}
                                autoFocus
                                name="quantity"
                                id="quantity"
                                label="Quantity"
                                type="number"
                              />
                              <br />
                              <TextField
                                onChange={this.handleChange}
                                name="price"
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
                                autoFocus
                                id="date"
                                type="date"
                              />
                            </form>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={this.handleClose}
                              variant="raised"
                              color="secondary">
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              variant="raised"
                              color="primary"
                              form="addItem">
                              Submit
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    )
                  }
                })}
                filterable
                columns={[
                  {
                    Header: "Symbol",
                    accessor: "symbol",
                    sortable: false,
                    maxWidth: 100
                  },
                  {
                    Header: "Name",
                    accessor: "name",
                    minWidth: 150
                  },
                  {
                    Header: "Price",
                    accessor: "price",
                    filterable: false
                  },
                  {
                    Header: "24H Change",
                    accessor: "percent_change_24h",
                    filterable: false,
                    getProps: (state, rowInfo, column) => {
                      if (rowInfo) {
                        return {
                          style: {
                            color:
                              rowInfo.row.percent_change_24h > 0
                                ? "green"
                                : "red"
                          }
                        }
                      }
                      return {}
                    }
                  },
                  {
                    Header: "Rank",
                    accessor: "rank",
                    // sortable: false,
                    filterable: false,
                    maxWidth: 100
                  },
                  {
                    Header: "Market Cap",
                    accessor: "market_cap",
                    filterable: false
                  },
                  {
                    Header: "Actions",
                    accessor: "action",
                    sortable: false,
                    filterable: false,
                    maxWidth: 100
                  }
                ]}
                defaultPageSize={5}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            }
          />
        </ItemGrid>
      </GridContainer>
    )
  }
}

export default CryptoTable
