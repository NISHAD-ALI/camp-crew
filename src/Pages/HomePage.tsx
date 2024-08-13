import React from 'react'
import Hero from '../Components/Hero'
import Options from '../Components/Options'
import End from '../Components/End'
import Footer from '../Components/Footer'
import { Toaster } from 'react-hot-toast';
const HomePage = () => {
  return (
    <div>
      <Hero />
      <Options />
      <End />
      <Footer/>
      <Toaster
                position="top-right"
                reverseOrder={false}
            />
    </div>
  )
}

export default HomePage
