import React from "react"
import { Redirect } from "react-router-dom"

import ReactTable from "react-table"

// material-ui components
import withStyles from "material-ui/styles/withStyles"

// material-ui icons
import Assignment from "@material-ui/icons/Assignment"
import Edit from "@material-ui/icons/Edit"
import Close from "@material-ui/icons/Close"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import ItemGrid from "components/Grid/ItemGrid.jsx"
import IconCard from "components/Cards/IconCard.jsx"
import IconButton from "components/CustomButtons/IconButton.jsx"

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx"

import api from "../../Api"
import Auth from "../../modules/Auth"

import PortfolioTableModal from "components/Table/PortfolioTableModal.jsx"
import RegularTableModal from "components/Table/RegularTableModal.jsx"

class PortfolioTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: Auth.isUserAuthenticated(),
      portfolio: [],
      portfolioDelete: [],
      portfolioLoaded: false,
      rowDelete: false,
      open: false
    }
    // this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {
    api.getPortfolios().then(portfolio => {
      this.setState({
        portfolio: portfolio.investments,
        portfolioLoaded: true
      })
    })
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

  handleDestroy(evt, key) {
    api.destroyInvestment(evt)
    let table = this.state.portfolio
    table.splice(key, 1)
    this.setState(
      {
        portfolio: []
      },
      () => {
        this.setState({ portfolio: table })
      }
    )
  }

  render() {
    const { classes } = this.props

    let tableData = this.state.portfolio.map((prop, key) => {
      return {
        id: key.id,
        key: key,
        security: prop.security,
        quantity: prop.quantity,
        purchase_date: new Date(prop.purchase_date).toLocaleDateString(),
        price: prop.price,
        value: (Number(prop.price) * Number(prop.quantity)).toLocaleString(),
        actions: (
          <div className="actions">
            {/* use this button to add a like kind of action */}
            <IconButton
              onClick={() => {
                this.handleOpen()
              }}
              color="successNoBackground"
              customClass={classes.actionButton}>
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                this.handleDestroy(prop.id, key)
              }}
              color="dangerNoBackground"
              customClass="actions">
              <Close />
            </IconButton>
          </div>
        )
      }
    })

    return this.state.auth ? (
      <GridContainer>
        <ItemGrid xs={12}>
          <PortfolioTableModal />
          <RegularTableModal open={this.state.open} />
          <IconCard
            icon={Assignment}
            iconColor="blue"
            title="Portfolio"
            content={
              <ReactTable
                data={tableData}
                columns={[
                  {
                    Header: "Investment",
                    accessor: "security"
                  },
                  {
                    Header: "Quantity",
                    accessor: "quantity"
                  },
                  {
                    Header: "Purchase Date",
                    accessor: "purchase_date"
                  },
                  {
                    Header: "Price",
                    accessor: "price"
                  },
                  {
                    Header: "Value",
                    accessor: "value"
                  },
                  {
                    Header: "Actions",
                    accessor: "actions"
                  }
                ]}
                sortable={false}
                // defaultPageSize={25}
                showPaginationTop={false}
                showPaginationBottom={false}
                className="-highlight"
              />
            }
          />
        </ItemGrid>
      </GridContainer>
    ) : (
      <Redirect to="/pages/login" />
    )
  }
}

export default withStyles(extendedTablesStyle)(PortfolioTable)
