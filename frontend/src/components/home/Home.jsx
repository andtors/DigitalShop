import React from 'react'
import ProductCard from '../layouts/ProductCard'

import './Home.css'

const Home = () => {
  return (
    <div className='home-div'>
      <h1 className='home-title'>Confira nossos produtos:</h1>
  
          <ProductCard />
    </div>
  )
}

export default Home