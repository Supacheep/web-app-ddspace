import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import UserContext from '../context/userContext'
import { TEST } from '../configs'

const withUserContext = (Component) => (
  class WithUserData extends React.PureComponent {
    static getInitialProps(ctx) {
      return Component.getInitialProps ? Component.getInitialProps(ctx) : {}
    }

    constructor(props) {
      super(props)
      this.state = {
        userData: undefined,
        isLoading: true,
      }
      this.setUser = this.setUser.bind(this)
      this.fetchUser = this.fetchUser.bind(this)
      this.logout = this.logout.bind(this)
    }

    componentDidMount() {
      this.fetchUser()
    }

    setUser(user) {
      this.setState({ isLoading: true })
      return axios.post('/auth/login', user)
        .then((data) => {
          console.log('setUser::', data)
          const { userData } = data?.data || {}
          this.setState({ userData, isLoading: false })
        })
        .catch((err) => { console.log('err:::', err) })
    }

    fetchUser() {
      return axios.get('/auth/user')
        .then((data) => {
          const { userData } = data.data
          console.log('fetchUser::', userData)
          this.setState({ userData, isLoading: false })
        })
        .catch((err) => { console.log('err:::', err) })
    }

    logout(callback) {
      return axios.delete('/auth/logout')
        .then(() => {
          this.setState({ userData: undefined }, () => {
            if (callback) callback()
          })
        })
    }

    render() {
      const { userData, isLoading } = this.state
      const contextValue = {
        userData,
        isLoading,
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
