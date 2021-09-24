const authController = require('./controllers/authController')

const router = (app, client) => {
  app.post('/auth/login', authController.login)
}

module.exports = router
