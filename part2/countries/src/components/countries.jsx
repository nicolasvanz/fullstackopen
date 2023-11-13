import { useState, useEffect } from "react"

const Country = ({ name }) => {
    return <label>{name}</label>
}

const DetailedCountry = ({ country }) => {
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