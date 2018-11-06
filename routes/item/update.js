const router = require('express').Router()
const Item = require('../../models/Item')

router.put('/:id', (req, res, next) => {
  Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
  .then(updatedItem => {
    return res.status(200).json(updatedItem)
  })
  .catch(err => {
    console.log('error updating item:', err)
    return res.status(500).json({msg: 'Failed to update item'})
  })
})

module.exports = router