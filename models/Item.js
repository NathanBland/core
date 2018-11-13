const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const Item = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  itemType: String,
  content: mongoose.SchemaTypes.Mixed,
  creator: {
    type: String,
    ref: "User"
  }
}, {timestamps: true})

module.exports = mongoose.model('Item', Item)