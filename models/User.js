const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const User = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid()
  },
  username: String,
  perferences: mongoose.SchemaTypes.Mixed
}, {timestamps: true})

User.plugin(require('passport-local-mongoose'))

module.exports = mongoose.model('User', User)