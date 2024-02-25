import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'

const Filter = ({ nameFilter, handleFilter }) => (
  <div>
    Filter Shown With <input value={nameFilter} onChange={handleFilter} />
  </div>
)

const PersonForm = ({
  handleSubmit,
  name,
  number,
  handleNameChange,
  handleNumberChange,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={name} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={handleNumberChange} />
    </div>

    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)
const Persons = ({ persons, filterName, handleDelete }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase()),
  )
  return (
    <table>
      <tbody>
        {filteredPersons.map((person) => {
          return (
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={() => handleDelete(person)}>delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameEntered, setNameEntered] = useState('')

  const hook = () => {
    phonebookService.getAll().then((initialPhonebook) => {
      setPersons(initialPhonebook)
    })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const isIncluded = persons.some((person) => person.name === newName)
    if (isIncluded) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      phonebookService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
      })
    }
  }

  const handleDelete = (person) => {
    const id = person.id
    if (window.confirm(`Delete ${person.name}`)) {
      phonebookService.deletePerson(id).then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id != returnedPerson.id))
      })
    } else {
    }
  }

  const handleNameEntered = (event) => {
    setNameEntered(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameEntered} handleFilter={handleNameEntered} />
      <h3>Add a New</h3>
      <PersonForm
        handleSubmit={addPerson}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterName={nameEntered}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
