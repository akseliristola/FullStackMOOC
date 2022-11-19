const express = require('express')
const app = express()

let notes = [
  {
    id:1,
    name:"Arto Hellas",
    number:"040-123456"
  },
  {
    id:2,
    name:"Ada Lovelance",
    number:"39-44-5323523"
  },{
    id:3,
    name:"Dan Abramov",
    number:"12-34-234345"
  },{
    id:4,
    name:"Mary Poppendick",
    number:"39-23-6423122"
  }
]

app.use(express.json())




app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.get('/api/persons', (req, res) => {
  res.json(notes)
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})