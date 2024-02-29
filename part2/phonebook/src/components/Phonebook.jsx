export const Filter = ({ nameFilter, handleFilter }) => (
    <div>
      Filter Shown With <input value={nameFilter} onChange={handleFilter} />
    </div>
  )
  
export const PersonForm = ({
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
  export const Persons = ({ persons, filterName, handleDelete }) => {
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

export const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}