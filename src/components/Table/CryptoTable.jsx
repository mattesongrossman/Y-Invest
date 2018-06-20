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
// import portfolio from "components/CustomInput/PortfolioActions.jsx"
import { Redirect } from "react-router"

import api from "../../Api"
import withStyles from "material-ui/styles/withStyles"
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx"
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
      security: "",
      quantity: 1,
      purchase_date: "2018-05-21",
      price: "",
      createdPortfolio: false,
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.addPortfolioItem = this.addPortfolioItem.bind(this)
    this.cryptoRefresh = this.cryptoRefresh.bind(this)
  }

  handleOpen = evt => {
    this.setState({
      open: true,
      security: evt.name,
      price: evt.price_usd
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    // var intervalId = setInterval(this.cryptoRefresh, 30000)
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
        crypto: crypto,
        cryptoObj: cryptoData,
        key: key
      })
    })
  }

  cryptoRefresh() {
    console.log("crypto refresh")
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
        crypto: crypto,
        cryptoObj: cryptoData,
        key: key
      })
    })
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
        createdPortfolio: true,
        redirect: true
      })
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/portfolio" />
    }
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
                    id: key,
                    symbol: prop.symbol,
                    name: prop.name,
                    price: `$ ` + prop.price_usd,
                    percent_change_1h: Number(
                      prop.percent_change_1h
                    ).toLocaleString({
                      style: "percent"
                    }),
                    percent_change_24h: Number(
                      prop.percent_change_24h
                    ).toLocaleString({
                      style: "percent"
                    }),
                    percent_change_7d: Number(
                      prop.percent_change_7d
                    ).toLocaleString({
                      style: "percent"
                    }),
                    rank: Number(prop.rank),
                    market_cap: Number(prop.market_cap_usd).toLocaleString(),
                    action: (
                      <div className="actions">
                        <Button
                          onClick={() => {
                            let obj = this.state.crypto.find(
                              o => o.symbol === prop.symbol
                            )
                            this.handleOpen(obj)
                          }}
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
                                value={this.state.security}
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
                                value={this.state.quantity}
                                id="quantity"
                                label="Quantity"
                                type="number"
                              />
                              <br />
                              <TextField
                                onChange={this.handleChange}
                                name="price"
                                value={this.state.price}
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
                                value={this.state.purchase_date}
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
                    minWidth: 150,
                    Cell: cellInfo => (
                      <a
                        href={`https://coinmarketcap.com/currencies/${cellInfo.original.name.replace(
                          " ",
                          "-"
                        )}`}>
                        {cellInfo.original.name}
                      </a>
                    )
                  },
                  {
                    Header: "Price",
                    accessor: "price",
                    filterable: false
                  },
                  {
                    Header: "1H Change",
                    accessor: "percent_change_1h",
                    filterable: false,
                    getProps: (state, rowInfo, column) => {
                      if (rowInfo) {
                        return {
                          style: {
                            color:
                              rowInfo.row.percent_change_1h > 0
                                ? "green"
                                : "red"
                          }
                        }
                      }
                      return {}
                    }
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
                    Header: "7 Day Change",
                    accessor: "percent_change_7d",
                    filterable: false,
                    getProps: (state, rowInfo, column) => {
                      if (rowInfo) {
                        return {
                          style: {
                            color:
                              rowInfo.row.percent_change_7d > 0
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

export default withStyles(modalStyle)(CryptoTable)
