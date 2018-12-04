const router = require('express').Router()
const User = require('../../../models/User')
const Blacklist = require('../../../models/Blacklist')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const tokenSecret = process.env.tokenSecret || 'please set a real secret in proudction'

router.post('/', (req, res, next) => {
  if (!req.headers.cookies && !req.headers.cookie) {
    return res.status(401).json({
      user: 'Unauthorized'
    })
  }
  const userJwt = cookie.parse(req.headers.cookies || req.headers.cookie).Authorization
  const decodedJwt = new Promise((resolve, reject) => {
    jwt.verify(userJwt, tokenSecret, {}, (err, decoded) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(decoded)
      }
    })
  })
  .then(plainToken => {
    Blacklist.find({
      userId: plainToken.id,
      token: userJwt
    })
    .then(results => {
      if (results.length > 0) {
        return res.status(401).json({msg: 'token already blacklisted'})
      }
      return Blacklist.create({
        userId: plainToken.id,
        token: userJwt
      })
    })
    .then(blacklistedToken => {
      res.clearCookie('Authorization')
      return res.status(205).json({})
    })
    .catch(err => {
      console.log('err blackisting token', err)
      return res.status(400).json({msg: 'bad request'})
    })
  })
})

module.exports = router