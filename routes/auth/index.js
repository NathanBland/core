const router = require('express').Router()

router.use('/local', require('./local'))
router.use('/twitter', require('./twitter'))

module.exports = router