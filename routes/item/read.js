const router = require('express').Router()
const Item = require('../../models/Item')
const validator = require('validator')

router.get('/', (req, res, next) => {
  const pageSize = 20
  const escpQuery = Object.assign({}, ...Object.keys(req.query).map(obKey => {
    return {[obKey]: validator.escape(req.query[obKey])}
  }))
  const currentPage = escpQuery.page > 0 ? escpQuery.page - 1 : 0
  const filter = escpQuery.filter || ''
  const filterOn = escpQuery.filterOn || ''
  const sortBy = escpQuery.sortBy || 'createdAt'
  const orderBy = escpQuery.orderBy || 'asc'
  const sortQuery = {
    [sortBy]: orderBy
  }
  let filterQuery = {}
  if (filter.length > 0) {
    const regx = new RegExp(filter, 'i')
    if (filterOn.length > 0) {
      filterQuery = {
        [filterOn]: regx
      }
    } else {
      filterQuery = {
        content: regx
      }
    }
  } 

  Item.countDocuments(filterQuery)
  .then(itemCount => {
    if (currentPage * pageSize > itemCount) {
      return res.status(400).json([])
    }
    Item.find(filterQuery)
    .limit(pageSize)
    .skip(currentPage * pageSize)
    .sort(sortQuery)
    .then(items => {
      return res.status(200).json({
        items,
        page: req.query.page || 1,
        total: itemCount,
        pageSize: pageSize
      })
    })
  })
  .catch(err => {
    console.log('Error finding item:', err)
    return res.status(500).json({msg: 'no item found'})
  })
})

router.get('/:id', (req, res, next) => {
  const itemId = validator.escape(req.params.id)
  if (!validator.isUUID(itemId)) {
    return res.status(400).json({msg: 'Invalid ID'})
  }
  Item.findOne({_id: itemId})
  .then(item => {
    return res.status(200).json(item)
  })
  .catch(err => {
    console.log('Error finding item:', err)
    return res.status(500).json({msg: 'no item found'})
  })
})

module.exports = router