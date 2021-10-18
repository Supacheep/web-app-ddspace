import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import UserContext from '../context/userContext'

const withUserContext = (Component) => (
  class WithUserData extends React.PureComponent {
    static getInitialProps(ctx) {
      return Component.getInitialProps ? Component.getInitialProps(ctx) : {}
    }

    constructor(props) {
      super(props)
      this.state = {
        userData: undefined,
        adminData: undefined,
        isLoading: true,
        userToken: undefined,
      }
      this.setUser = this.setUser.bind(this)
      this.fetchUser = this.fetchUser.bind(this)
      this.logout = this.logout.bind(this)
      this.setAdmin = this.setAdmin.bind(this)
    }

    componentDidMount() {
      this.fetchUser()
    }

    setUser(user) {
      this.setState({ isLoading: true })
      return axios.post('/auth/login', user)
        .then((data) => {
          const { userData, token } = data?.data || {}
          this.setState({ userData, isLoading: false, userToken: token })
          return data?.data
        })
        .catch((err) => {
          console.warn(err)
          this.setState({ userData: undefined, isLoading: false })
          return { message: err?.response?.data?.message || 'Login failed' }
        })
    }

    setAdmin(user) {
      this.setState({ adminData: user })
    }

    async fetchUser() {
      this.setState({ isLoading: true })
      return axios.get('/auth/user')
        .then((data) => {
          const { userData, token } = data.data || {}
          this.setState({ userData, isLoading: false, userToken: token })
          return { userData }
        })
        .catch((err) => {
          console.warn(err)
          this.setState({ userData: undefined, isLoading: false })
          return {}
        })
    }

    logout(callback) {
      return axios.delete('/auth/logout')
        .then(() => {
          this.setState({ userData: undefined }, () => {
            if (callback) callback()
            Router.push('/')
          })
        })
    }

    render() {
      const {
        userData, isLoading, adminData, userToken,
      } = this.state
      const contextValue = {
        userData,
        isLoading,
        adminData,
        userToken,
        setUser: this.setUser,
        fetchUser: this.fetchUser,
        logout: this.logout,
        setAdmin: this.setAdmin,
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
