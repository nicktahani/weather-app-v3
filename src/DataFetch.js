import React, { Component } from 'react';

const url = `http://api.openweathermap.org/data/2.5/forecast?q=san francisco,us&units=imperial&APPID=26c157eab6caa2265bab9800960adaf9`


class DataFetch extends Component {
  state = {
    weatherData: null
  }

  componentDidMount() {
    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({ weatherData: json }))
  }

  render() {
    return (
      <div className="data">
        {console.log(this.state.weatherData)}
      </div>
    )
  }
}

export default DataFetch