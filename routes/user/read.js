const router = require('express').Router()
const User = require('../../models/User')
const validator = require('validator')

router.get('/', (req, res, next) => {
  const pageSize = 20
  const escpQuery = Object.assign({}, ...Object.keys(req.query).map(obKey => {
    return {[obKey]: validator.escape(req.query[obKey])}
  }))
  const currentPage = parseInt(escpQuery.page) > 0 ? parseInt(escpQuery.page) - 1 : 0
  const filter = escpQuery.filter || ''
  const sortBy = escpQuery.sortBy || 'username'
  const orderBy = escpQuery.orderBy || 'asc'
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
        page: escpQuery.page || 1,
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
  const userId = validator.escape(req.params.id)
  if (!validator.isUUID(userId)) {
    return res.status(400).json({msg: 'Invalid ID'})
  }
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