require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors =  require('cors')
const fs = require('fs');
const markdown = require('markdown-it')();
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/', (request, response) => {
  fs.readFile('README.md', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).send('Internal Server Error');
      return;
    }
    const htmlContent = markdown.render(data);
    response.send(htmlContent);
  });
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(response.params.id)
    .then(person => {
      response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((p) => p.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length}</p>
     <p>${Date()}</p>`,
  )
})


app.post('/api/persons',(request, response) => {

  const body = request.body
  if(body.name === undefined) {    
    return response.status(400).json({
      error: 'name missing'
    })
  } else if(body.number === undefined) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name : body.name,
    number: body.number,
  })
  person.save().then(savedPerson =>
    response.json(savedPerson)
  )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
