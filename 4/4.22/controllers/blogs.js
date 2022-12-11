const blogsrouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
blogsrouter.get('/', (request, response) => {
    Blog
      .find({})
      .populate('user')
      .then(blogs=>response.json(blogs))
      })


  blogsrouter.post('/', middleware.userExtractor,async (request, response) => {
    try{
    const body=request.body
    const user=request.user
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })}
    

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
 


  blogsrouter.delete('/:id',middleware.userExtractor, async (request, response) => {
    try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id!==request.user._id.toString()){
      return response.status(400).send("error: token invalid")}
    else{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()}}
    catch(error){response.status(400).send(error)}
  })





  blogsrouter.put('/:id',(req,res)=>{
    try{
    const body = req.body
    console.log(body.likes)
    Blog.findByIdAndUpdate(req.params.id,body).then(updatedNote =>res.json(updatedNote))}
    catch(error){res.status(400).send('put error')}
  })




  module.exports=blogsrouter