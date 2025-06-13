import { useEffect, useState } from 'react';
import Gallery from '../components/Gallery';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Paginator from '../components/Pagination';
import { ENDPOINT } from '../util/values';
import '../styles/Publications.css';

function Publications() {
  const [servicios, setServicios] = useState();
  const [count, setCount] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [limit] = useState(5);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const queryParams = `?limit=${limit}&page=${page}`;
    axios
      .get(`${ENDPOINT}/services${queryParams}`)
      .then(({ data }) => {
        setServicios(data.response);
        setCount(data.count);
        setIsLoad(true);
      })
      .catch((error) => {
        console.error("Error al cargar servicios:", error);
      });
  }, [page]);

  return (
    <div className="publications-background">
      <h1 className="publications-title">
        Galeria de Publicaciones
      </h1>
      {!isLoad ?
        <h1 className="publications-charge">Cargando Servicios....</h1>
        :
        <Container className="my-4">
          <Row className="g-4 justify-content-center">
            {servicios.map((servicio, index) => (
              
              <Col key={index} xs={12} sm={6} md={4}>
                <Gallery
                  title={servicio.name}
                  text={servicio.description}
                  image={`${ENDPOINT}/uploads/${(servicio.images.length !== 0) ? servicio.images[0].sample_image : ""}`}
                  buttonText={'Ver mas...'}
                  id={servicio.id}
                  author={`${servicio.user.name} ${servicio.user.last_name}` }
                  phone={servicio.user.phone}
                  stars={servicio.stars}
                  category={servicio.category}
                />
              </Col>
            ))}
          </Row>
          <Paginator count={count} limit={limit} page={page} setPage={setPage} />
        </Container>
      }

    </div>
  );
}

export default Publications;