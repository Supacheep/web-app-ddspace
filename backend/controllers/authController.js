const login = (req, res) => {
  const token = 'token'
  const { email, password } = req.body
  console.log('req.body', req.body)
  const userData = { email }
  res.cookie('token', token, { httpOnly: true })
  res.cookie('userData', userData, { httpOnly: true })
  return res.status(200).json({ token, userData })
}

const getUserData = (req, res) => {
  const { userData } = req.cookies
  return res.status(200).json({ userData })
}

const logout = (req, res) => {
  res.clearCookie('token')
  res.clearCookie('userData')
  return res.status(204).json({})
}

module.exports = {
  login,
  getUserData,
  logout,
}
