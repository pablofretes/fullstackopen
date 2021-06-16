import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './services/Countries'
import DisplayCountries from './components/DisplayCountries'
import FilteredCountry from './components/FilteredCountry'
import './index.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
 
  const countriesAPI = () => {
    Countries
      .getCountries()
        .then(response => {
          console.log(response)
          console.log(response.data)
          setCountries(response.data)
        })
  }

  useEffect(countriesAPI, [])

  const showCountries = countries.filter(country => '' ? country : country.name.toLowerCase().includes(filter.toLowerCase()))

  const amountOfCountries = () => {
      if(filter === ''){
        return <p>Search for a country using the filter!</p>
      }

      if(showCountries.length > 10 && showCountries !== ''){
        return <p>Too many matches, please be more specific!</p>
      }
  
      if(showCountries.length < 11 && showCountries.length > 1){
        return showCountries.map(country => <li key={country.name}>{country.name}</li>)
      }
  
      if(showCountries.length === 1) {
        return showCountries.map(country => <FilteredCountry key={country.name} country={country}/>)
      }
  }

  return (
    <div>
      <h1>Countries Information</h1>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <DisplayCountries handleCountries={amountOfCountries()}/>
    </div>
  )
}

export default App;
