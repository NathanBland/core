const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(process.env.dbURL || 'mongodb://core-db:27017/core', {useNewUrlParser: true})

const port = process.env.PORT || 3000
const server = require('http').Server(app)

app.get('/', (req, res) => {
  return res.status(200).json({msg: 'Welcome to the api'})
})

server.listen(port)