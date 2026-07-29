import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Phase6 } from './Phase6'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/Button'

const Main = styled.article`
	padding: 2rem;
`;

const Sidebar = styled.aside`
	padding: 2rem;
	text-align: center;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;

	@media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
		flex-direction: row;

		${Main} {
			flex: 2;
		}

		${Sidebar} {
			flex: 1;
		}
	}
`;

const Zonas = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
	margin: 1.5rem 0;

	img {
		width: 100%;
		border-radius: 8px;
	}
`;

const Transporte = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 1rem;
	justify-items: center;

	img {
		width: 150px;
		transition: transform 0.3s;
	}

	img:hover {
		transform: scale(1.1);
	}
`;

const Promo = styled.div`
	margin: 1rem 0;

	img {
		max-width: 250px;
	}
`;

const ContenedorBotones = styled.div`
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

export const Phase4 = () => {

	const [estadoModal1, cambiarEstadoModal1] = useState(false);

	return (
    <div>
      <Navbar links={[{ to: '/inicio', label: 'Inicio' }, { to: '/conocer', label: 'Conocenos' }]} />

      <Content>
        <Main>
          <h1>SERVICIOS</h1>
          <br />
          <h3>Estas son las regiones de nuestro pais de las cuales ofrecemos nuestro servicios de viaje:</h3>
          <Zonas>
            <img src="/imagenes/costa.png" alt="Costa" />
            <img src="/imagenes/sierra.png" alt="Sierra" />
            <img src="/imagenes/amazonia.png" alt="Amazonia" />
          </Zonas>
          <ContenedorBotones>
            <Button onClick={() => cambiarEstadoModal1(!estadoModal1)}>Rutas y Horarios</Button>
          </ContenedorBotones>
          <Phase6 estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
          >
            <Transporte>
              <Link to={"/vacio"}><img src="/imagenes/car1.png" alt="Camioneta" /></Link>
              <Link to={"/compras"}><img src="/imagenes/bus1.png" alt="Bus" /></Link>
              <Link to={"/vacio"}><img src="/imagenes/taxi1.png" alt="Bus" /></Link>
            </Transporte>
          </Phase6>
        </Main>

        <Sidebar>
          <h1>PROMOCIONES</h1>
          <Promo>
            <img src="/imagenes/promofut.jpg" alt="Promocion Mundialista" />
          </Promo>
          <h1>OFRECEMOS</h1>
          <Promo>
            <img src="/imagenes/promoestudiantes.jpg" alt="Promocion Estudiantil" />
          </Promo>
        </Sidebar>
      </Content>

      <Footer />
    </div>
  )
}