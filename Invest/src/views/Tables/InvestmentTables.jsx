import React from "react"

import CryptoTable from "components/Table/CryptoTable.jsx"
import StockTable from "components/Table/StockTable.jsx"

import withStyles from "material-ui/styles/withStyles"

import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx"

class InvestmentTables extends React.Component {
  render() {
    return (
      <div>
        <CryptoTable />
        <StockTable />
      </div>
    )
  }
}

export default withStyles(modalStyle)(InvestmentTables)
