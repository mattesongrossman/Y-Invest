const portfolio = {

  handleChange(evt) {
    let val = evt.target.value
    let input = evt.target.name
    this.setState({
      [input]: val
    })
  },

  create(evt) {
    evt.preventDefault()
    const { investment_name, quantity, purchase_date, price } = this.state
    console.log("test")
    const body = {
      investment_name: investment_name,
      quantity: quantity,
      purchase_date: purchase_date,
      price: price
    }
    portfolio.createPortfolio(body).then(response => {
      this.setState({
        createdPortfolio: true
      })
    })
  }


}

export default portfolio
