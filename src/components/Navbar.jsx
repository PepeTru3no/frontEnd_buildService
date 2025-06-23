import { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
import Notifications from "./Notifications"; // ⬅️ asegúrate de tener este componente
import axios from "axios";
import "../styles/Navbar.css";
import { ENDPOINT } from "../util/values";

function navbar() {
  const { token } = useContext(TokenContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (token) {
      axios
        .get(`${ENDPOINT}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (Array.isArray(res.data)) {
            const unread = res.data.filter((n) => !n.seen).length;
            setUnreadCount(unread);
          } else {
            console.warn("⚠️ Las notificaciones no son un array:", res.data);
            setUnreadCount(0);
          }
        });
    }
  }, [token, showNotifications]);

  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img src="/imgs/Logo-pagina.png" alt="Logo" className="logo-nav" />
          <span className="fs-4 fw-bold brand-nav">ReparApp</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarResponsive" />

        <Navbar.Collapse id="navbarResponsive">
          {!token ? (
            <Nav className="ms-auto d-flex align-items-center">
              <div className="d-none d-lg-flex">
                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  className="button-nav me-2"
                >
                  Registrarse
                </Button>
                <Nav.Link as={Link} to="/login">
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/publications">
                  Servicios
                </Nav.Link>
              </div>
              <div className="d-lg-none w-100">
                <Nav.Link as={Link} to="/register">
                  Registrarse
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/publications">
                  Servicios
                </Nav.Link>
              </div>
            </Nav>
          ) : (
            <Nav className="ms-auto d-flex align-items-center position-relative">
              <div className="d-none d-lg-flex align-items-center gap-3">
                <Button
                  as={Link}
                  to="/profile"
                  variant="primary"
                  className="button-nav me-2"
                >
                  Perfil
                </Button>

                {/* 🔔 Ícono de notificaciones */}
                <div
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <span style={{ fontSize: "1.5rem" }}>🔔</span>
                  {unreadCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: 0,
                        right: -4,
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        fontSize: "12px",
                        padding: "2px 6px",
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </div>

                <Nav.Link as={Link} to="/publications" className="hover-link">
                  Servicios
                </Nav.Link>
                <Nav.Link as={Link} to="/logout" className="hover-link">
                  Cerrar sesión
                </Nav.Link>
              </div>

              {/* 🔽 Notificaciones (Dropdown flotante) */}
              {showNotifications && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    zIndex: 999,
                    width: "300px",
                  }}
                >
                  <Notifications onClose={() => setShowNotifications(false)} />
                </div>
              )}

              {/* Menú móvil */}
              <div className="d-lg-none w-100">
                <Nav.Link as={Link} to="/profile">
                  Perfil
                </Nav.Link>
                <Nav.Link as={Link} to="/publications">
                  Servicios
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Cerrar sesión
                </Nav.Link>
              </div>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;
