// import React, { Component } from "react"
// import api from "../../Api"
//
// class Homepage extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       users: []
//     }
//   }
//
//   componentDidMount() {
//     api.getUsers().then(users => {
//       this.setState({
//         users: users
//       })
//     })
//   }
//
//   render() {
//     const Users = this.state.users.map(user => {
//       return <p>{user.email}</p>
//     })
//     return <div>{Users}</div>
//   }
// }
//
// export default Homepage
