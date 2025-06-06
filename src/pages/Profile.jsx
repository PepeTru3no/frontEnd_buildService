import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

function Profile() {
  const { usuario } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [file, setFile] = useState([]);
  const token= localStorage.getItem('token');
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFile([...e.target.files]);
  };
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const service = {
      name: formData.name,
      description: formData.description,
      user_id: usuario[0].id
    }
    const Authorization = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.post('http://localhost:3000/services', service, Authorization)
      .then(({ data }) => {
        saveImage(data.id);
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
    axios.post(`http://localhost:3000/images/${id}`, formData, {
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
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Perfil del Usuario</h1>
      {usuario && token ? (
        <>
          <p>Bienvenido, {usuario[0].name.toUpperCase()}</p>
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Nombre de su servicio</Form.Label>
                  <Form.Control type="text" name="name" placeholder="Nombre del servicio"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Agregue una descripcion de su servicio.</Form.Label>
                  <Form.Control type="textarea" name="description" placeholder="Descripcion"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
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
        <div onLoad={navigate('/login')} />
      )}
    </div>
  );
}

export default Profile;
