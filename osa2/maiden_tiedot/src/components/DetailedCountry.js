import React from 'react'

const DetailedCountry = ({country}) => {
    return(
        <div>
            <h2>{country.name}</h2>
            <div/>
            
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <div/>
            
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => 
                <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <div/>
            <img src={country.flag} alt={`${country.demonym} flag`} width="30%" height="30%"></img>
        </div>
    )
}

export default DetailedCountry
