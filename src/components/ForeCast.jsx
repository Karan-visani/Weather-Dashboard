import React from 'react'
import { IoRainy } from 'react-icons/io5';
import { MdAcUnit, MdCloud, MdCloudQueue, MdGrain, MdSunny, MdThunderstorm } from 'react-icons/md';

const ForeCast = ({daily}) => {
    const getWeatherDescription = (code) => {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Cloudy";
    if (code === 3) return "Mostly Cloudy";
    if (code === 45 || code === 48) return "Fog";

    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([61, 63, 65].includes(code)) return "Rain";
    if ([71, 73, 75].includes(code)) return "Snow";
    if ([80, 81, 82].includes(code)) return "Rain showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Unknown";
}
    
    const getWeatherIcon = (code) => {
        if (code === 0) {
            return <MdSunny size={80} color="#FBBF24" />
        }
        if (code === 1 || code === 2) {
            return <MdCloudQueue size={80} color="#60A5FA" />
        }
        if (code === 3) {
            return <MdCloud size={80} color="#64748B" />
        }
        if ([45, 48].includes(code)) {
            return <MdCloud size={80} color="#94A3B8" />
        }
        if ([51, 53, 55, 56, 57].includes(code)) {
            return <IoRainy size={80} color="#3B82F6" />
        }
        if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
            return <IoRainy size={80} color="#2563EB" />
        }
        if ([71, 73, 75, 77].includes(code)) {
            return <MdAcUnit size={80} color="#BAE6FD" />
        }
        if ([95, 96, 99].includes(code)) {
            return <MdThunderstorm size={80} color="#8B5CF6" />
        }
        return <MdCloud size={80} color="#64748B" />
    }
  return (
    <div className='forecastCards'>
      {daily.time.map((date,index)=>{
        return <div key={index} className='forecast'>
            <div className='topFC'>
                <h2>Day {index+1}</h2>
                <h4>{date}</h4>
            </div>

            <div className='iconsFC'>
            {getWeatherIcon(daily.weather_code[index])}
            <h3>{getWeatherDescription(daily.weather_code[index])}</h3>
            </div>

            <div>
                <h2 className='tempFC'>
                    {daily.temperature_2m_max[index]}° / {daily.temperature_2m_min[index]}° 
                </h2>
            </div>
        </div>
      })}
    </div>
  )
}

export default ForeCast
