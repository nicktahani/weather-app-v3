import React from 'react'
import '../css/ForecastCard.css'

import { WeatherIcon } from './WeatherIcon'

const ForecastCard = ({ fiveDayForecast }) => {
  console.log(fiveDayForecast)
  return (
      <div className='forecasts'>
          {fiveDayForecast.map(forecast => 
            <div key={forecast.time} className='forecast-info'>
              <div className='forecast-day'>
                {forecast.dayOfWeek}
              </div>
              <div className='forecast-icon'>
                <WeatherIcon icon={forecast.icon} />
              </div>
              <div className='forecast-desc'>
                {forecast.description}
              </div>
              <div className='hi-low'>
                <b>{forecast.hiTemp}&#176;</b> {forecast.lowTemp}&#176;
              </div>
            </div>
          )}
        </div>
  )
}

export default ForecastCard