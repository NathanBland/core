const router = require('express').Router()
const User = require('../../models/User')

router.get('/', (req, res, next) => {
  const pageSize = 20
  const currentPage = req.query.page > 0 ? req.query.page - 1 : 0
  const filter = req.query.filter || ''
  const sortBy = req.query.sortBy || 'username'
  const orderBy = req.query.orderBy || 'asc'
  const sortQuery = {
    [sortBy]: orderBy
  }
  const filterQuery = {
    username: new RegExp(filter, 'i')
  }

  User.countDocuments(filterQuery)
  .then(userCount => {
    if (currentPage * pageSize > userCount) {
      return res.status(400).json([])
    }
    User.find(filterQuery)
    .limit(pageSize)
    .skip(currentPage * pageSize)
    .sort(sortQuery)
    .then(users => {
      return res.status(200).json({
        users,
        page: req.query.page || 1,
        total: userCount,
        pageSize: pageSize
      })
    })
  })
  .catch(err => {
    console.log('Error finding user:', err)
    return res.status(500).json({msg: 'no user found'})
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