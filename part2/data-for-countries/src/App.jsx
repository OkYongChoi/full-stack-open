import { useEffect, useState } from "react"
import axios from 'axios'

const Country = ({countryName: con}) => {
  const conInfo = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${con}`)
  .then(resp => resp.data)

  return (
    <>
      <h1>{con}</h1>
    </>
  )
}

const Countries = ({countries, filterCountry}) => {
  const filteredCountries = countries.filter(country => country.toLowerCase().includes(filterCountry.toLowerCase()),)
  if(filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else {
    if(filteredCountries.length === 1) {
      const country = filteredCountries[0]      
      return <Country countryName={country} />
      
    }

    return filteredCountries.map((country, index) => <div key={index} >{country}</div>)
  }
}

const App = () => {
  const [countryJSON, setCountryJSON] = useState([]) 
  const [countries, setCountries] = useState([])
  const [findingCountry, setFindingCountry] = useState('')


  const hook = () => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountryJSON(response.data)
      setCountries(response.data.map(country => country.name.common))
    })
  }
  useEffect(hook, [])
  
  const handleFindingCountry = (event) => {
    setFindingCountry(event.target.value)
  }

  return (
    <>
      <div>Find Countries <input value={findingCountry} onChange={handleFindingCountry} /></div>
      <Countries countries={countries} filterCountry={findingCountry} />
    </>
  )
}

export default App