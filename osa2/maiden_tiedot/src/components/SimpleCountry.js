import React from 'react'

const SimpleCountry = ({country, setFilter}) => {
    return(
      <div>
        {country.name}
        <button onClick={() => setFilter(country.name)}>show</button>
      </div>
    )
}

export default SimpleCountry