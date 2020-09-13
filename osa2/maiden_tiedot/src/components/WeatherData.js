import React, { useState, useEffect }from 'react'
import axios from 'axios'

const WeatherData = ({city}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({})

    useEffect(() => {
        console.log("sending request..")
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [])

    // Do not render anything if object is empty since accessing 0:th index of None will crash
    // the script
    if (Object.keys(weather).length === 0) {
        return (
            <div></div>
        )
    }
    return(
        <div>
            <h3>Weather in {city}</h3>
            <div/>
            <div><b>temperature: </b>: {weather.temperature} Celsius</div>
            <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} width="10%" height="10%"></img>
            <div><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</div>
        </div>
    )
}

export default WeatherData
