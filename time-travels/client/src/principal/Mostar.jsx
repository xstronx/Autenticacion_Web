import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const Books = styled.div`
  display: contents;
`;

const Mostrar = ({addToCart}) => {
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/viajes");
        setViajes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(viajes);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/viajes/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Books>
        {viajes.map((viaje) => (
          <Card key={viaje.cod_bl}>
            <h2>{viaje.fecha_viaje}</h2>
            <h2>{viaje.asientosdispo_viaje}</h2>
            <h2>{viaje.costo_bl}</h2>
            <span>{viaje.horario_bol}</span>
            <h2>{viaje.horadisp_frec}</h2>
            <span>{viaje.cedula_cl}</span>
            <span>{viaje.id_frecuencia}</span>
            <span>{viaje.id_transporte}</span>
            <Button variant="outline" onClick={() => handleDelete(viaje.cod_bl)}>Eliminar</Button>
            <Button variant="outline">
              <Link
                to={`/update/${viaje.cod_bl}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Actualizar
              </Link>
            </Button>
            <Button onClick={() => addToCart(viaje)}>Agregar</Button>
          </Card>
        ))}
      </Books>

      <Button>
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Añadir Nuevo Transporte
        </Link>
      </Button>
    </>
  );
};

export default Mostrar;
