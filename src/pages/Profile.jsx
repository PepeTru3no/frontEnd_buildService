import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Button, Dropdown, Form, SplitButton } from "react-bootstrap";
import { ENDPOINT } from "../util/values";

function Profile() {
  const { usuario } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [file, setFile] = useState([]);
  const [category, setCategory] = useState('Seleccione una Categoria');
  const token = localStorage.getItem('token');
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
        setFile('');
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
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Perfil del Usuario</h1>
      {usuario && token ? (
        <>
          <p>Bienvenido, {usuario.name.toUpperCase()}</p>
          <div
            style={{
              backgroundColor: 'black',
              opacity: 0.7,
              padding: '2rem',
              borderRadius: '15px',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <h2 className="text-center mb-4" style={{ color: "white" }}>Crear servicio</h2>
            {token ?
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de su servicio</Form.Label>
                  <Form.Control type="text" name="name" placeholder="Nombre del servicio"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Agregue una descripcion de su servicio.</Form.Label>
                  <Form.Control type="textarea" name="description" placeholder="Descripcion"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <SplitButton
                    key='Info'
                    id={`dropdown-split-variants-info`}
                    variant='info'
                    title={category}
                    onSelect={handleSelect}
                  >
                    {categorys.map((option) => (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey={option.texto}>{option.texto}</Dropdown.Item>
                      </>
                    ))}
                  </SplitButton>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>imagenes de su servicio</Form.Label>
                  <Form.Control type="file" name="file" placeholder="Agrege sus archivos"
                    multiple
                    onChange={handleFileChange}
                    required />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button style={{ backgroundColor: "#0e2e3c", border: "#0e2e3c", opacity: 1 }} type="submit">
                    Grabar servicio
                  </Button>
                </div>
              </Form> :
              <h1>Para crear un servicio debes estar registrado</h1>}

          </div>
        </>

      ) : (
        <h1>No autorizado</h1>
      )}
    </div>
  );
}

export default Profile;
