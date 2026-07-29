import React from 'react'
import { Navbar } from '../components/Navbar'
import { HeroBanner, BannerText } from '../components/HeroBanner'

export const Phase3 = () => {
  return (
    <div>
      <HeroBanner>
        <Navbar
          logo="/imagenes/vtd-logo.png"
          links={[
            { to: '/servicios', label: 'Servicios' },
            { to: '/conocer', label: 'Conocenos' },
            { to: '/', label: 'Cerrar Sesion' },
          ]}
        />
        <BannerText>
          <h1>BIENVENIDO</h1>
          <h2>A LA MAXIMA EXPERIENCIA DE <span>VIAJE</span></h2>
        </BannerText>
      </HeroBanner>
    </div>
  )
}