import React, { useState } from 'react'

const SearchBar = ({onSearch}) => {
    const [city, setCity] = useState("")

    const searchHandler = (e) =>{
        e.preventDefault()
       onSearch(city)
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

      </form>
  )
}

export default SearchBar
