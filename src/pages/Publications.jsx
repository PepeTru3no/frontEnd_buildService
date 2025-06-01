import Gallery from '../components/Gallery';
import { Container, Row, Col } from 'react-bootstrap';

const cardsData = [
  {
    title: 'Gasfiteria',
    text: 'información de persona que publicita su trabajo',
    buttonText: 'Ver más',
  }
];

function Publications() {
  return (
    <div style={{height: '100vh',}}>
        <h1 style={{display: 'flex', 
            justifyContent: 'center', 
            marginTop: '2rem',
            }}>
                Galeria de Publicaciones
        </h1>
    <Container className="my-4">
      <Row className="g-4">
        {cardsData.map((card, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <Gallery
              title={card.title}
              text={card.text}
              image={card.image}
              buttonText={card.buttonText}
            />
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
}

export default Publications;