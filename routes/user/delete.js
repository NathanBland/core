const router = require('express').Router()
const User = require('../../models/User')

router.delete('/:id', (req, res, next) => {
  const userId = validator.escape(req.params.id)
  if (!validator.isUUID(userId)) {
    return res.status(400).json({msg: 'Invalid ID'})
  }
  User.findByIdAndDelete(userId)
  .then(result => {
    console.log('delete result:', result)
    return res.status(204).json()
  })
  .catch(err => {
    console.log('Error deleting user', err)
    return res.status(500).json({msg: 'Error deleting user'})
  })
})

module.exports = router