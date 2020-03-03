import React from 'react'

import './css/weather-icons.min.css'
import './css/weather-icons-wind.min.css'


export function WeatherIcon ({ icon }) {
  if (!icon) {
    return 'no icon'
  }

  return (
    <img 
      src={`${process.env.PUBLIC_URL}/weather-icons/svg/${icon}.svg`} 
      alt={icon} 
      style={{width: '150px', height: '150px'}}
    />
  )
}
