const router = require('express').Router()
const Item = require('../../models/Item')
const validator = require('validator')
router.put('/:id', (req, res, next) => {
  const itemId = validator.escape(req.params.id)
  if (!validator.isUUID(itemId)) {
    return res.status(400).json({msg: 'Invalid ID'})
  }
  const escpQuery = Object.assign({}, ...Object.keys(req.body).map(obKey => {
    return {[obKey]: validator.escape(req.body[obKey])}
  }))
  Item.findOneAndUpdate({_id: itemId}, escpQuery, {new: true})
  .then(updatedItem => {
    return res.status(200).json(updatedItem)
  })
  .catch(err => {
    console.log('error updating item:', err)
    return res.status(500).json({msg: 'Failed to update item'})
  })
})

module.exports = router