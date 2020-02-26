import React from 'react'
import '../css/ForecastCard.css'

const ForecastCard = ({ fiveDayForecast }) => {
  return (
      <div className='forecasts'>
          {fiveDayForecast.map(forecast => 
            <div key={forecast.time} className='forecast-info'>
              <div className='forecast-desc'>
                {forecast.description}
              </div>
              <div className='hi-low'>
                {`${forecast.hiTemp}, ${forecast.lowTemp}`}
              </div>
            </div>
          )}
        </div>
  )
}

export default ForecastCard