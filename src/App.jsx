import React from 'react'
import './App.css' 
import Navbar from './components/Navbar/navbar'
import { Hero } from './components/Hero/hero'

const App = () => {
  return (
    <div> 
      <Navbar/>
      <Hero/>
    </div>
  )
}

export default App
