import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import fondo from '../assets/imgs/Fondo-interaction.webp';
import perfil from '../assets/imgs/Perfil.png';

function Interaction() {
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comentario.trim() !== '') {
      setComentarios([...comentarios, comentario]);
      setComentario('');
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <Card style={{ width: '14rem' }}>
          <Card.Img variant="top" src={perfil} />
          <Card.Body />
          <ListGroup className="list-group-flush">
            <ListGroup.Item>nombre</ListGroup.Item>
            <ListGroup.Item>telefono</ListGroup.Item>
            <ListGroup.Item>email</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      <div
        style={{
          backgroundColor: 'white',
          opacity: 0.95,
          padding: '2rem',
          borderRadius: '15px',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <div className="mb-4">
          <Form onSubmit={handleSubmit}>
            <p>
              Aquí va la descripción del servicio que se quiere mostrar. Como por
              ejemplo: Construcción, jardinería, plomería, etc.
            </p>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Escribe un comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}/>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" style={{backgroundColor:"#0e2e3c", border:"#0e2e3c"}}>
                Comentar
              </Button>
            </div>
          </Form>
        </div>

        {comentarios.length > 0 && (
          <div className="mt-4">
            <h5>Comentarios:</h5>
            <ul>
              {comentarios.map((c, index) => (
                <li key={index}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Interaction;