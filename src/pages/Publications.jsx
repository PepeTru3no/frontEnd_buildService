import { useContext, useEffect, useState } from 'react';
import Gallery from '../components/Gallery';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Paginator from '../components/Pagination';
import { ENDPOINT } from '../util/values';
import '../styles/Publications.css';
import { BookmarkPlus, BookmarkCheckFill } from 'react-bootstrap-icons';
import { TokenContext } from "../context/TokenContext";
import { AuthContext } from '../context/AuthContext';

function Publications() {
  const [servicios, setServicios] = useState();
  const [count, setCount] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [limit] = useState(5);
  const [page, setPage] = useState(1);
  const { token } = useContext(TokenContext);
  const { usuario } = useContext(AuthContext);
  useEffect(() => {
    const us_id=usuario ? `&user_id=${usuario.id}`: '';
    const queryParams = `?limit=${limit}&page=${page}${us_id}`;
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
  }, [page, isLoad]);

  const addFavorite = (service_id) => {
    const data={
      user_id: usuario.id,
      service_id
    }
      axios.post(`${ENDPOINT}/favorites`, data)
      .then(({data})=>{
        if(data){
          alert("Servicio agregado a favoritos");
        }  
        setIsLoad(false); 
      })
      .catch(err=>{
        console.log(err.message);
      });
  }

  const deleteFavorite = (service_id) => {
    const queryParams=`?user_id=${usuario.id}&service_id=${service_id}`
    axios.delete(`${ENDPOINT}/favorites${queryParams}`)
      .then(({data})=>{
        if(data.message=== 'eliminado'){
          alert(`Servicio ${data.message} de favoritos`);
        } 
        setIsLoad(false); 
      })
      .catch(err=>{
        console.log(err.message);
      });
  }

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
                  author={`${servicio.user.name} ${servicio.user.last_name}`}
                  phone={servicio.user.phone}
                  stars={servicio.stars}
                  category={servicio.category}
                  icon={token ? servicio.isFav ?
                    <>
                      <BookmarkCheckFill size={18} onClick={() => deleteFavorite(servicio.id)} />
                    </>
                    :
                    <BookmarkPlus size={18} onClick={() => addFavorite(servicio.id)} />
                    : ""}
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