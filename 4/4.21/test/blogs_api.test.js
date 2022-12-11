const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose=require('mongoose')

const Blog=require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

})
test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})
test('has id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.map(n=>n.id).includes(undefined)).toBe(false)
})
test('a valid note can be added ', async () => {
  const initialBlogs= await api.get('/api/blogs')
  const newNote = {
    title: 'async/await simplifies making async calls',
    author: "nikke",
    url:"aaa",
    likes:1
  }

  await api
    .post('/api/blogs')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')


  expect(response.body.length).toBe(initialBlogs.body.length+1)

})

test('Blog has 0 likes if no likes is entered',async() =>{
  const newNote = {
    title: 'async/await simplifies making async calls',
    author: "nikke",
    url:"aaa"
  }
  await api.
  post('/api/blogs')
  .send(newNote)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body[response.body.length-1].likes).toBe(0)
})

test('blog has a title and an url',async()=>{
  const newNote = {
    title: 'async/await simplifies making async calls',
    author:"jd",
    url:"jjd",
  }
  await api. 
  post('/api/blogs')
  .send(newNote)
  .expect(201)}

)




test('blog can be deleted',async()=>{
  const newNote = {
    title: 'async/await simplifies making async calls',
    author:"jd",
    url:"jjd",
  }
  await api. 
  post('/api/blogs')
  .send(newNote)
  .expect(201)
  
  const allBlogs=await Blog.find({})
  await api.
  delete(`/api/blogs/${allBlogs[0].id.toString()}`).expect(204)

  


})

test('blog can be updated',async()=>{
  const newNote = {
    title: 'async/await simplifies making async calls',
    author:"jd1",
    url:"jjd",
  }
  await api. 
  post('/api/blogs')
  .send(newNote)
  .expect(201)

  const allBlogs=await Blog.find({})
  const first=allBlogs[0]
  console.log(first)
  await api.
  put(`/api/blogs/${first._id.toString()}`)
  .send(newNote)
  .expect(200)
})
test('username with 2 letters should fail',async()=>{
  const newuser={
    username: "kj",
    name: "aasdj",
    password: "aqwef"
    }
    await api.
    post('/api/users').expect(400)
})
test('password with 2 letters should fail',async()=>{
  const newuser={
    username: "kjsdjsd",
    name: "aasdj",
    password: "aq"
    }
    await api.
    post('/api/users').expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})