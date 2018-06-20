import React from "react"
import PropTypes from "prop-types"

// material-ui components
import withStyles from "material-ui/styles/withStyles"

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline"

// core components
import ItemGrid from "components/Grid/ItemGrid.jsx"
import ImagePriceCard from "components/Cards/ImagePriceCard.jsx"

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle"

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
      this.setState({
        news: news.articles
      })
    })
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }
  handleChangeIndex = index => {
    this.setState({ value: index })
  }
  render() {
    const News = this.state.news.map((news, index) => {
      if (news.urlToImage) {
        return (
          <ImagePriceCard
            key={index}
            image={news.urlToImage}
            title={news.title}
            text={news.description}
            price={news.source.name}
            statIcon={Timeline}
            link={news.url}
            statText={news.publishedAt}
          />
        )
      }
    })
    return (
      <ItemGrid
        xs={12}
        sm={12}
        md={4}
        style={{
          display: "flex",
          maxWidth: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          "@media (minWidth: 8050px)": {
            display: "inline",
            width: "100%",
            height: "100%"
          }
        }}>
        {News}
      </ItemGrid>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(Dashboard)
