import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

function Gallery({ title, text, image, buttonText, id, author, phone, stars, category, icon }) {
  const token = localStorage.getItem('token');
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title} 
          <ReactStars
          count={5}
          value={stars}
          size={12}
          color2={'#ffd700'} edit={false} />
          {icon}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
        <Card.Text>{`Autor: ${author}`}</Card.Text>
        <Card.Text>{`Telefono: ${phone}`}</Card.Text>
        <Card.Text>{text}</Card.Text>
        {!token ?
          <Button as={Link} to={`/interaction/${id}`} variant="primary">{buttonText}</Button>
          :
          <>
            <Button as={Link} to={`/interaction/${id}`} variant="primary">{buttonText}</Button>
            <Button as={Link} to={`/interaction/${id}`} variant="primary">Comentar</Button>
          </>
        }

      </Card.Body>
    </Card>
  );
}

export default Gallery;