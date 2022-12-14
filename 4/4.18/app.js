const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogrouter = require('./controllers/blogs')
const usersrouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


const mongoose = require('mongoose')
const logger = require('./utils/logger')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs', blogrouter)
app.use('/api/users', usersrouter)
app.use('/api/login', loginRouter)



module.exports = app