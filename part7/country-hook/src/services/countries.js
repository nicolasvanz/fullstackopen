import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries"

export const searchCountry = async (countryName) => {
    const response = await axios.get(`${baseUrl}/api/name/${countryName}`)
    return response.data
}

export default {
    searchCountry
}