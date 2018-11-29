const router = require('express').Router()
const User = require('../../models/User')
const validator = require('validator')

router.put('/:id', (req, res, next) => {
  const userId = validator.escape(req.params.id)
  if (!validator.isUUID(userId)) {
    return res.status(400).json({msg: 'Invalid ID'})
  }
  const escpQuery = Object.assign({}, ...Object.keys(req.body).map(obKey => {
    return {[obKey]: validator.escape(req.body[obKey])}
  }))
  User.findOneAndUpdate({_id: userId}, escpQuery, {new: true})
  .then(updatedUser => {
    return res.status(200).json(updatedUser)
  })
  .catch(err => {
    console.log('error updating user:', err)
    return res.status(500).json({msg: 'Failed to update user'})
  })
})

module.exports = router