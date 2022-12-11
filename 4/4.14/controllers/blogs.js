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
 
  blogsrouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
  })


  


  blogsrouter.put('/:id',(req,res)=>{

    const body = req.body
    Blog.findByIdAndUpdate(req.params.id,body).then(updatedNote =>res.json(updatedNote))
  })

  module.exports=blogsrouter