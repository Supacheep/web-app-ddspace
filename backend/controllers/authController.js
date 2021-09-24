const login = (req, res) => {
    const token = 'token'
    console.log('res:::', res)
    res.cookie('token', token, { httpOnly: true })
    res.json({token})
}

module.exports = {
  login
}