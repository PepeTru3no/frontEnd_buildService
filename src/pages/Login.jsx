import fondo from '../assets/imgs/Fondo-login.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
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
          backgroundColor: 'white',
          opacity: 0.9,
          padding: '2rem',
          borderRadius: '15px',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2 className="text-center mb-4">Inicio de Sesión</h2>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Escribe tu correo" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;