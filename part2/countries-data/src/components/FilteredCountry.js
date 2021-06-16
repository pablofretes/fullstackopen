import Countries from '../services/Countries'
import React, { useEffect, useState } from 'react'

const FilteredCountry = ({ country }) => {

  const [filteredCountry, setFilteredCountry] = useState([])

  const getFilteredCountry = () => {
        Countries
          .getCountry(country.name)
            .then(response => {
              console.log(response)
              console.log(response.data)
              setFilteredCountry(response.data)
            })
  }
  useEffect(getFilteredCountry, [country.name])

  const currencyList = []

  country.currencies.forEach(currency => currencyList.push(<li key={country.name}>- Code: {currency.code}<br></br>
    - Name: {currency.name}<br></br>- Symbol: {currency.symbol}</li>))

    return (
        <div>
            <h2>Country: {country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Currency:</p><ul>{currencyList}</ul>
            <img src={country.flag} className='image' alt='flag'/>
        </div>
    )
}

export default FilteredCountry