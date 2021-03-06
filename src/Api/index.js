import Auth from "../modules/Auth"

const api = {
  //USER CALLS TO DB
  getUsers() {
    return fetch("/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify()
    }).then(response => response.json())
  },

  createUser(newUser) {
    return fetch("/users", {
      method: "POST",
      headers: {
        Authorization: `Token ${Auth.getToken()}`,
        token: `${Auth.getToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
  },

  loginUser(loginParams) {
    return fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginParams)
    })
  },

  //PORTFOLIO CALLS TO DB
  getPortfolios() {
    return fetch("investments", {
      method: "GET",
      headers: {
        Authorization: `Token ${Auth.getToken()}`,
        token: `${Auth.getToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify()
    }).then(response => response.json())
  },

  addPortfolioItem(newPortfolioItem) {
    return fetch("/investments", {
      method: "POST",
      headers: {
        Authorization: `Token ${Auth.getToken()}`,
        token: `${Auth.getToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPortfolioItem)
    })
  },

  editInvestment(id, body) {
    return fetch(`investments/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Token ${Auth.getToken()}`,
        token: `${Auth.getToken()}`,
        "Content-Type": "application/json"
      }
    })
  },

  destroyInvestment(id) {
    return fetch(`/investments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${Auth.getToken()}`,
        token: `${Auth.getToken()}`,
        "Content-Type": "application/json"
      }
    })
  },

  //CALLS TO API
  getNews() {
    return fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=596765967a80416c8c7f60c9fc7cba2a"
    ).then(response => response.json())
  },

  getCrypto() {
    return fetch("https://api.coinmarketcap.com/v1/ticker/").then(response =>
      response.json()
    )
  },
  getStocks() {
    return fetch(
      "https://api.iextrading.com/1.0/stock/market/batch?symbols=AAPL,AMZN,MSFT,GOOGL,FB,BRK.B,JPM,XOM,JNJ,BAC,WFC,V,INTC,WMT,CVX,UNH,HD,PFE,CSCO,BA,MA,VZ,T,ORCL,PG,KO,C,ABBV,MRK,DWDP,DIS,CMCSA,PEP,IBM,PM,MCD,GE,AMGN,MMM,NKE,MDT,HON,UNP,TXN,ABT,MO,UTX,SLB,BKNG,UPS,ACN,PYPL,MS,CAT,LMT,GS,LLY,GILD,AXP,QCOM,COST,BLK,BMY,USB,COP,SBUX,LOW,NEE,TWX,FOXA,DHR,KHC,FDX,CVS,OXY,CHTR,WBA,GD,RTN,BIIB,MDLZ,BK,CELG,MON,CL,GM,AGN,DUK,SPG,MET,AIG,COF,HAL,EMR,F,SO,EXC,TGT,KMI,ALL&types=quote"
    ).then(response => response.json())
  }
}

export default api
