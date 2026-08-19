import React, { useState } from 'react'
import SearchBar from './components/searchBar'
import { searchCity,getWeather } from './services/weatherApi';
import WeatherCard from './components/WeatherCard';
import ForeCast from './components/ForeCast';

const App = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [weather, setWeather] = useState(null)
  

  const searchHandle = async(city) =>{
    setLoading(true)
    setError("")
    setWeather(null)
    try{
      const locationData = await searchCity(city)

    if(!locationData.results || locationData.results.length === 0){
      throw new Error("City not found")
    }
    
    const location = locationData.results[0]
    
    const weatherData = await getWeather(
      location.latitude,
      location.longitude
    ) 
    
    setWeather({
    city: location.name,
    country: location.country,
    ...weatherData
    }); 
  }catch(error){
    console.log(error);
    setError("City not found")
  }finally{
    setLoading(false)
  }
  }

  

  return (
    <div>
      <h2 className='heading'>Weather Dashboard</h2>

      <div className='searchAndWc'>
      <SearchBar onSearch={searchHandle}/>
      <div className='appLoaders'>
      {loading && <p>Loading.......</p>}
      {error && <p>{error}</p>}
      </div>
      {weather && (
                <WeatherCard data={weather}/>
            )}
      </div>
    
      {weather && (
      <ForeCast daily={weather.daily}/>          
      )}

    </div>
  )
}

export default App
