const router = require('express').Router()
const User = require('../../models/User')

router.put('/:id', (req, res, next) => {
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
  .then(updatedUser => {
    return res.status(200).json(updatedUser)
  })
  .catch(err => {
    console.log('error updating user:', err)
    return res.status(500).json({msg: 'Failed to update user'})
  })
})

module.exports = router