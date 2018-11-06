const router = require('express').Router()
const User = require('../../models/User')

router.get('/', (req, res, next) => {
  User.find()
  .then(users => {
    return res.status(200).json(users)
  })
})

router.get('/:id', (req, res, next) => {
  User.findOne({_id: req.params.id})
  .then(user => {
    return res.status(200).json(user)
  })
  .catch(err => {
    console.log('Error finding user:', err)
    return res.status(500).json({msg: 'no user found'})
  })
})

module.exports = router