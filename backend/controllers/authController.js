const axios = require('axios')
const config = require('../../src/configs')

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await axios.post(`${config.API}/usersession/login`, { email, password })
    const {
      name,
      lastName,
      token,
      message,
    } = user.data.data
    if (token) {
      const userData = {
        email,
        name,
        lastName,
      }
      res.cookie('token', token, { httpOnly: true })
      res.cookie('userData', userData, { httpOnly: true })
      return res.status(200).json({ token, userData })
    }
    return res.status(500).json({ message: message || 'Login failed' })
  } catch (err) {
    const errorMsg = err.response && err.response.data && err.response.data.error && err.response.data.error.message
    return res.status(500).json({ message: errorMsg || 'Login failed' })
  }
}

const logout = (req, res) => {
  res.clearCookie('token')
  res.clearCookie('userData')
  return res.status(204).json({})
}

const getUserData = async (req, res) => {
  const { userData, token } = req.cookies
  try {
    if (!token) return res.status(200).json({})
    const response = await axios.get(`${config.API}/usersession/validatesessiontoken`, { headers: { UserToken: token } })
    if (!response.data.success) {
      return logout(req, res)
    }
    return res.status(200).json({ token, userData })
  } catch (err) {
    return logout(req, res)
  }
}

module.exports = {
  login,
  getUserData,
  logout,
}
