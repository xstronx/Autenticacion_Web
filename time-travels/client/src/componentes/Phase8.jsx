import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { FormCard, FormTitle, Input, ErrorText } from '../components/ui/AuthForm'
import { Button } from '../components/ui/Button'

export const Phase8 = () => {

  const [inputs, setInputs] =  useState({
    cedula: "",
    usuario:"",
    email:"",
    clave:"",
    nombre:"",
    dirrecion:""

  })

  const [err, setErr] =  useState(null)
  const navigate = useNavigate()

  const handleChange = e => {
    setInputs((prev)=>({...prev, [e.target.name]: e.target.value}));
  }

const handleClick = async e =>{
  e.preventDefault()

  try {
    await axios.post("http://localhost:4000/api/auth/register",inputs)
    navigate("/check")
  } catch (err) {
    setErr(err.response.data)
  }
}
console.log(err)
  return (
    <div>
      <Navbar links={[]} />

      <FormCard>
        <FormTitle>REGISTRO</FormTitle>
        <Input type="text" maxLength="10" required placeholder='Cedula' name="cedula" onChange={handleChange}/>
        <Input type="text" autoFocus required placeholder="Nombre" name="nombre" onChange={handleChange}/>
        <Input type="text" autoFocus required placeholder="Direccion" name="direccion" onChange={handleChange}/>
        <Input type="text" autoFocus required placeholder="Usuario" name="usuario" onChange={handleChange}/>
        <Input type="email" autoFocus required placeholder="example@example.com" name="email" onChange={handleChange}/>
        <Input type="password" required placeholder="Contraseña" name="clave" onChange={handleChange}/>
        {err && <ErrorText>{err}</ErrorText>}
        <Button onClick={handleClick}>Registro</Button>
      </FormCard>
    </div>
  )
}