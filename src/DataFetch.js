import React, { Component } from 'react';

const url = `http://api.openweathermap.org/data/2.5/forecast?q=san francisco,us&units=imperial&APPID=26c157eab6caa2265bab9800960adaf9`

class DataFetch extends Component {
  state = {
    weatherData: null
  }

  componentDidMount() {
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
          />
        </div>
        <div className='submit-btn'>
          <button>submit</button>
        </div>
      </div>
    )
  }
}

export default DataFetch