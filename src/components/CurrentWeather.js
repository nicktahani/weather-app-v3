import React from 'react'
import '../css/CurrentWeather.css'

import { WeatherIcon } from './WeatherIcon'


const CurrentWeather = ({ currentWeatherInfo, locationString }) => {
  return (
    <div className='currWeather'>
      {currentWeatherInfo.map(curr =>
        <div key={curr.time} className='curr-info'>
          <div className='curr-icon'>
            <WeatherIcon icon={curr.icon} />
          </div>
          <div className='location-info'> 
            <div>
              {locationString}
            </div>
            <div className='curr-temp'>
              {curr.currTemp}&#176;F
            </div>
            <div>
              {curr.currDesc}
            </div>
          </div>
          <div className='precip-wind'>
            <div className='precip'>
              <WeatherIcon icon={'wi-humidity'} />
              {curr.precip}
            </div>
            <div className='wind'>
              <WeatherIcon icon={'wi-windy'} />
              {curr.windSpd}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrentWeather
