const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')

const morgan = require('morgan')


const app = express()
app.use(helmet())
const router = express.Router()

mongoose.Promise = global.Promise
mongoose.connect(process.env.dbURL || 'mongodb://core-db:27017/core', {useNewUrlParser: true})

const port = process.env.PORT || 3000
const server = require('http').Server(app)

app.use(cookieParser())

app.use(bodyParser.json())

app.use(passport.initialize())

app.use(morgan('dev'))
app.use(router)

app.use('/api', require('./routes'))

app.get('/', (req, res) => {
  return res.status(200).json({msg: 'Welcome to the api'})
})

server.listen(port)