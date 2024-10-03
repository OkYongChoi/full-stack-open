import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'
import { Filter, PersonForm, Persons, Notification } from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameEntered, setNameEntered] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const hook = () => {
    phonebookService.getAll().then((initialPhonebook) => {
      setPersons(initialPhonebook)
    })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const existed = persons.find((person) => person.name === newName)
    if (existed) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the older number with the new one?`,
        )
      ) {
        phonebookService
          .updatePerson(existed.id, personObject)
          .then((returnedPerson) =>{
            setPersons(
              persons.map((person) =>
                person.id !== existed.id ? person : returnedPerson,
              ), 
            )
            setNotificationMessage(
              `Replaced the Phone Number of ${personObject.name}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 2000)}   
          )
          .catch((error)=>{
            setNotificationMessage(
              `Information of ${personObject.name} has already been removed from the server`
            )
            setIsError(true)
            setTimeout(() => {
              setNotificationMessage(null)
              setIsError(false)
            }, 2000)}
          )
       
      } else {
      }
    } else {
      phonebookService.create(personObject).then((returnedPerson) => {
        
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNotificationMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 2000) 
      })
    }
  }

  const handleDelete = (person) => {
    const id = person.id
    if (window.confirm(`Delete ${person.name}`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          alert(`'${person.name}' was already deleted from server`)
          setPersons(persons.filter((person) => person.id !== id))
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
      <Notification message={notificationMessage} error={isError}/>
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
