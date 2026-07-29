import React from 'react'
import { Link } from 'react-router-dom'
import { HeroBanner, BannerText } from '../components/HeroBanner'

const Phase9 = () => {
  return (
    <HeroBanner>
      <BannerText>
        <h1>REGISTRADO</h1>
        <h2>Ingresa al aplicativo <Link to={"/"}><span>AQUI</span></Link></h2>
      </BannerText>
    </HeroBanner>
  )
}

export default Phase9