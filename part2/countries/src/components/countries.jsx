import { useState, useEffect } from "react"

import weatherService from "~/services/weather"

const Country = ({ name }) => {
    return <label>{name}</label>
}

const DetailedCountry = ({ country }) => {
    const [weather, setWeather] = useState({})
    const [weatherIcon, setWeatherIcon] = useState(null)

    useEffect(() => {
        weatherService
            .getWeather(country.capital)
            .then(weather => {
                setWeather(weather)
                weatherService
                    .getIcon(weather.weather[0]["icon"])
                    .then(icon => {
                        setWeatherIcon(icon)
                    })
            })
    }, [])

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.entries(country.languages).map(language =>
                    <li key={language[0]}>{language[1]}</li>
                )}
            </ul>
            <img src={country.flags["png"]} alt="" />
            <h2>Weather in {country.capital}</h2>
            {
                Object.keys(weather).length === 0
                ? <p>loading weather</p>
                :
                    <> 
                        <p>temperature {`
                            ${Intl.NumberFormat(
                                "pt-BR",{maximumFractionDigits:2}
                            ).format(weather.main.temp)} Celsius
                        `}</p>
                        <img src={weatherIcon}/>
                        <p>wind {
                            Intl.NumberFormat("pt-BR", {
                                style:"unit", unit:"meter-per-second"
                            }).format(weather.wind["speed"])
                        }</p>
                    </>
            }
        </>
    )
}

const Countries = ({ countries }) => {
    const [showDetails, setShowDetails] = useState(null)

    if (countries.length === 0) {
        return <p>No countries found</p>
    } else if (countries.length === 1) {
        return <DetailedCountry country={countries[0]} />
    } else if (countries.length <= 10) {
        return (
            <>
                {countries.map(country => 
                    <>
                        <Country
                            name={country.name.common}
                            key={country.name.official}
                        />
                        <button
                            key={`${country.name.official}bt`}
                            onClick={() => setShowDetails(country)}
                        >show</button>
                        <br key={`${country.name.official}br`}/>
                    </>
                )}
                {showDetails !== null
                    ? <DetailedCountry country={showDetails}/>
                    : null
                }
            </>
        )
    } else {
        return <p>Too many entries. Type another filter</p>
    }
}

export default Countries