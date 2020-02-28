import React from 'react'
import '../css/CurrentWeather.css'

const CurrentWeather = ({ currentWeatherInfo, locationString }) => {
  return (
    <div className='currWeather'>
      {currentWeatherInfo.map(curr =>
        <div key={curr.time} className='curr-info'>
          <div className='forecast-image'>
            image
          </div>
          <div className='location-info'> 
            <div>
              {locationString}
            </div>
            <div>
              {curr.currTemp}
            </div>
            <div>
              {curr.currDesc}
            </div>
          </div>
          <div className='precip-wind'>
            <div>
              {curr.precip}
            </div>
            <div> 
              {curr.windSpd}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrentWeather