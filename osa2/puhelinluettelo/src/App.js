import React, { useState, useEffect }from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personService from './services/persons'


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
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter}/>
    </div>
  )

}

export default App