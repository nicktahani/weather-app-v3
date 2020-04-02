/*

Fetching location data from server

*/

import React, { Component } from 'react'
import '../css/Autocomplete.css'

const baseApiUrl = 'http://localhost:3005/api'

const deserializer = row => ({
  cityName: row.city_name,
  stateCode: row.state_code,
  countryCode: row.country_code
})

export default class Autocomplete extends Component {
  state = {
    isFetching: false,
    error: false,
    results: null,
    searchString: '',

    isOpen: false
  }

  componentDidMount () {
    window.addEventListener('click', this.closeResults)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.closeResults)
  }

  closeResults = () => {
    this.setState({ isOpen: false })
  }

  formatResultForDisplay = ({ cityName, stateCode, countryCode }) => {
    return `${cityName}, ${stateCode} (${countryCode})`
  }

  handleUpdateInput = e => {
    const { value: searchString } = e.target

    this.setState({ 
      searchString, 
      isOpen: false 
    }, () => {
      if (searchString.length > 2) {
        this.fetchAutocompleteResults(searchString)
      }
    })
  }

  fetchAutocompleteResults = async searchString => {
    console.log(searchString)
    const res = await fetch(`${baseApiUrl}/search/${searchString}`)
    const json = await res.json()
    this.setState({
      results: json.rows.map(deserializer),
      isOpen: true
    })
  }

  handleSelectResult = result => {
    this.setState({ isOpen: false }, () => {
      if (this.props.onSelectResult) {
        this.props.onSelectResult(result)
      }
    })
  }

  render () {
    const { isFetching, results, searchString, isOpen } = this.state

    if (isFetching) {
      return 'loading...'
    }

    return (
      <div>
        <input type='text' onChange={this.handleUpdateInput} value={searchString} />
      
        {isOpen && results &&
          results.map((result, i) =>  
            <div className='items'
              onClick={() => this.handleSelectResult(result)} 
              key={i}
            >
              {this.formatResultForDisplay(result)}
            </div>
          )
        }
      </div>
    )
  }
}


