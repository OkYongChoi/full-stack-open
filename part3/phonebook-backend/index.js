const express = require('express')
const morgan = require('morgan')
const cors =  require('cors')
const fs = require('fs');
const markdown = require('markdown-it')();

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

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

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
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((p) => p.id === id)

  if (!person) {
    response.status(404).end()
  } else {
    response.json(person)
  }
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


const generateId = () => {
  return Math.floor(Math.random() * 100) + Math.max(...persons.map(p => p.id));
}

app.post('/api/persons',(request, response) => {

  const body = request.body
  if(!body.name || !body.number) {    
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if(persons.some(p=>p.name === body.name)) {
    return response.status(409).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name : body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(person)
  response.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
