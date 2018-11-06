const router = require('express').Router()
const Item = require('../../models/Item')

router.get('/', (req, res, next) => {
  Item.find()
  .then(items => {
    return res.status(200).json(items)
  })
})

router.get('/:id', (req, res, next) => {
  Item.findOne({_id: req.params.id})
  .then(item => {
    return res.status(200).json(item)
  })
  .catch(err => {
    console.log('Error finding item:', err)
    return res.status(500).json({msg: 'no item found'})
  })
})

module.exports = router