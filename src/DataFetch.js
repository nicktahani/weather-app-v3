/*

TODO:

data processing

*/

import React, { Component } from 'react';

const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=26c157eab6caa2265bab9800960adaf9'

class DataFetch extends Component {
  state = {
    weatherData: null,
    location: 'san francisco,us'
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
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(weatherData => this.setState({ weatherData }, () => console.log(this.state.weatherData)))
  }

  render() {
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
      </div>
    )
  }
}

export default DataFetch