import axios from 'axios'

export const getWeather = (capital) => {
    const key = import.meta.env.VITE_WEATHER_API_KEY
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${key}&units=metric`)
}