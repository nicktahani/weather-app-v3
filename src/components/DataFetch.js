/*

TODO:

data processing, use hooks, autocomplete for locations



*/

import React, { Component } from 'react';

const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=26c157eab6caa2265bab9800960adaf9'

const errorStyle = {
  color: 'red',
  fontSize: '2em'
};

class DataFetch extends Component {
  state = {
    weatherData: null,
    location: 'san francisco,us',
    error: false
  }

  componentDidMount() {
    this.fetchData()
  }


  handleChange = e => {
    this.setState({ location: e.target.value }) 
  }

  handleSubmit = e => {
    this.fetchData() 
  }

  fetchData = () => {
    const url = `${baseUrl}&q=${this.state.location}`
    
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw 'invalid'
        }
        return res.json()
      })
      // .then(this.deserializeApiData)
      .then(weatherData => this.setState({ weatherData, error: false }, () => console.log(weatherData)))
      .catch(e => this.setState({ error: e }, () => console.log(e)))
  }
  /*
  deserializeApiData = data => {
    console.log('deserializing', data)
    return (
      data.list.slice(1, 6).map(d => ({date: d.dt, temp: d.main.temp})) //next 5 weather forecasts (for cards)
    )
  }
  */

  render() {
    const { weatherData, error } = this.state

    if (!weatherData) {
      return <div>loading...</div>
    }

    const currTemp = `Currently: ${Math.round(weatherData.list[0].main.temp)}`

    const fiveDayForecast = weatherData.list.slice(1, 6).map(d => ({date: d.dt, temp: Math.round(d.main.temp)}))

    const date = weatherData.list[0].dt_txt

    console.log(date)

    return (
      <div className='action'>
        <div className='search-box'>
          <input
            type='text'
            placeholder='san francisco,us'
            onChange={this.handleChange}
          />
        </div>

        <div className='submit-btn'>
          <input type='submit' value='submit' onClick={this.handleSubmit}/>
        </div>

        <div className='currWeather'>
          {error && <div style={errorStyle}>Please enter a valid location</div>}
          {currTemp}
        </div>

        <div className='forecasts'>
          {fiveDayForecast.map(interval => 
            <div key={interval.date}>{interval.temp}</div>
          )}
        </div>
      </div>
    )
  }
}

export default DataFetch