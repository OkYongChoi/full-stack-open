import { useState } from 'react'

const Persons = ({ persons, filterName }) => {
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
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameEntered, setNameEntered] = useState('')

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
      setPersons(persons.concat(personObject))
      setNewName('')
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
      Filter Shown With{' '}
      <input value={nameEntered} onChange={handleNameEntered} />
      <h2>Add a New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={nameEntered} />
    </div>
  )
}

export default App
