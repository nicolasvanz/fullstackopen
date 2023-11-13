const Country = ({ name }) => {
    return <p>{name}</p>
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
    if (countries.length === 0) {
        return <p>No countries found</p>
    } else if (countries.length === 1) {
        return <DetailedCountry country={countries[0]} />
    } else if (countries.length <= 10) {
        return (
            <>
                {countries.map(country => 
                    <Country name={country.name.common} key={country.name.official} />
                )}
            </>
        )
    } else {
        return <p>Too many entries. Type another filter</p>
    }
}

export default Countries