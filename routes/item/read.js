const router = require('express').Router()
const Item = require('../../models/Item')

router.get('/', (req, res, next) => {
  const pageSize = 20
  const currentPage = req.query.page > 0 ? req.query.page - 1 : 0
  const filter = req.query.filter || ''
  const filterOn = req.query.filterOn || ''
  const sortBy = req.query.sortBy || 'createdAt'
  const orderBy = req.query.orderBy || 'asc'
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