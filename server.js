const express = require('express')
const helmet = require('helmet')

const app = express()

const port = process.env.PORT || 3000
const server = require('http').Server(app)

app.get('/', (req, res) => {
  return res.status(200).json({msg: 'Welcome to the api'})
})

server.listen(port)