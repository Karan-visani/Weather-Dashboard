import {EllipsisVertical} from 'lucide-react'
import React from 'react'
import { BsDroplet } from 'react-icons/bs'
import { FaWind } from 'react-icons/fa'

import {MdSunny,MdCloud,MdCloudQueue,MdGrain,MdThunderstorm,MdAcUnit} from 'react-icons/md'

const WeatherCard = ({data}) => { 
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
        return <MdSunny size={105} color="#FBBF24" />
    }
    if (code === 1 || code === 2) {
        return <MdCloudQueue size={105} color="#60A5FA" />
    }
    if (code === 3) {
        return <MdCloud size={105} color="#64748B" />
    }
    if ([45, 48].includes(code)) {
        return <MdCloud size={105} color="#94A3B8" />
    }
    if ([51, 53, 55, 56, 57].includes(code)) {
        return <IoRainy size={105} color="#3B82F6" />
    }
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return <IoRainy size={105} color="#2563EB" />
    }
    if ([71, 73, 75, 77].includes(code)) {
        return <MdAcUnit size={105} color="#BAE6FD" />
    }
    if ([95, 96, 99].includes(code)) {
        return <MdThunderstorm size={105} color="#8B5CF6" />
    }
    return <MdCloud size={105} color="#64748B" />
}
       
  return (
    <div className='weatherCard'>
        <div className='topWC'>
            <div className='location'>
            <h2>{data.city}</h2>
            <h4>{data.country}</h4>
            </div>
            <h1><EllipsisVertical /></h1>
        </div>

        <div className='middleWC'>
        <h2 className='weatherIcon'>{getWeatherIcon(data.current.weather_code)}</h2>
        <h1>{data.current.temperature_2m} °C</h1>
        <h3>{getWeatherDescription(data.current.weather_code)}</h3>
        </div>

        <div className='bottomWC'>
            
            <div className='humidity'>
                <div className='humidIcon'>
                <h2 className='iconsWC'><BsDroplet size={20} strokeWidth={1}/></h2>
                <h3>Humidity</h3>
                </div>
                <h3>{data.current.relative_humidity_2m} %</h3>
            </div>

            <div className='wind'>
                <div className='windIcon'>
                <h2 className='iconsWC'><FaWind size={20}/></h2>
                <h3>Wind</h3>
                </div>
                <h3>{data.current.wind_speed_10m} km/hr</h3>
            </div>
            
        </div>
    </div>
  )
}

export default WeatherCard
