import React, { useState } from 'react'

const SearchBar = ({onSearch,setUnit,unit}) => {
    const [city, setCity] = useState("")
    const searchHandler = (e) =>{
        e.preventDefault()
       onSearch(city, () => setCity(""))
    }
    
  return (
      <form onSubmit={searchHandler} className='search'>
        
        <input
        type="text" name="search" id="search" 
        className='inputSearch' 
        placeholder='Search Cities'
        value={city}
        onChange={(e)=>{
            setCity(e.target.value)
        }}/>

        <button 
        type='submit'
        className='btnSearch'>Search</button>

        <div className="unitToggle">
    <span>°C</span>
    <label className="switch">
        <input
            type="checkbox"
            checked={unit === "F"}
            onChange={() => setUnit(unit === "C" ? "F" : "C")}
        />
        <span className="slider"></span>
    </label>
    <span>°F</span>
</div>

      </form>
  )
}

export default SearchBar
