import React, { useState } from 'react'

export default function Search({onSearch}) {
  
  return (
    <div className='my-5 pt-3'>
    <input type="text" placeholder='Search...' id='search' className='form-control w-75 m-auto'
     onChange={(e)=> onSearch(e.target.value)} /> 
       </div>
  )
}
