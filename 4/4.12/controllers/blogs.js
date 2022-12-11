const blogsrouter = require('express').Router()
const Blog = require('../models/blog')


blogsrouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  

  blogsrouter.post('/', (request, response) => {
    const theblog = new Blog(request.body)
    theblog.id=theblog.id || 0
    theblog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error=>response.status(400).send(error))

    }

  )

  module.exports=blogsrouter