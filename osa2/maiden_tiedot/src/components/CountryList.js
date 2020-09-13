import React from 'react'
import SimpleCountry from './SimpleCountry'
import DetailedCountry from './DetailedCountry'

const CountryList = ({countries, filter, setFilter}) => {
    const filtered_countries = countries.filter(country =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    )
    if (filtered_countries.length > 10){
      return(
        <div> Too many matches, use more specific filter</div>
      )
    }
    if (filtered_countries.length === 1){
        return(
            <DetailedCountry country={filtered_countries[0]}/>
        )
    }
    return(
      <ul>
        {filtered_countries.map(country => <SimpleCountry 
        key={country.numericCode} 
        country={country}
        setFilter={setFilter}/>)}
      </ul>
    )
}

export default CountryList