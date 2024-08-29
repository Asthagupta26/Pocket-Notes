
import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Hero from '../introBanner/IntroBanner'

const Home = () => {
  return (
    <>
        <Sidebar chatIsOpen={false}/>
        <Hero/>
    </>
  )
}

export default Home