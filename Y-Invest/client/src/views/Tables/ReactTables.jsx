import React from "react"

import CryptoTable from "components/Table/CryptoTable.jsx"
import StockTable from "components/Table/StockTable.jsx"

class ReactTables extends React.Component {
  render() {
    return (
      <div>
        <CryptoTable />
        <StockTable />
      </div>
    )
  }
}

export default ReactTables
