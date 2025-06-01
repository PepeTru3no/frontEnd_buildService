import fondo from '../assets/imgs/Fondo-register.webp';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function  Register(){
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    email: '',
    telefono: '',
    password: '',
    confirmarPassword: '',
  });

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

    console.log('Datos enviados:', formData);
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" name="nombre" placeholder="Nombres" 
              value={formData.nombre}
              onChange={handleChange}
              required
          />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="text" name="apellido" placeholder="Apellidos" 
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="number" name="edad" placeholder="Edad" 
            value={formData.edad}
              onChange={handleChange}
              required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="text" name="telefono" placeholder="Telefono" 
            value={formData.telefono}
              onChange={handleChange}
              required
              />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
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