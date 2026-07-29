import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../components/Navbar'
import { Card } from '../components/ui/Card'

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	gap: 1.5rem;
	padding: 2rem;
`;

const Photo = styled.img`
	width: 140px;
	height: 140px;
	object-fit: cover;
	border-radius: 50%;
	align-self: center;
`;

const miembros = [
	{ img: '/imagenes/adri.jpg', nombre: 'adri', texto: 'Mi nombre es Adriana Díaz. Soy estudiante de Ingenieria de Software. Me encuentro cursando el 4to semestre de la carrera. Tengo un gato naranja llamado Paco. Me interesa la Domótica.' },
	{ img: '/imagenes/jois.jpg', nombre: 'jois', texto: 'Me llamo Johanna Pila. Soy estudiante de cuarto semestre de Ingeniería de Software. Me gusta mucho jugar fútbol y básquet, me llama la atención el desarrollo e implementación de videojuegos.' },
	{ img: '/imagenes/dani.jpg', nombre: 'dani', texto: 'Mi nombre es Daniela Pilataxi. Soy estudiante de Ingeniería de Software. Me encanta ver el fútbol internacional, me llama la atención la tecnología, y sobre todo me encanta todo lo relacionado con inteligencia artificial.' },
	{ img: '/imagenes/domi.jpg', nombre: 'domi', texto: 'Mi nombre es Dominique Salazar. Soy estudiante de Ingeniería de Software. Me gusta dibujar mandalas y tomarme fotos. Me interesa el desarrollo de videojuegos.' },
	{ img: '/imagenes/gabo.jpg', nombre: 'gabo', texto: 'Mi nombre es Gabriel Reinoso. Estudiante de Ingeniería de Software, me interesa la fotografía y la implementación de la inteligencia artificial para la vida cotidiana.' },
];

export const Phase2 = () => {
  return (
    <div>
      <Navbar links={[{ to: '/inicio', label: 'Inicio' }, { to: '/servicios', label: 'Servicios' }]} />

      <Grid>
        {miembros.map((miembro) => (
          <Card key={miembro.nombre}>
            <Photo src={miembro.img} alt={miembro.nombre} />
            <p>{miembro.texto}</p>
          </Card>
        ))}
      </Grid>
    </div>
  )
}