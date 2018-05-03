import React from "react"
import PropTypes from "prop-types"

// material-ui components
import withStyles from "material-ui/styles/withStyles"
// import Tooltip from "material-ui/Tooltip"

// @material-ui/icons
// import Refresh from "@material-ui/icons/Refresh"
// import Edit from "@material-ui/icons/Edit"
// import Place from "@material-ui/icons/Place"
// import ArtTrack from "@material-ui/icons/ArtTrack"
import Timeline from "@material-ui/icons/Timeline"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import ItemGrid from "components/Grid/ItemGrid.jsx"
import Grid from "material-ui/Grid"
// import Button from "components/CustomButtons/Button.jsx"

import ImagePriceCard from "components/Cards/ImagePriceCard.jsx"

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle"

// import priceImage1 from "assets/img/card-2.jpeg"

import api from "../../Api"

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
      value: 0
    }
  }

  componentDidMount() {
    api.getNews().then(news => {
      // console.log(news)
      this.setState({
        news: news.articles
      })
    })
    // set state inside of component did mount
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }
  handleChangeIndex = index => {
    this.setState({ value: index })
  }
  render() {
    // const { classes } = this.props
    const News = this.state.news.map((news, index) => {
      if (news.urlToImage) {
        return (
          // <GridContainer justify="space-between">
          //   <ItemGrid xs={12} sm={12} md={4}>
          <ImagePriceCard
            display="flex"
            image={news.urlToImage}
            title={news.title}
            text={news.description}
            price={news.source.name}
            statIcon={Timeline}
            statText={news.publishedAt}
            // hover
            //   underImage={
            //     <div>
            //       <Tooltip
            //         id="tooltip-top"
            //         title="View"
            //         placement="bottom"
            //         classes={{ tooltip: classes.tooltip }}>
            //         <Button color="defaultNoBackground" justIcon>
            //           <ArtTrack className={classes.underChartIcons} />
            //         </Button>
            //       </Tooltip>
            //       <Tooltip
            //         id="tooltip-top"
            //         title="Edit"
            //         placement="bottom"
            //         classes={{ tooltip: classes.tooltip }}>
            //         <Button color="successNoBackground" justIcon>
            //           <Refresh className={classes.underChartIcons} />
            //         </Button>
            //       </Tooltip>
            //       <Tooltip
            //         id="tooltip-top"
            //         title="Remove"
            //         placement="bottom"
            //         classes={{ tooltip: classes.tooltip }}>
            //         <Button color="dangerNoBackground" justIcon>
            //           <Edit className={classes.underChartIcons} />
            //         </Button>
            //       </Tooltip>
            //     </div>
            //   }
          />
          //   </ItemGrid>
          // </GridContainer>
        )
      }
    })
    return (
      <ItemGrid xs={12} sm={12} md={4}>
        {News}
      </ItemGrid>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(Dashboard)
