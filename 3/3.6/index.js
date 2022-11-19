const express = require('express')
const morgan=require('morgan')
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
const msg=`<div>phonebook has info for ${notes.length} People</div> <div>${new Date()}</div>`

app.get('/info',(request,response)=>{response.send(msg)

}
)

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if (notes.filter(n=>n.name==body.name).length>0){
    return(
      response.status(400).json({error:'name must be unique'})
    )

  }
  const note = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})