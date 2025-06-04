import axios from 'axios';
import fondo from '../assets/imgs/Fondo-register.webp';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function  Register(){
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    age: '',
    email: '',
    phone: '',
    password: '',
    confirmarPassword: '',
  });

  const navigate= useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    axios.post('http://localhost:3000/users',formData)
    .then( (response) =>{
      console.log(response);
      navigate('/login');
    })
    .catch((error)=> {
      console.log(error);
    })
  };
    return (
    <div className='fondo-login'
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'black',
          opacity: 0.7,
          padding: '2rem',
          borderRadius: '15px',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2 className="text-center mb-4" style={{color: "white"}}>Registrarse</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="text" name="name" placeholder="Nombre" 
              value={formData.name}
              onChange={handleChange}
              required
          />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="text" name="last_name" placeholder="Apellidos" 
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="number" name="age" placeholder="Edad" 
            value={formData.age}
              onChange={handleChange}
              required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="text" name="phone" placeholder="Telefono" 
            value={formData.phone}
              onChange={handleChange}
              required
              />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" name="email" placeholder="Correo electronico" 
            value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" name="password" placeholder="Password" 
            value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" name="confirmarPassword" placeholder="Confirmar password" 
            value={formData.confirmarPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button style={{backgroundColor:"#0e2e3c", border:"#0e2e3c", opacity: 1}} type="submit">
              Registrarse
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;