import React, { useContext, useReducer, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { TYPES } from '../acciones/accionesCarrito';
import { compraIncialState, compraReducer } from '../reducers/compraReducer'
import { AuthContext } from '../context/authContext'
import CartItem from './CartItem';
import Mostrar from '../principal/Mostar';
import { Navbar } from '../components/Navbar'
import { Button } from '../components/ui/Button'
import { ErrorText } from '../components/ui/AuthForm'

const Section = styled.article`
	padding: 1rem 2rem;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
`;

export const Phase7 = () => {
	const [state,dispatch] = useReducer(compraReducer,compraIncialState);
	const{cart} = state;
	const { currentUser } = useContext(AuthContext);
	const [checkoutMsg, setCheckoutMsg] = useState(null);

	const addToCart	= (viaje) => {
		dispatch({type:TYPES.ADD_TO_CART, payload:viaje});
	};
	const delFromCart	= (id,all = false) => {
		if(all){
			dispatch({type:TYPES.REMOVE_ALL_FROM_CART, payload:id});
		} else{
			dispatch({type:TYPES.REMOVE_ONE_FROM_CART, payload:id});
		}
	};
	const clearCart	= () => {
		dispatch({type:TYPES.CLEAR_CART})
	};

	const handleCheckout = async () => {
		setCheckoutMsg(null);
		try {
			await axios.post("http://localhost:4000/api/reservas", {
				cedula_cl: currentUser.cedula,
				items: cart.map((item) => ({ cod_bl: item.cod_bl, cantidad: item.quantity })),
			});
			clearCart();
			setCheckoutMsg({ type: "success", text: "Compra confirmada." });
		} catch (err) {
			setCheckoutMsg({ type: "error", text: err.response?.data || "No se pudo completar la compra." });
		}
	};

	return (
    <div>
      <Navbar links={[{ to: '/inicio', label: 'Inicio' }, { to: '/conocer', label: 'Conocenos' }]} />

      <Section>
        <h1>Carrito de Compras</h1>
        <br />
        <h2>Rutas y Horario</h2>
        <Grid>
          <Mostrar addToCart={addToCart} />
        </Grid>
      </Section>

      <Section>
        <h3>Boletos en carrito</h3>
        <br />
        <Button onClick={clearCart}>Limpiar Carrito</Button>
        <Grid>
          {cart.map((item) => <CartItem key={item.cod_bl} data={item} delFromCart={delFromCart}/>)}
        </Grid>
        <br />
        {currentUser ? (
          <Button onClick={handleCheckout} disabled={cart.length === 0}>Confirmar Compra</Button>
        ) : (
          <ErrorText>Inicia sesión para comprar</ErrorText>
        )}
        {checkoutMsg && (
          checkoutMsg.type === "error"
            ? <ErrorText>{checkoutMsg.text}</ErrorText>
            : <p style={{ color: "green" }}>{checkoutMsg.text}</p>
        )}
      </Section>
    </div>
  )
}
