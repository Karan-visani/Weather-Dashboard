import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import { searchCity,getWeather } from './services/weatherApi.js';
import WeatherCard from './components/WeatherCard.jsx';
import ForeCast from './components/ForeCast.jsx';

const App = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [unit, setUnit] = useState("C")
    const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem("cities")
    return savedCities ? JSON.parse(savedCities) : []
    })
    const [selectedCity, setSelectedCity] = useState(null)

    

    const searchHandle = async (city,clearInput) => {
        setLoading(true)
        setError("")

        try {
            const locationData = await searchCity(city)

            if (!locationData.results || locationData.results.length === 0) {
                throw new Error("City not found")
            }

            const location = locationData.results[0]

            const existingCity = cities.some(
              item => item.city.id === location.id
            )

            if(existingCity){
              setError("City already added")
              return
            }

            const weatherData = await getWeather(
                location.latitude,
                location.longitude
            )

            const newCity = {
                city: location,
                weather: weatherData
            }

            setCities(prev => [...prev, newCity])
            setSelectedCity(newCity)
            clearInput()

        } catch (error) {
            setError("City not found")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities))
    }, [cities])

    useEffect(() => {
    if (cities.length > 0 && !selectedCity) {
      setSelectedCity(cities[cities.length - 1])
    }
  }, [cities, selectedCity])

  const removeCity = (cityToRemove) => {
    setCities(prev =>
        prev.filter(item => item !== cityToRemove)
    )

    if (selectedCity === cityToRemove) {
        setSelectedCity(null)
    }
}

    return (
        <div className='main'>
            <h2 className='heading'>Weather Dashboard</h2>

            <div className='searchAndWc'>

                <SearchBar
                    onSearch={searchHandle}
                    setUnit={setUnit}
                    unit={unit}

                />

                <div className='appLoaders'><b>
                    {loading && <p>Loading.......</p>}
                    {error && <p>{error}</p>}</b>
                </div>

                <div className='WCS'>
                  {cities.map((item, index) => (
                    <WeatherCard
                        key={index}
                        data={item.weather}
                        city={item.city}
                        unit={unit}
                        onSelect={() => setSelectedCity(item)}
                        onRemove={() => removeCity(item)}
                    />
                ))}

                </div>

            </div>

           <div className='FCS'>
             {!selectedCity ? (
                  <p>Select a city</p>
              ) : (
                  <ForeCast
                      daily={selectedCity.weather.daily}
                      unit={unit}
                      city={selectedCity.city}
                  />
              )}
            
           </div>

        </div>
    )
}
export default App
