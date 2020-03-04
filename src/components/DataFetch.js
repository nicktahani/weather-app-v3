/*

TODO:

Current: wrap-up data processing, credits in readme

Next: autocomplete for locations (dynamic querying)

*/

import React, { Component } from 'react';
import ForecastCard from './ForecastCard'
import CurrentWeather from './CurrentWeather'
import '../css/DataFetch.css'
import * as moment from 'moment';


import { weatherIconMap } from './WeatherIcon/weatherIconMap'

// const baseUrl = 

const errorStyle = {
  color: 'red',
  fontSize: '2em'
};

const getCurrentWeather = weatherData => {
  const currentWeatherInfo = weatherData.data.slice(0, 1).map(d => ({
    time: d.ts,
    currTemp: Math.round(d.temp),
    currDesc: d.weather.description,
    precip: `${d.pop}%`,
    windSpd: `${d.wind_spd} mph`,
    icon: weatherIconMap[d.weather.code]
    //currDate: moment(d.valid_date).format('MMMM DD, YYYY')
  }))
  return currentWeatherInfo
}

const getCurrentDate = weatherData => {
  return moment(weatherData.data[0].valid_date).format('dddd MMMM DD, YYYY')
}

const getForecasts = weatherData => {
  const fiveDayForecast = weatherData.data.slice(1, 6).map(d => ({
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

class DataFetch extends Component {
  state = {
    isLoading: true,
    weatherData: null,
    // location: 'San Francisco,CA',
    fiveDayForecast: null,
    currentWeatherInfo: null,
    error: false

  }

  componentDidMount() {
    this.fetchData()
  }


  // handleChange = e => {
  //   this.setState({ location: e.target.value }) 
  // }

  handleSubmit = e => {
    this.fetchData()
  }

  fetchData = () => {
    // const url = `${baseUrl}&q=${this.state.location}`
    this.setState({ isLoading: true, error: false }, () => {
      fetch('./data/weather.json')
        .then(res => {
          if (!res.ok) {
            return Promise.reject(`Looks like there was a problem. Status Code: ${res.status}`)
          }
          return res.json()
        })
        // .then(this.deserializeApiData)
        .then(weatherData => 
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

  /*
  deserializeApiData = data => {
    console.log('deserializing', data)
    return (
      data.list.slice(1, 6).map(d => ({date: d.dt, temp: d.main.temp})) 
    )
  }
  */

  render() {
    const { isLoading, error, locationString, currentDate, currentWeatherInfo, fiveDayForecast } = this.state

    if (isLoading) {
      return <div>loading...</div>
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
              <input
                type='text'
                placeholder='san francisco,us'
                autoFocus='autofocus'
              />
            </div>
            <div className='submit-btn'>
              <input 
                type='submit' 
                value='submit' 
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
        <CurrentWeather 
          currentWeatherInfo={currentWeatherInfo} 
          locationString={locationString}
        />
        {error && <div style={errorStyle}>Please enter a valid location</div>}
        <ForecastCard 
          fiveDayForecast={fiveDayForecast}
        />
      </div>
    )
  }
}

export default DataFetch