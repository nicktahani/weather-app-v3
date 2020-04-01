import * as moment from 'moment'
import { weatherIconMap } from '../components/WeatherIcon/weatherIconMap'

const getCurrentWeather = weatherData => {
  const currentWeatherInfo = weatherData.data.slice(0, 1).map(d => ({
    time: d.ts,
    currTemp: Math.round(d.temp),
    currDesc: d.weather.description,
    precip: `${d.pop}%`,
    windSpd: `${d.wind_spd} m/s`,
    icon: weatherIconMap[d.weather.code]
  }))
  return currentWeatherInfo
}

const getCurrentDate = weatherData => {
  return moment(weatherData.data[0].valid_date).format('dddd MMMM DD, YYYY')
}

const getForecasts = weatherData => {
  const fiveDayForecast = weatherData.data.slice(1).map(d => ({
    time: d.ts, 
    hiTemp: Math.round(d.high_temp), 
    lowTemp: Math.round(d.low_temp), 
    description: d.weather.description,
    dayOfWeek: moment(d.valid_date).format('ddd'), 
    icon: weatherIconMap[d.weather.code]
  }))
  return fiveDayForecast
}

const getLocationString = weatherData => {
  return `${weatherData.city_name}, ${weatherData.state_code} ${weatherData.country_code}`
}

const formatForApi = str => {
  return str.replace(/\s/g, '+')
}

export { getCurrentWeather, getCurrentDate, getForecasts, getLocationString, formatForApi }