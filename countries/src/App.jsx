import { useEffect, useState } from 'react'

import DetailedCountry from './components/DetailedCountry.jsx'
import countriesService from './services/countries.js'

function App() {
  const [userQuery, setUserQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(
        (res) => {
          setCountries(res)
          setDisplayedCountries(res)
        }
      )
  }, [])

  return (
    <>
      find countries
      <input
        value={userQuery}
        onChange={
          (event) => {
            const newQuery = event.target.value
            setUserQuery(newQuery)
            setDisplayedCountries(
              countries.filter(
                (elem) => {
                  return elem.name.common.toLowerCase().includes(newQuery.toLowerCase())
                }
              )
            )
          }
        }
      />
      {displayedCountries.length > 10
        ? <p>Too many matches</p>
        : displayedCountries.length > 1
          ? displayedCountries.map(
            (elem) => {
              return <p key={elem.name.common}>{elem.name.common}</p>
            }
          )
          : <DetailedCountry country={displayedCountries[0]} />
      }
    </>
  )
}

export default App
