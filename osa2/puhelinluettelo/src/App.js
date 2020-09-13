import React, { useState, useEffect }from 'react'
import axios from 'axios'

const Person = ({person}) => {
  return(
    <div>
      {person.name} {person.number}
    </div>
  )
}

const PersonList = ({persons, filter}) => {
  const filtered_persons = persons.filter( person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  return (
    <ul>
      {filtered_persons.map(person => <Person key={person.name} person={person}/>)}
    </ul>
  )
}

const PersonForm = ({persons, setPersons}) => {
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
  return(
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
  )
}

const FilterForm = ({filter, setFilter}) => {
  const handleFilterChange = event => {
    setFilter(event.target.value)
  }
  return(
    <>
    Filter name
    <input value={filter} onChange={handleFilterChange}/>
    </>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return ( 
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} setFilter={setFilter}/>
      <h2>Add new number</h2>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter}/>
    </div>
  )

}

export default App