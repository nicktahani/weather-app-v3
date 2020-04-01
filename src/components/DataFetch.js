/*

Fetching weather data from weatherbit

check error display

*/

import React, { Component } from 'react';
import ForecastCard from './ForecastCard'
import CurrentWeather from './CurrentWeather'
import Autocomplete from './Autocomplete'
import '../css/DataFetch.css'
import { getCurrentWeather, getCurrentDate, getForecasts, getLocationString, formatForApi } from '../util/weather.js'

const apiKey = process.env.REACT_APP_API_KEY
const baseUrl = `https://api.weatherbit.io/v2.0/forecast/daily?units=I&days=6&key=${apiKey}`

const errorStyle = {
  color: 'red',
  fontSize: '2em'
};


class DataFetch extends Component {
  state = {
    isLoading: true,
    weatherData: null,
    location: {cityName: 'San Francisco', stateCode: 'CA', countryCode: 'US'},
    fiveDayForecast: null,
    selectedResult: null,
    currentWeatherInfo: null,
    error: false

  }

  componentDidMount() {
    this.fetchData()
  }

  onSelectResult = result => {
    this.setState({ location : result }, () => {
      this.fetchData()
    })
  }

  fetchData = () => {
    const { location } = this.state

    const locationQueryString = [
      location.cityName, 
      location.stateCode, 
      location.countryCode
    ].join(',')

    const searchString = formatForApi(locationQueryString)

    const url = `${baseUrl}&city=${searchString}`
    this.setState({ isLoading: true, error: false }, () => {
      fetch(url)
        .then(res => {
          if (!res.ok) {
            return Promise.reject(`Looks like there was a problem. Status Code: ${res.status}`)
          }
          return res.json()
        })
        .then(weatherData => 
          console.log('xxx', getForecasts(weatherData), weatherData.data.length) ||
          this.setState({ 
            currentWeatherInfo: getCurrentWeather(weatherData), 
            fiveDayForecast: getForecasts(weatherData),
            locationString: getLocationString(weatherData),
            currentDate: getCurrentDate(weatherData),
            isLoading: false,
            error: false 
          })
        )
        .catch(e => {
          this.setState({ 
            isLoading: false, 
            error: e 
          }, () => 
            console.log(e)
          )
        })
    })
  }

  render() {
    const { isLoading, error, locationString, currentDate, currentWeatherInfo, fiveDayForecast } = this.state

    if (isLoading) {
      return <div>loading...</div>
    }

    if (error) {
      return 'error'
    }

    console.log(this.state)

    return (
      <div className='wrapper'>
        <div className='top'>
          <div className='date-info'>
            {currentDate}
          </div>
          <div className='action'>
            <div className='search-box'>
              <Autocomplete onSelectResult={this.onSelectResult} />
              {error && <div style={errorStyle}>Please enter a valid location</div>}
            </div>
          </div>
        </div> 
        <CurrentWeather 
          currentWeatherInfo={currentWeatherInfo} 
          locationString={locationString}
        />
        <ForecastCard fiveDayForecast={fiveDayForecast} />
      </div>
    )
  }
}

export default DataFetch