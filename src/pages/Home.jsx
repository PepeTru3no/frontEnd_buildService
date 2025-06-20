import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../util/values';
import '../styles/Home.css';
import { Button } from 'react-bootstrap';

function Home() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const [comments, setComments] = useState();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    axios.get(`${ENDPOINT}/comments?limit=6`)
      .then(({ data }) => {
        setComments(data);
        setIsLoad(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])
  return (
    <div>
      <div className="home-hero">
        {!token ?
          <div className="home-overlay">
            <h1 className="home-overlay-title">¡Regístrate con nosotros!</h1>
            <button
              onClick={() => navigate('/register')}
              className="home-button"
            >
              Regístrate ahora
            </button>
          </div>
          :
          <div className="home-overlay">
            <h1 className="home-overlay-title">¡Navega por nuestros servicios!</h1>
            <button
              onClick={() => navigate('/publications')}
              className="home-button"
            >
              Publicaciones
            </button>
          </div>
        }
      </div>

      <div className="home-section">
        <h1 className="home-overlay-title">¿Cómo Funciona?</h1>
        <div className="home-icons-container">
          {[
            {
              src: '/imgs/Busca-servicio.png',
              texto: 'Busca un servicio'
            },
            {
              src: '/imgs/Encuentra-profesionales.png',
              texto: 'Encuentra profesionales'
            },
            {
              src: '/imgs/Contacta-favorito.png',
              texto: 'Contacta a tu favorito'
            },
            {
              src: '/imgs/Disfruta-servicio.png',
              texto: 'Disfruta del servicio'
            },
          ].map((item, index, array) => (
            <div key={index} >
            <div className="home-icon-group">
            <div className="home-icon-box">
              <img src={item.src} alt={item.texto}  />
              <p className="home-icon-text">{item.texto}</p>
            </div>
                {index < array.length - 1 && (
                <span className="home-arrow">→</span>
              )}
            </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-section">
        <h1 className="home-overlay-title">Categorías destacadas</h1>
        <div className="home-icons-container">
          {[
            {
              src: '/imgs/Fontaneria.png',
              texto: 'Fontanería',
              value: 'fontaneria'
            },
            {
              src: '/imgs/Electricidad.png',
              texto: 'Electricidad',
              value: 'electricidad'
            },
            {
              src: '/imgs/Limpieza.png',
              texto: 'Limpieza',
              value: 'limpieza'
            },
            {
              src: '/imgs/Construcción.png',
              texto: 'Construcción y montaje',
              value: 'construccion y montaje'
            },
          ].map((item, index) => (
            <div 
              className="home-icon-box" 
              key={index}>
              <img
                src={item.src}
                alt={item.texto}
                style={{ width: '100%' }} />
              <p
                style={{ margin: '0.5rem 0' }}>
                {item.texto}
              </p>
              <Button as={Link} to={`/publications/${item.value}`} variant="primary" className="gallery-button">Ver Mas...</Button>
              {/* <button
                className="home-button" onClick={()=>viewMore(item.value)}>
                Ver más
              </button> */}
            </div>
          ))}
        </div>
      </div>

      <div className="home-section">
        <h1 className="home-overlay-title">¿Qué dicen nuestros clientes?</h1>
        {isLoad ?
          <div className="home-comments-container">
            {comments.map((item, index) => (
              <div key={index} className="interaction-coment-item" >
                <div className="interaction-coment-box">
                <p className="interaction-coment-text"
                          variant='light'>{item.user}</p>
                <p>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
          :
          <h1>Cargando Comentarios...</h1>
        }
      </div>
    </div>
  );
}

export default Home;