const passport = require('passport')
const router = require('express').Router()
const OAuthStrategy = require('passport-oauth1').Strategy
const User = require('../../../models/User')

const config = require('../../../config')

passport.use('twitter', new OAuthStrategy({
  requestTokenURL: 'https://api.twitter.com/oauth/request_token',
  accessTokenURL: 'https://api.twitter.com/oauth/access_token',
  userAuthorizationURL: 'https://api.twitter.com/oauth/authenticate',
  consumerKey: config.twitter.TWITTER_CONSUMER_KEY,
  consumerSecret: config.twitter.TWITTER_CONSUMER_SECRET,
  callbackURL: config.twitter.callbackURL
}, (token, tokenSecret, profile, done) => {
  User.findOrCreate({
    'twitter.id': profile.id
  }, (err, user) => {
    if (err) {
      return done(err)
    }
    return done(null, user)
  })
}))

router.get('/', passport.authenticate('twitter'))

router.get('/callback', passport.authenticate('twitter', {
  successRedirect: '/twitterSuccess',
  failureRedirect: '/twitterFail'
}))

module.exports = router