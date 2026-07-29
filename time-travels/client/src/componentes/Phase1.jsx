import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { Navbar } from '../components/Navbar'
import { FormCard, FormTitle, Input, ErrorText } from '../components/ui/AuthForm'
import { Button } from '../components/ui/Button'


export const Phase1 = () => {

  const [inputs, setInputs] =  useState({
    usuario:"",
    clave:"",
  })

  const [err, setErr] =  useState(null)

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs((prev)=>({...prev, [e.target.name]: e.target.value}));
  };

  const { login } = useContext( AuthContext );

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      await login(inputs);
      navigate("/inicio")
    } catch (err) {

      setErr(err.response.data);
    }


  }

  return (
    <div>
      <Navbar links={[{ to: "/registro", label: "Registro" }]} />

      <FormCard>
        <FormTitle>LOGIN</FormTitle>
        <Input type="text" autoFocus required placeholder="Usuario" name="usuario" onChange={handleChange}/>
        <Input type="password" required placeholder="Contraseña" name="clave" onChange={handleChange}/>
        {err && <ErrorText>{err}</ErrorText>}
        <Button onClick={handleLogin}>Login</Button>
      </FormCard>
    </div>

  )
}