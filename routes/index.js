const router = require('express').Router()

router.use('/auth', require('./auth'))

router.use('/user', require('./user'))
// /api/user
router.use('/item', require('./middleware/authorizer'))
router.use('/item', require('./item'))
// /api/item

module.exports = router