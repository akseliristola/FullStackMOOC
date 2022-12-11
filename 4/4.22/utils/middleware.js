const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    }
    next()
  }
  const userExtractor=async(request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const thisuser=await User.findById(decodedToken.id)
    request.user=thisuser
    next()
  }


  module.exports = {
    tokenExtractor,
    userExtractor
  }