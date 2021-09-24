import React from 'react'
import Router from 'next/router'
import UserContext from '../context/userContext'
import axios from 'axios'
import { TEST } from '../configs'

const withUserContext = (Component) => (
  class WithUserData extends React.PureComponent {
    static getInitialProps(ctx) {
      return Component.getInitialProps ? Component.getInitialProps(ctx) : {}
    }

    constructor(props) {
      super(props)
      this.state = { userData: undefined }
      this.setUser = this.setUser.bind(this)
      this.fetchUser = this.fetchUser.bind(this)
      this.logout = this.logout.bind(this)
    }

    componentDidMount() {
      this.fetchUser()
      console.log('TEST::', TEST)
    }

    setUser(user) {
      this.setState({ userData: user })
    }

    fetchUser() {
      return axios.post('/auth/login')
        .then((data) => {
          console.log('data::', data)
        })
        .catch((err) => { console.log('err:::', err) })
    }

    logout(callback) {
      this.setState({ userData: undefined })
    }

    render() {
      const contextValue = {
        userData: this.state.userData,
        setUser: this.setUser,
        fetchUser: this.fetchUser,
        logout: this.logout,
      }

      return (
        <UserContext.Provider value={contextValue}>
          <Component {...this.props} />
        </UserContext.Provider>
      )
    }
  }
)

export default withUserContext
