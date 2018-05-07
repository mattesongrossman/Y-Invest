import React from "react"

import ReactTable from "react-table"
// material-ui components
import withStyles from "material-ui/styles/withStyles"
// import Checkbox from "material-ui/Checkbox"

// material-ui icons
import Assignment from "@material-ui/icons/Assignment"
// import Person from "@material-ui/icons/Person"
import Edit from "@material-ui/icons/Edit"
import Close from "@material-ui/icons/Close"
// import Check from "@material-ui/icons/Check"
// import Remove from "@material-ui/icons/Remove"
import Add from "@material-ui/icons/Add"
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import ItemGrid from "components/Grid/ItemGrid.jsx"
import IconCard from "components/Cards/IconCard.jsx"
// import Table from "components/Table/Table.jsx"
import Button from "components/CustomButtons/Button.jsx"
import IconButton from "components/CustomButtons/IconButton.jsx"

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx"

import api from "../../Api"

class ExtendedTables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: [],
      portfolioLoaded: false
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

  handleDestroy(evt) {
    api.destroyInvestment(evt)
    console.log("test")
    api.getPortfolios().then(portfolio => {
      this.setState({
        portfolio: portfolio.investments,
        portfolioLoaded: true
      })
    })
  }

  render() {
    const { classes } = this.props
    const { portfolio } = this.state
    console.log(portfolio)

    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <Button
            className="actions"
            variant="flat"
            style={{ backgroundColor: "#37B067" }}>
            <Add />
          </Button>
          <IconCard
            icon={Assignment}
            iconColor="blue"
            title="Portfolio"
            content={
              <ReactTable
                data={this.state.portfolio.map((prop, key) => {
                  return {
                    id: key,
                    security: prop.security,
                    quantity: prop.quantity,
                    purchase_date: prop.purchase_date,
                    price: prop.price,
                    value: Number(prop.quantity * prop.price),
                    actions: (
                      <div className="actions">
                        {/* use this button to add a like kind of action */}
                        <IconButton
                          onClick={() => {
                            console.log(prop.id)
                          }}
                          color="successNoBackground"
                          customClass={classes.actionButton}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            this.handleDestroy(prop.id)
                          }}
                          color="dangerNoBackground"
                          customClass="actions">
                          <Close />
                        </IconButton>
                      </div>
                    )
                  }
                })}
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
                    accessor: "price"
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
    )
  }
}

export default withStyles(extendedTablesStyle)(ExtendedTables)
