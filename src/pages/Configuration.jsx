import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import '../styles/Configuration.css';

function Configuration() {
    return(
        <div className="configuration-background">
            <div className="interaction-card" >
                    <Card>
                      <Card.Img className="interaction-img" variant="top" src="aquifotodeperfil" />
                      <Card.Body />
                      <ListGroup className="list-group-flush">
                            <ListGroup.Item>Luis Vergara</ListGroup.Item>
                            <ListGroup.Item>998765432</ListGroup.Item>
                            <ListGroup.Item>luis.vergara.catalan@gmail.com</ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </div>
            <div className="register-form">
        <h2 className="register-title">
          Editar Cuenta
        </h2>

        <Form onSubmit="">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Nombre"
              value=""
              onChange=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Apellidos"
              value=""
              onChange=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Control
              type="number"
              name="age"
              placeholder="Edad"
              value=""
              onChange=""
              required
              min={18}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Control
              type="text"
              name="phone"
              placeholder="Telefono"
              value=""
              onChange=""
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value=""
              onChange=""
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="email"
              placeholder="Correo electronico"
              value=""
              onChange=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value=""
              onChange=""
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="file" name="file" placeholder="Agrege sus archivos"
                multiple
                onChange=""
                required />
            </Form.Group>

          <div className="d-flex justify-content-center">
            <Button className="register-button"
              type="submit"
            >
              Guardar cambios
            </Button>
          </div>
        </Form>
      </div>
        </div>
    )
}

export default Configuration;