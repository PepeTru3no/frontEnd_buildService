import { Container, Row, Col, Image } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2">
      <Container fluid>
        <Row className="px-5 justify-content-between align-items-start">
          <Col md={3} className="text-start">
            <p className="fw-bold mb-1">Contacto</p>
            <p className="mb-1">+56 9 1234 5678</p>
            <p className="mb-0">contacto@empresa.com</p>
          </Col>
          <Col md={3} className="text-end">
            <p className="fw-bold mb-2">Síguenos</p>
            <div className="d-flex justify-content-end gap-2">
              <Image src="./src/assets/imgs/Logo-facebook.png" width={30} height={30} alt="Red 1" />
              <Image src="./src/assets/imgs/Logo-instagram.png" width={30} height={30} alt="Red 2" />
              <Image src="./src/assets/imgs/Logo-linkedin.png" width={30} height={30} alt="Red 3" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="mb-0 small">© Todos los derechos reservados</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;