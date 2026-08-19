import React, { useState } from 'react'

const SearchBar = ({onSearch,setUnit}) => {
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

        <button 
         onClick={() => setUnit("C")}
        type='button'
        className='btnDegree'>°C</button>
        <button 
         onClick={() => setUnit("F")}
        type='button'
        className='btnDegree'>°F</button>

      </form>
  )
}

export default SearchBar
