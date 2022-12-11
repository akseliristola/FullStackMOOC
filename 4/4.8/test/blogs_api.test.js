const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose=require('mongoose')

test('there is one blog', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

afterAll(() => {
  mongoose.connection.close()
})
