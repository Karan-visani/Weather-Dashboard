export const searchCity = async(city) =>{
     const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`

     const response = await fetch(url)
     if(!response.ok){
        throw new Error("Failed to search city");  
     }

     const data = await response.json()

     return data
}

export const getWeather = async(latitude,longitude)=>{
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

    const response = await fetch(url)
    if(!response.ok){
        throw new Error("Failed to search city");  
     }

    const data = await response.json()

    return data
}