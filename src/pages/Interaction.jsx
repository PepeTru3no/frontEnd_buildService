import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import fondo from '../assets/imgs/Fondo-interaction.webp';
import perfil from '../assets/imgs/Perfil.png';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import { ENDPOINT } from '../util/values';

function Interaction() {
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [service, setService] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [stars, setStars] = useState(); 
  const { usuario } = useContext(AuthContext);
  const { id } = useParams();
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios.get(`${ENDPOINT}/services/${id}`)
      .then(({ data }) => {
        setService(data);
        setComentarios(data.comments);
        setStars(data.stars);
        setIsLoad(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [stars]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (comentario.trim() !== '') {
      const data = {
        comment: comentario,
        user_id: usuario[0].id,
        service_id: service.id
      }
      const Authorization = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.post(`${ENDPOINT}/comments`,
        data,
        Authorization
      )
        .then(({ data }) => {
          setComentarios([...comentarios, data]);
        })
        .catch(err => console.log(err));

      setComentario('');
    }
  }

  const handleChangeStars = (e) => {
    const data = {
      stars: Number(stars),
      newStars: e
    }
    console.log(data);
    axios.put(`${ENDPOINT}/services/${id}`, data)
      .then(({ status, data }) => {
        if (status == 200) {
          alert(`Gracias por calificar nuestro sercicio de :\n${service.name.toUpperCase()}`);
          setStars(data.stars);
        }
      })
      .catch((error) => {
        console.error("Error al cargar servicios:", error);
      });
  }

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
            {usuario && token ?
              <>
                <ListGroup.Item>{`${usuario[0].name} ${usuario[0].last_name}`}</ListGroup.Item>
                <ListGroup.Item>{usuario[0].phone}</ListGroup.Item>
                <ListGroup.Item>{usuario[0].email}</ListGroup.Item>
              </>
              :
              <>
                <ListGroup.Item>Invitado</ListGroup.Item>
              </>
            }

          </ListGroup>
        </Card>
      </div>
      {!isLoad ?
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
          Cargando Servicio...
        </div>
        : <div
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
              <p>{service.name}</p>
              <p><ReactStars
                count={5}
                value={service.stars}
                size={12}
                color2={'#ffd700'} /></p>
              <p>
                {service.description}
              </p>
              {token && usuario ?
                <>
                  Calificar Servicio:
                  <ReactStars
                    count={5}
                    onChange={handleChangeStars}
                    size={24}
                    color2={'#ffd700'} />
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="textarea"
                      placeholder="Escribe un comentario"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)} />
                  </Form.Group>

                  <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" style={{ backgroundColor: "#0e2e3c", border: "#0e2e3c" }}>
                      Comentar
                    </Button>
                  </div>
                </>
                :
                ""
              }

            </Form>
          </div>

          {comentarios.length > 0 && (
            <div className="mt-4">
              <h5>Comentarios:</h5>
              <ul>
                {comentarios.map((c) => (
                  <li key={c.id}>{c.comment}</li>
                ))}
              </ul>
            </div>
          )}
        </div>}
    </div>
  );
}

export default Interaction;