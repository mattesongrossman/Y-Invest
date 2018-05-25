import React from "react"
// react component for creating dynamic tables
import ReactTable from "react-table"
import PropTypes from "prop-types"

// @material-ui/icons
import PlaylistAdd from "@material-ui/icons/PlaylistAdd"
import ShowChart from "@material-ui/icons/ShowChart"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import ItemGrid from "components/Grid/ItemGrid.jsx"
import IconCard from "components/Cards/IconCard.jsx"
// import IconButton from "components/CustomButtons/IconButton.jsx"
import Button from "material-ui/Button"
import { Redirect } from "react-router"

import api from "../../Api"
import TextField from "material-ui/TextField"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog"

import CustomInput from "components/CustomInput/CustomInput.jsx"
import Search from "@material-ui/icons/Search"
import SearchButton from "components/CustomButtons/IconButton.jsx"

import withStyles from "material-ui/styles/withStyles"
import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle"

// import TableModal from "./TableModal.js"

class StockTables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stock: [],
      open: false,
      security: "",
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
    api.getStocks().then(stock => {
      let stockData = Object.values(stock)
      let stockArray = stockData.map(function(obj) {
        return Object.keys(obj).map(function(key) {
          return obj[key]
        })
      })
      let key = stockArray.map((prop, key) => {
        return key
      })
      this.setState({
        stock: stockArray,
        stockObj: stockData,
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
    const { security, quantity, purchase_date, price } = this.state
    console.log("test")
    const body = {
      security: security,
      quantity: quantity,
      purchase_date: purchase_date,
      price: price
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
    let { stock } = this.state
    console.log(stock)
    const { classes } = this.props
    // const { open } = this.state
    const searchButton = classes.top + " " + classes.searchButton
    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <IconCard
            icon={ShowChart}
            title="StockTable"
            content={
              <div>
                <CustomInput
                  formControlProps={{
                    className: classes.top + " " + classes.search
                  }}
                  inputProps={{
                    placeholder: "Search by Company",
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
                </SearchButton>
                <ReactTable
                  data={this.state.stock.map((prop, key) => {
                    // console.log(prop[key])
                    return {
                      id: key,
                      symbol: prop[0].symbol,
                      name: prop[0].companyName,
                      price:
                        prop[0].latestPrice !== null
                          ? `$ ` + prop[0].latestPrice.toFixed(2)
                          : "0",
                      percent_change_24h: (
                        Number(prop[0].changePercent) * 100
                      ).toLocaleString({
                        style: "percent"
                      }),
                      YTD_Change: (prop[0].ytdChange * 100).toLocaleString({
                        style: "percent"
                      }),
                      market_cap: prop[0].marketCap.toLocaleString(),
                      action: (
                        <div className="actions">
                          <Button
                            onClick={() => {
                              let obj = this.state.stock.find(
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
                              <form
                                id="addItem"
                                onSubmit={this.addPortfolioItem}>
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
                      minWidth: 150
                    },
                    {
                      Header: "Price",
                      accessor: "price",
                      filterable: false,
                      sortable: false
                    },
                    {
                      Header: "24H Change",
                      accessor: "percent_change_24h",
                      sortable: false,
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
                      Header: "YTD Change",
                      accessor: "YTD_Change",
                      filterable: false,
                      sortable: false,
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
                      Header: "Market Cap",
                      accessor: "market_cap",
                      // sortable: false,
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
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </div>
            }
          />
        </ItemGrid>
      </GridContainer>
    )
  }
}

StockTables.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(headerLinksStyle)(StockTables)
