const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose=require('mongoose')

test('there is one blog', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})
test('has id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.map(n=>n.id).includes(undefined)).toBe(false)
})





afterAll(() => {
  mongoose.connection.close()
})
