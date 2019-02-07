const passport = require('passport')
const router = require('express').Router()
const User = require('../../../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      done(err)
    }
    done(null, user.id)
  })
})

router.use('/', require('./twitter'))

module.exports = router