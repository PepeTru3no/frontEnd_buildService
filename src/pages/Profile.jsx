import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Button, Dropdown, Form, SplitButton } from "react-bootstrap";
import { ENDPOINT } from "../util/values";
import '../styles/Profile.css';
import ProfileOptions from "../components/ProfileOptions";
import { Link } from "react-router-dom";

function Profile() {
  const { usuario } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [file, setFile] = useState([]);
  const [category, setCategory] = useState('Seleccione una Categoria');
  const [services, setServices] = useState();
  const [favServices, setFavServices] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const token = sessionStorage.getItem('token');
  useEffect(() => {

    const getData = async () => {
      try {
        const queryParams = `?user_id=${usuario.id}`
        const { data: serv } = await axios.get(`${ENDPOINT}/services/byUser/${queryParams}`);
        const { data: fav } = await axios.get(`${ENDPOINT}/services/favorite/${queryParams}`);
        setServices(serv);
        setFavServices(fav);
        setIsLoad(true);
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  }, [isLoad])


  const handleFileChange = (e) => {
    setFile([...e.target.files]);
  };
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (e) => {
    setCategory(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const service = {
      name: formData.name,
      description: formData.description,
      user_id: usuario.id,
      category: category.toLocaleLowerCase()
    }
    const Authorization = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.post(`${ENDPOINT}/services`, service, Authorization)
      .then(({ data }) => {
        saveImage(data.id);
        setFormData({
          name: '',
          description: ''
        })
        setFile([]);
        setCategory('Seleccione una Categoria');
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const saveImage = (id) => {
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    axios.post(`${ENDPOINT}/images/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const categorys = [
    {
      src: 'src/assets/imgs/Fontaneria.png',
      texto: 'Fontanería'
    },
    {
      src: 'src/assets/imgs/Electricidad.png',
      texto: 'Electricidad'
    },
    {
      src: 'src/assets/imgs/Limpieza.png',
      texto: 'Limpieza'
    },
    {
      src: 'src/assets/imgs/Construcción.png',
      texto: 'Construcción y montaje'
    },
  ];
  const formUpdate = (service) => {
    if (service.category) {
      setCategory(service.category);
    }
    setFormData(service);
    setIsUpdate(true);
    alert("Formulario actualizado, ingrede sus cambios");
  }
  const updateService = async (e) => {
    e.preventDefault();
    const srv = {
      name: formData.name,
      description: formData.description,
      user_id: usuario.id,
      category: category.toLocaleLowerCase()
    }
    const Authorization = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const param = formData.id;
    try {
      const { status, data } = await axios.put(`${ENDPOINT}/services/service/${param}`, srv, Authorization);
      if (status === 200) {
        if (file.length > 0) {
          saveImage(param);
        }
        alert(data.message);
        setFormData({
          name: '',
          description: ''
        })
        setFile([]);
        setCategory('Seleccione una Categoria');
        setIsLoad(false);
      } else {
        console.log("Error");
      }

    } catch (error) {
      console.log("Error al cargar servicios:", error);
    }
  }

  const deleteService = (service_id) => {
    const queryParams = `?user_id=${usuario.id}&service_id=${service_id}`
    if (confirm('Confirme eliminar servicio.')) {
      axios.delete(`${ENDPOINT}/services${queryParams}`)
        .then(({ data }) => {
          if (data.message === 'eliminado') {
            alert(`Servicio ${data.message} correctamente`);
          }
          setIsLoad(false);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      alert("Operacion cancelada.");
    }

  }
  const unFavorite = (service_id) => {
    console.log(service_id);
    const queryParams = `?user_id=${usuario.id}&service_id=${service_id}`
    if (confirm("Confirme eliminar de favoritos")) {
      axios.delete(`${ENDPOINT}/favorites${queryParams}`)
        .then(({ data }) => {
          if (data.message === 'eliminado') {
            alert(`Servicio ${data.message} de favoritos`);
          }
          setIsLoad(false);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      alert("Operacion cancelada.");
    }
  }
  return (
    <div className="profile-background">
      <h1 className="profile-title">Perfil del Usuario</h1>
      {usuario && token ? (
        <>
          <p className="profile-form-title">
            Bienvenido, 
            {usuario.name.toUpperCase()}
          </p>
          <Button as={Link} to="/configuration" variant="primary" className="profile-submit-button">Editar Perfil</Button>
          {isLoad ? (
            <div className="profile-content">
            <div className="profile-left-column">
              <ProfileOptions 
                nameAction={'Servicios'} 
                services={services}
                action={{ formUpdate, deleteService }} 
              />
              <ProfileOptions 
                nameAction={'Favoritos'} 
                services={favServices}
                action={{ unFavorite }} 
              />
            </div>
            

          <div className="profile-right">
            <div className="profile-form-container">
              <h2 className="text-center mb-4" style={{ color: "white" }}>Crear servicio</h2>
              {token ?
                <Form onSubmit={!isUpdate ? handleSubmit : updateService}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de su servicio</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name" 
                      placeholder="Nombre del servicio"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Describe tu servicio.</Form.Label>
                    <Form.Control 
                      type="textarea" 
                      name="description" 
                      placeholder="Descripcion"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <SplitButton
                      key='Info'
                      id={`dropdown-split-variants-info`}
                      variant='custom'
                      title={category}
                      onSelect={handleSelect}
                      className="profile-filter"
                    >
                      {categorys.map((option, key) => (
                        <>
                          <Dropdown.Divider />
                          <Dropdown.Item key={key} eventKey={option.texto}>{option.texto}</Dropdown.Item>
                        </>
                      ))}
                    </SplitButton>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>imagenes de su servicio</Form.Label>
                    {isUpdate ?
                      <Form.Control 
                        type="file" 
                        name="file" 
                        placeholder="Agrege sus archivos"
                        multiple
                        onChange={handleFileChange} />
                      :
                      <Form.Control 
                        type="file" 
                        name="file" 
                        placeholder="Agrege sus archivos"
                        multiple
                        onChange={handleFileChange}
                        value={file}
                        required />
                    }
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button 
                      className="profile-submit-button" 
                      type="submit">
                      {isUpdate ? "Actualizar servicio" : "Grabar servicio"}
                    </Button>
                  </div>
                </Form>

                :
                <h1>Para crear un servicio debes estar registrado</h1>}
            </div>
          </div>
          </div>
          ) : (
            <h2 className="profile-title">Cargando tu contenido...</h2>
          )}
        </>

      ) : (
        <h1 className="profile-title-unauthorized">Usuario no autorizado</h1>
      )}
    </div>
  );
}

export default Profile;
