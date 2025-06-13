import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../util/values";
import '../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    age: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmarPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    axios.post(`${ENDPOINT}/users`,formData)
    .then( (response) =>{
      console.log(response);
      navigate('/login');
    })
    .catch((error)=> {
      console.log(error);
    })
  };
  return (
    <div className="register-background">
      <div className="register-form">
        <h2 className="register-title">
          Registrarse
        </h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Apellidos"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Control
              type="number"
              name="age"
              placeholder="Edad"
              value={formData.age}
              onChange={handleChange}
              required
              min={18}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Control
              type="text"
              name="phone"
              placeholder="Telefono"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="email"
              placeholder="Correo electronico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Control
              type="password"
              name="confirmarPassword"
              placeholder="Confirmar password"
              value={formData.confirmarPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button className="register-button"
              type="submit"
            >
              Registrarse
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
