/*

TODO:

Current: data processing w/ new api, create static version of app, extract into multiple components

Next: autocomplete for locations (dynamic querying)

*/

import React, { Component } from 'react';

// const baseUrl = 

const errorStyle = {
  color: 'red',
  fontSize: '2em'
};

class DataFetch extends Component {
  state = {
    weatherData: null,
    // location: 'San Francisco,CA',
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
    
    fetch('./data/weather.json')
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
      data.list.slice(1, 6).map(d => ({date: d.dt, temp: d.main.temp})) 
    )
  }
  */

  render() {
    const { weatherData, error } = this.state

    if (!weatherData) {
      return <div>loading...</div>
    }

    const currTemp = `Today: ${weatherData.data[0].temp}`

    const fiveDayForecast = weatherData.data.slice(1, 6).map(d => ({time: d.ts, temp: Math.round(d.temp)})) 



    return (
      <div className='action'>
        <div className='search-box'>
          <input
            type='text'
            placeholder='san francisco,us'
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
            <div key={interval.time}>{interval.temp}</div>
          )}
        </div>
      </div>
    )
  }
}

export default DataFetch