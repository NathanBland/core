const router = require('express').Router()
const User = require('../../models/User')
const uuid = require('uuid/v4')
const validator = require('validator')

router.post('/', (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({msg: 'Missing required fields'})
  }

  const username = validator.escape(req.body.username)

  const user = new User({
    _id: uuid(),
    username
  })
  user.save()
  .then(savedUser => {
    return res.status(201).json(savedUser)
  })
  .catch(err => {
    console.log('error saving user:', err)
    return res.status(500).json({msg: 'Error saving user'})
  })

})

// router.get('/', (req, res, next) => {
//   return res.status(200).json({msg: 'user endpoint'})
// })

module.exports = router