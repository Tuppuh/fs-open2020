import React, { useState } from 'react'

const Person = ({person}) => {
  return(
    <div>
      {person.name} {person.number}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1231244',
      id: 1
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const addPerson = event => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)){
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const newperson = {
      name: newName, 
      id: persons.length + 1,
      number: newNumber,
    }
    setPersons(persons.concat(newperson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  return ( 
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {persons.map(person => <Person key={person.name} person={person}/>)}
      </ul>
    </div>
  )

}

export default App