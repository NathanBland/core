const router = require('express').Router()
const User = require('../../models/User')

router.get('/', (req, res, next) => {
  const pageSize = 20
  const currentPage = req.query.page > 0 ? req.query.page - 1 : 0

  User.count()
  .then(userCount => {
    if (currentPage * pageSize > userCount) {
      return res.status(400).json([])
    }
    User.find()
    .limit(pageSize)
    .skip(currentPage * pageSize)
    .sort({
      createdAt: -1
    })
    .then(users => {
      return res.status(200).json({
        users,
        page: req.query.page || 1,
        total: userCount,
        pageSize: pageSize
      })
    })
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