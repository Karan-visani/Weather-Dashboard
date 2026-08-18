import React, { useState } from 'react'
import SearchBar from './components/searchBar'
import { searchCity,getWeather } from './services/weatherApi';

const App = () => {
  const [weather, setWeather] = useState(null)

  const searchHandle = async(city) =>{
    try{
      const locationData = await searchCity(city)

    if(!locationData.results || locationData.results.length == 0){
      throw new Error("City not found")
    }

    const location = locationData.results[0]

    const weatherData = await getWeather(
      location.latitude,
      location.longitude
    ) 

    setWeather(weatherData);
    }catch(error){
      console.log(error);
    }
  }

  

  return (
    <div>
      <h2 className='heading'>Weather Dashboard</h2>

      <SearchBar onSearch={searchHandle}/>
    </div>
  )
}

export default App
