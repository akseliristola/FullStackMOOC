const blogsrouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsrouter.get('/', (request, response) => {
    Blog
      .find({})
      .populate('user')
      .then(blogs => {
        response.json(blogs)
      })
  })
  





  blogsrouter.post('/', async (request, response) => {
    try{
    const body=request.body
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })}
    

    const user = await User.findById(decodedToken.id)
    const theblog = new Blog({
      title:body.title,
      author:body.author,
      url:body.url,
      likes:body.likes,
      user:user._id
    })
    const savedBlog=await theblog.save()
    user.notes = user.notes.concat(savedBlog._id)
    await user.save()
    response.status(201).json(theblog)}
    catch(error){response.status(400).send(error)}
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