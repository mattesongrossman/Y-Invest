import React from "react"

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


class ExtendedTables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: []
    }
    this.handleToggle = this.handleToggle.bind(this)
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
  render() {
    const { classes } = this.props
    const fillButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button color={prop.color} customClass={classes.actionButton} key={key}>
          <prop.icon className={classes.icon} />
        </Button>
      )
    })
    const simpleButtons = [
      { color: "infoNoBackground", icon: Person },
      { color: "successNoBackground", icon: Edit },
      { color: "dangerNoBackground", icon: Close }
    ].map((prop, key) => {
      return (
        <Button color={prop.color} customClass={classes.actionButton} key={key}>
          <prop.icon className={classes.icon} />
        </Button>
      )
    })
    const roundButtons = [
      { color: "info", icon: Person },
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <IconButton
          color={prop.color}
          customClass={classes.actionButton + " " + classes.actionButtonRound}
          key={key}>
          <prop.icon className={classes.icon} />
        </IconButton>
      )
    })
    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <IconCard
            icon={Assignment}
            iconColor="rose"
            title="Portfolio"
            content={
              <Table
                tableHead={[
                  "Investment",
                  "Quantity",
                  "Purchase Date",
                  "Price",
                  "Value",
                  "Actions"
                ]}
                tableData={[
                  ["Apple", "100", "3/3/13", "100.00", "15,000", fillButtons],
                  ["Google", "50", "3/3/13", "1000.00", "60,000", fillButtons],
                  ["Netflix", "250", "3/3/13", "150.00", "40,000", fillButtons],
                  [
                    "Berkshire",
                    "200",
                    "3/3/13",
                    "150.00",
                    "35,000",
                    fillButtons
                  ],
                  [
                    "Bank of America",
                    "3000",
                    "3/3/13",
                    "20.10",
                    "60,000",
                    fillButtons
                  ]
                ]}
                customCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 4, 5]}
              />
            }
          />
        </ItemGrid>
      </GridContainer>
    )
  }
}

export default withStyles(extendedTablesStyle)(ExtendedTables)
