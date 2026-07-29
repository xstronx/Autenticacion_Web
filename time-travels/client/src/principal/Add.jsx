import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormCard, FormTitle, Input, ErrorText } from "../components/ui/AuthForm";
import { Button } from "../components/ui/Button";

const Add = () => {
  const [viaje, setViaje] = useState({

    cod_bl:'',
    fecha_viaje:'',
    asientosDispo_viaje:'',
    costo_bl:'',
    horario_bol:'',
    horaDisp_frec:'',
    cedula_cl:'',
    id_frecuencia:'',
    id_transporte:'',
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setViaje((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/viajes", viaje);
      navigate("/compras");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <FormCard>
      <FormTitle>Añadir Nuevo Transporte</FormTitle>
      <Input
        type="text"
        placeholder="Codigo  del Boleto"
        name="cod_bl"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Fecha del Viaje"
        name="fecha_viaje"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Asientos disponibles"
        name="asientosDispo_viaje"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Costo del Boleto"
        name="costo_bl"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Horario del boleto"
        name="horario_bol"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Hora Disponible"
        name="horaDisp_frec"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="cedula"
        name="cedula_cl"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="codigo de frecuencia"
        name="id_frecuencial"
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="codigo de transporte"
        name="id_transporte"
        onChange={handleChange}
      />
      <Button onClick={handleClick}>Agregar</Button>
      {error && <ErrorText>Something went wrong!</ErrorText>}
      <Link to="/compras">Ver todas las rutas </Link>
    </FormCard>
  );
};

export default Add;