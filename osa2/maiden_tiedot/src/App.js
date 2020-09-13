import React, { useState, useEffect }from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import FilterForm from './components/FilterForm'

import './App.css';

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <FilterForm filter={filter} setFilter={setFilter}/>
      <CountryList countries={countries} filter={filter}/>
    </div>
  )
}

export default App;
