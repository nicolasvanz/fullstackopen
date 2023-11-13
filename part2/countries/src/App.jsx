import { useEffect, useState } from 'react'

import countriesService from "~/services/countries"
import ErrorNotification from "~/components/notification"
import Countries from "./components/countries"

function App() {
  const [searchCountry, setSearchCountry] = useState("")
  const [countries, setCountries] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  const notify = message => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
      .catch(error => notify("could not get data from server"))
  }, [])

  useEffect(() => {
    setFilteredCountries(countries.filter(
      country => country.name.common.toLowerCase().includes(searchCountry)
    ))
  }, [searchCountry])

  return (
    <>
      <div>
        <ErrorNotification message={notificationMessage}/>
        <label>Find countries: </label>
        <input 
          value={searchCountry}
          onChange={(event) => setSearchCountry(event.target.value)}
        />
        {
          searchCountry === ""
          ? <p>Type to filter the countries</p>
          : <Countries countries={filteredCountries}/>
        }
      </div>
    </>
  )
}

export default App
