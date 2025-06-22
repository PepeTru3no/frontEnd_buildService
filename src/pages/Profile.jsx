import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Button, Dropdown, Form, SplitButton, Modal } from "react-bootstrap";
import { ENDPOINT } from "../util/values";
import '../styles/Profile.css';
import ProfileOptions from "../components/ProfileOptions";
import { Link } from "react-router-dom";

function Profile() {
  const { usuario } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', description: '', price: 0 });
  const [file, setFile] = useState([]);
  const [category, setCategory] = useState('Seleccione una Categoria');
  const [services, setServices] = useState();
  const [favServices, setFavServices] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [modals, setModals] = useState({
    showSuccess: false,
    message: "",
    confirmDelete: false,
    confirmUnfav: false,
    confirmMessage: "",
    actionToConfirm: null
  });

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const getData = async () => {
      try {
        const queryParams = `?user_id=${usuario.id}`;
        const { data: serv } = await axios.get(`${ENDPOINT}/services/byUser/${queryParams}`);
        const { data: fav } = await axios.get(`${ENDPOINT}/services/favorite/${queryParams}`);
        setServices(serv);
        setFavServices(fav);
        setIsLoad(true);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [isLoad]);

  const showModal = (message) => {
    setModals(prev => ({ ...prev, message, showSuccess: true }));
    setTimeout(() => setModals(prev => ({ ...prev, showSuccess: false, message: "" })), 2000);
  };

  const confirmModal = (message, action) => {
    setModals(prev => ({ ...prev, confirmMessage: message, confirmDelete: true, actionToConfirm: action }));
  };

  const handleConfirm = () => {
    if (modals.actionToConfirm) modals.actionToConfirm();
    setModals(prev => ({ ...prev, confirmDelete: false, confirmMessage: "", actionToConfirm: null }));
  };

  const cancelConfirm = () => {
    setModals(prev => ({ ...prev, confirmDelete: false, confirmMessage: "", actionToConfirm: null }));
    showModal("Eliminación cancelada");
  };

  const handleFileChange = (e) => setFile([...e.target.files]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e) => setCategory(e);

  const handleSubmit = (e) => {
    e.preventDefault();
    const service = { ...formData, user_id: usuario.id, category: category.toLocaleLowerCase() };
    const Authorization = { headers: { Authorization: `Bearer ${token}` } };

    axios.post(`${ENDPOINT}/services`, service, Authorization)
      .then(({ data }) => {
        saveImage(data.id);
        resetForm();
        showModal("Se creó el servicio con éxito");
        setIsLoad(false);
      })
      .catch(console.log);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: 0 });
    setFile([]);
    setCategory('Seleccione una Categoria');
    setIsUpdate(false);
  };

  const saveImage = (id) => {
    const formData = new FormData();
    file.forEach(f => formData.append("file", f));
    axios.post(`${ENDPOINT}/images/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then(console.log)
      .catch(console.log);
  };

  const formUpdate = (service) => {
    if (service.category) setCategory(service.category);
    setFormData(service);
    setIsUpdate(true);
    showModal("Ahora puedes editar tu servicio.");
  };

  const updateService = async (e) => {
    e.preventDefault();
    const srv = { ...formData, user_id: usuario.id, category: category.toLocaleLowerCase() };
    const Authorization = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const { status, data } = await axios.put(`${ENDPOINT}/services/service/${formData.id}`, srv, Authorization);
      if (status === 200) {
        if (file.length > 0) saveImage(formData.id);
        showModal("Servicio actualizado");
        resetForm();
        setIsLoad(false);
      }
    } catch (error) {
      console.log("Error al cargar servicios:", error);
    }
  };

  const deleteService = (service_id) => {
    confirmModal("¿Quieres eliminar tu servicio?", () => {
      const queryParams = `?user_id=${usuario.id}&service_id=${service_id}`;
      axios.delete(`${ENDPOINT}/services${queryParams}`)
        .then(({ data }) => {
          if (data.message === 'eliminado') showModal("Eliminado con éxito");
          setIsLoad(false);
        })
        .catch(err => console.log(err.message));
    });
  };

  const unFavorite = (service_id) => {
    confirmModal("¿Quieres eliminar de tu favorito?", () => {
      const queryParams = `?user_id=${usuario.id}&service_id=${service_id}`;
      axios.delete(`${ENDPOINT}/favorites${queryParams}`)
        .then(({ data }) => {
          if (data.message === 'eliminado') showModal("Eliminado con éxito");
          setIsLoad(false);
        })
        .catch(err => console.log(err.message));
    });
  };

  return (
    <div className="profile-background">
      <h1 className="profile-title">Perfil del Usuario</h1>
      {usuario && token ? (
        <>
          <div className="profile-header">
            <p className="profile-form-title">Bienvenido,</p>
            <Button as={Link} to="/configuration" variant="primary" className="profile-submit-button" title="Editar Perfil">
              {usuario.name.toUpperCase()}
            </Button>
          </div>
          {isLoad ? (
            <div className="profile-content">
              <div className="profile-left-column">
                <ProfileOptions nameAction={'Servicios'} services={services} action={{ formUpdate, deleteService }} />
                <ProfileOptions nameAction={'Favoritos'} services={favServices} action={{ unFavorite }} />
              </div>
              <div className="profile-right">
                <div className="profile-form-container">
                  <h2 className="text-center mb-4" style={{ color: "white" }}>Crear servicio</h2>
                  <Form onSubmit={!isUpdate ? handleSubmit : updateService}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre de su servicio</Form.Label>
                      <Form.Control type="text" name="name" placeholder="Nombre del servicio" value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio de referencia</Form.Label>
                      <Form.Control type="textarea" name="price" placeholder="Precio" min="0" value={formData.price} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Describe tu servicio.</Form.Label>
                      <Form.Control type="textarea" name="description" placeholder="Descripcion" value={formData.description} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <SplitButton id={`dropdown-split-variants-info`} variant='custom' title={category} onSelect={handleSelect} className="profile-filter">
                        {["Fontanería", "Electricidad", "Limpieza", "Construcción y montaje"].map((cat, key) => (
                          <>
                            <Dropdown.Divider />
                            <Dropdown.Item key={key} eventKey={cat}>{cat}</Dropdown.Item>
                          </>
                        ))}
                      </SplitButton>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>imagenes de su servicio</Form.Label>
                      <Form.Control type="file" name="file" placeholder="Agrege sus archivos" multiple onChange={handleFileChange} required={!isUpdate} />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button className="profile-submit-button" type="submit">
                        {isUpdate ? "Actualizar servicio" : "Grabar servicio"}
                      </Button>
                      {isUpdate && (
                        <Button className="profile-submit-button" onClick={() => { resetForm(); showModal("Se cancelo la actualizacion"); }}>Cancelar edición</Button>
                      )}
                    </div>
                  </Form>
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

      <Modal show={modals.showSuccess} onHide={() => setModals(prev => ({ ...prev, showSuccess: false }))} centered>
        <Modal.Body className="text-center">
          <p>{modals.message}</p>
        </Modal.Body>
      </Modal>

      <Modal show={modals.confirmDelete} onHide={cancelConfirm} centered>
        <Modal.Body className="text-center">
          <p>{modals.confirmMessage}</p>
          <Button variant="danger" className="me-2" onClick={handleConfirm}>Aceptar</Button>
          <Button variant="secondary" onClick={cancelConfirm}>Cancelar</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
