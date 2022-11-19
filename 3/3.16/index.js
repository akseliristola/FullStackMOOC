require('dotenv').config()

const express = require('express')
const morgan=require('morgan')

const app = express()
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
const Persons = require('./models/person')



app.use(express.json())
morgan.token('type',(req,res)=>{if (req.method=="POST") return JSON.stringify(Persons[Persons.length-1])})
app.use(morgan(`:method :url :status :res[content-length] - :response-time :type ms`))


app.post('/api/persons', (request, response) => {
  const body = request.body


  const person = new Persons({
    name: body.name,
    number: body.number
  })

  person.save().then(savedNote => {
    response.json(savedNote)
  })
})


app.get('/api/persons', (request, response) => {
  Persons.find({}).then(notes => {
    response.json(notes)
  })
})



const msg=`<div>phonebook has info for ${Persons.length} People</div> <div>${new Date()}</div>`

app.get('/info',(request,response)=>{response.send(msg)

}
)

app.get('/api/persons/:id', (request, response, next) => {
  Persons.findById(request.params.id).then(note => {
    response.json(note)
  })
  .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

app.delete('/api/persons/:id', (request, response) => {
  Persons.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})