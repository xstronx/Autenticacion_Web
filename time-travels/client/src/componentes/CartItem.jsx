import React from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const CartItem = ({data, delFromCart}) => {
    let {cod_bl, fecha_viaje, horario_bol, costo_bl, quantity} = data;
    return (
    <Card>
        <h4>{cod_bl}</h4>
        <h4>{fecha_viaje}</h4>
        <h4>{horario_bol}</h4>
        <h5>${costo_bl}.00 x{quantity} = ${costo_bl*quantity}.00</h5>
        <Button variant="outline" onClick={() => delFromCart(cod_bl)}>Eliminar Uno</Button>
        <Button variant="outline" onClick={() => delFromCart(cod_bl,true)}>Eliminar Todos</Button>
    </Card>
  )
}

export default CartItem
