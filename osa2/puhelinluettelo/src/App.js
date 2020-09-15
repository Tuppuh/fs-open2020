import React, { useState, useEffect }from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import FilterForm from './components/FilterForm'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ filter, setFilter] = useState('')

  const addPerson = newPerson => {
    // Return promise so that the caller can chain onto it and perform its own actions
    return(
      personService
      .create(newPerson)
      .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
      })
    )
  }

  const removePerson = id => {
    const personName = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${personName}?`)){
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
      }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return ( 
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} setFilter={setFilter}/>
      <h2>Add new number</h2>
      <PersonForm persons={persons} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} removePerson={removePerson}/>
    </div>
  )

}

export default App