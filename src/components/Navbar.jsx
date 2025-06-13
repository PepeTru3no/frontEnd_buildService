import { useContext } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
import '../styles/Navbar.css';

function navbar() {
  const {token} = useContext(TokenContext);
  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img
            src="/imgs/Logo-pagina.png"
            alt="Logo"
            width="70"
            height="40"
            className="d-inline-block align-top"
          />
          <span className="fs-4 fw-bold" style={{ color: "#0e2e3c" }}>ReparApp</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarResponsive" />

        <Navbar.Collapse id="navbarResponsive">

          <Form className="d-none d-lg-flex mx-auto w-50">
            <FormControl
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
            />
            <Button variant="outline-primary">Buscar</Button>
          </Form>
          {!token ?
            <Nav className="ms-auto d-flex align-items-center">
              <div className="d-none d-lg-flex">
                <Button as={Link} to="/register" variant="primary" className="button-nav me-2">
                  Registrarse
                </Button>
                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/publications">Servicios</Nav.Link>
              </div>

              <div className="d-lg-none w-100">
                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link >
                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/publications">Servicios</Nav.Link>
              </div>
            </Nav>
            :
            <Nav className="ms-auto d-flex align-items-center">
              <div className="d-none d-lg-flex">
                <Button as={Link} to="/profile" variant="primary" className="button-nav me-2">
                  Perfil
                </Button>
                <Nav.Link as={Link} to="/publications">Servicios</Nav.Link>
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
              </div>

              <div className="d-lg-none w-100">
                <Nav.Link as={Link} to="/profile">Perfil</Nav.Link >
                <Nav.Link as={Link} to="/publications">Servicios</Nav.Link>
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
              </div>
            </Nav>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}
export default navbar;