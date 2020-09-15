import React, { useState }from 'react'
import personService from '../services/persons'

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
      personService
        .create(newperson)
        .then(returnedPerson => {
            setPersons(persons.concat(newperson))
            setNewName('')
            setNewNumber('')
        })
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

export default PersonForm