const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const tokenSecret = process.env.tokenSecret || 'please set a real secret in proudction'

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

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
})

app.use(session({
  secret: tokenSecret,
  store: sessionStore,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: true
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(morgan('dev'))
app.use(router)

app.use('/api', require('./routes'))

app.get('/', (req, res) => {
  return res.status(200).json({msg: 'Welcome to the api'})
})

server.listen(port)