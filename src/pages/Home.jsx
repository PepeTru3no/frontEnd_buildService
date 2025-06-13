import { useNavigate } from 'react-router-dom';
import fondoPrincipal from '../assets/imgs/Fondo-principal.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../util/values';

function Home() {
  const navigate = useNavigate();
  const token= localStorage.getItem('token');
  const [comments, setComments]= useState();
  const [isLoad, setIsLoad]= useState(false);

  useEffect(()=>{
      axios.get(`${ENDPOINT}/comments?limit=6`)
      .then(({data})=>{
        setComments(data);
        setIsLoad(true);
      })
      .catch(err=>{
        console.log(err);
      });
  },[])

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${fondoPrincipal})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {!token?
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: '2rem',
            borderRadius: '10px',
          }}
        >
          <h1 style={{ marginBottom: '1rem' }}>¡Regístrate con nosotros!</h1>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              backgroundColor: '#0e2e3c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Regístrate ahora
          </button>
        </div>
        :
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: '2rem',
            borderRadius: '10px',
          }}
        >
          <h1 style={{ marginBottom: '1rem' }}>¡Navega por nuestros servicios!</h1>
          <button
            onClick={() => navigate('/publications')}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              backgroundColor: '#0e2e3c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Publicaciones
          </button>
        </div>
        }
      </div>

      <div style={{ 
        padding: '2rem', 
        textAlign: 'center' 
        }}>
        <h1>¿Cómo Funciona?</h1>
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            flexWrap: 'wrap', 
            marginTop: '1.5rem' 
            }}>
          {[
            { src: '/imgs/Busca-servicio.png', 
              texto: 'Busca un servicio' 
             },
            { src: '/imgs/Encuentra-profesionales.png', 
              texto: 'Encuentra profesionales' 
             },
            { src: '/imgs/Contacta-favorito.png', 
              texto: 'Contacta a tu favorito' 
             },
            { src: '/imgs/Disfruta-servicio.png', 
              texto: 'Disfruta del servicio' 
             },
          ].map((item, index) => (
            <div key={index} style={{ 
                width: '200px', 
                margin: '1rem' 
                }}>
              <img src={item.src} alt={item.texto} style={{ width: '100%' }} />
              <p style={{ marginTop: '0.5rem' }}>{item.texto}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Categorías destacadas</h1>
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            flexWrap: 'wrap', 
            marginTop: '1.5rem' 
            }}>
          {[
            { src: '/imgs/Fontaneria.png', 
              texto: 'Fontanería' 
              },
            { src: '/imgs/Electricidad.png', 
              texto: 'Electricidad' 
              },
            { src: '/imgs/Limpieza.png', 
              texto: 'Limpieza' 
              },
            { src: '/imgs/Construcción.png', 
              texto: 'Construcción y montaje' 
              },
          ].map((item, index) => (
            <div key={index} 
                style={{ 
                    width: '200px', 
                    margin: '1rem' 
                    }}>
              <img 
              src={item.src} 
              alt={item.texto} 
              style={{ width: '100%' }} />
              <p 
              style={{ margin: '0.5rem 0' }}>
              {item.texto}
              </p>
              <button 
              style={{ 
                backgroundColor: '#0e2e3c', 
                color: 'white', 
                border: 'none', 
                padding: '0.5rem 1rem', 
                borderRadius: '5px' 
                }}>
                Ver más
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        padding: '2rem', 
        textAlign: 'center' }}>
        <h1>¿Qué dicen nuestros clientes?</h1>
        {isLoad?
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginTop: '1.5rem' }}>
        {comments.map((item, index) => (
          <div key={index} style={{ 
              width: '250px', 
              border: '1px solid #ccc', 
              borderRadius: '10px', 
              padding: '1rem' }}>
            <p>{item.comment}</p>
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