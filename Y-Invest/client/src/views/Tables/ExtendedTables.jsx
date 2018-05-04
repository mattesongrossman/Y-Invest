import React from "react"

import ReactTable from "react-table"
// material-ui components
import withStyles from "material-ui/styles/withStyles"
// import Checkbox from "material-ui/Checkbox"

// material-ui icons
import Assignment from "@material-ui/icons/Assignment"
import Person from "@material-ui/icons/Person"
import Edit from "@material-ui/icons/Edit"
import Close from "@material-ui/icons/Close"
// import Check from "@material-ui/icons/Check"
// import Remove from "@material-ui/icons/Remove"
// import Add from "@material-ui/icons/Add"
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import ItemGrid from "components/Grid/ItemGrid.jsx"
import IconCard from "components/Cards/IconCard.jsx"
import Table from "components/Table/Table.jsx"
import Button from "components/CustomButtons/Button.jsx"
import IconButton from "components/CustomButtons/IconButton.jsx"

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx"

import api from "../../Api"

class ExtendedTables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: [],
      portfolio: []
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {
    api.getPortfolios().then(portfolio => {
      let portfolioData = Object.values(portfolio)
      let portfolioArray = portfolioData.map(function(obj) {
        return Object.keys(obj).map(function(key) {
          return obj[key]
        })
      })
      this.setState({
        portfolio: portfolioArray
      })
    })
  }

  handleToggle(value) {
    const { checked } = this.state
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({
      checked: newChecked
    })
  }

  handleDestroy(evt) {
    console.log(evt.target.value)
  }

  render() {
    const { classes } = this.props
    const { portfolio } = this.state
    console.log(portfolio)
    const fillButtons = [
      // { color: "info", icon: Person },
      { color: "success", icon: Edit, onClick: this.handleEdit },
      {
        color: "danger",
        icon: Close,
        onClick: this.handleDestroy,
        accessor: "id"
      }
    ].map((prop, key) => {
      return (
        <Button
          color={prop.color}
          onClick={prop.onClick}
          customClass={classes.actionButton}
          value={prop.accessor}
          key={key}>
          <prop.icon className={classes.icon} />
        </Button>
      )
    })

    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <IconCard
            icon={Assignment}
            iconColor="green"
            title="Portfolio"
            content={
              <ReactTable
                //NEED TO SETSTATE OF EACH INDIVIDUAL ITEM IN ORDER TO FIND ID FOR DELETE/EDIT
                data={this.state.portfolio.map((prop, key) => {
                  return {
                    id: prop[0],
                    investment_name: prop[1],
                    quantity: prop[2],
                    purchase_date: prop[3],
                    price: prop[4],
                    value: prop[2] * prop[4],
                    actions: fillButtons
                  }
                })}
                columns={[
                  {
                    Header: "Investment",
                    accessor: "investment_name"
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
