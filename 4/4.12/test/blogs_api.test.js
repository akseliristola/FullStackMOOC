const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose=require('mongoose')

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
    url:"jjd",
    author:"jd"
    
  }
  const response=await api. 
  post('/api/blogs')
  .send(newNote)
  .expect(201)}

)

afterAll(() => {
  mongoose.connection.close()
})