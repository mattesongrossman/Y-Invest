const api = {
  getUsers() {
    return fetch("api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify()
    }).then(response => response.json())
  },

  createUser(newUser) {
    return fetch("api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
  },

  getNews() {
    return fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=596765967a80416c8c7f60c9fc7cba2a"
    ).then(response => response.json())
  },

  getCrypto() {
    return fetch("https://api.coinmarketcap.com/v1/ticker/").then(response =>
      response.json()
    )
  }
}

export default api