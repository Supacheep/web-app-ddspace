const authController = require('./controllers/authController')

const router = (app, client) => {
  app.post('/auth/login', authController.login)
  app.get('/auth/user', authController.getUserData)
  app.delete('/auth/logout', authController.logout)
}

module.exports = router
