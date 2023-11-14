import axios from "axios"

const weatherBaseUrl = "https://api.openweathermap.org"
const iconBaseUrl = "https://openweathermap.org"
const apiKey = import.meta.env.VITE_SERVICE_WEATHER_KEY

const kelvinToCelcius = (temp) => (temp - 273.15)

const getWeather = (cityName) => {
    const request = axios.get(
        `${weatherBaseUrl}/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    )
    return request.then(response => {
        const data = response.data
        return {
            ...data,
            main: {
                ...data.main,
                feels_like:kelvinToCelcius(data.main.feels_like),
                temp:kelvinToCelcius(data.main.temp),
                temp_max:kelvinToCelcius(data.main.temp_max),
                temp_min:kelvinToCelcius(data.main.temp_min),
            }
        }
    })
}

const getIcon = async (id) => {
    const res = await fetch(`${iconBaseUrl}/img/wn/${id}@2x.png`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;
}

export default {
    getWeather,
    getIcon
}