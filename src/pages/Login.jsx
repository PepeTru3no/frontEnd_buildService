import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TokenContext } from '../context/TokenContext';
import { ENDPOINT } from '../util/values';
import '../styles/Login.css';

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setUsuario } = useContext(AuthContext);
  const { setToken } = useContext(TokenContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${ENDPOINT}/users/login`, formData)
      .then(({ data }) => {
        setUsuario(data.user); // ✅ guardamos como objeto
        localStorage.setItem("token", data.token); // ✅ persistimos el token
        setToken(data.token); // ✅ actualizamos el contexto
        navigate("/publications"); // ✅ redirige a otra ruta (perfil o publicaciones)
      })
      .catch((error) => {
        console.error(error);
        alert("Correo o contraseña incorrectos");
      });
  };

  return (
    <div className="login-background">
      <div className='login-card'
        
      >
        <h2 className="text-center mb-4">Inicio de Sesión</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Escribe tu correo"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button className='login-button' variant="primary" type="submit">
              Ingresar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
