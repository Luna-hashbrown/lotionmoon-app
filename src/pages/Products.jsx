import React, { useState } from "react";
import { Card, Button, Container, Row, Col, Form, Modal } from "react-bootstrap";
import '../styles/Products.css';

const Products = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ id: null, nameProduct: "", price: "", brand: "", description: "" });
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Miss Dior",
      brand: "Dior",
      price: 25000,
      description: "Perfume para mujer con notas elegantes.",
      image: "https://www.dior.com/on/demandware.static/-/Sites-master_dior/default/dwbf948b56/Y0997166/Y0997166_C099700897_E01_GHC.jpg"
    },
    {
      id: 2,
      name: "Le Men",
      brand: "Jean Paul Gaulthier",
      price: 15000,
      description: "Perfume para hombre rico.",
      image: "https://m.media-amazon.com/images/I/51RCRxeAjCL._AC_UF1000,1000_QL80_.jpg"
    }
  ]);
  
  const handleClose = () => setShow(false);
  const handleShow = (client = { id: null, name: "", email: "" }) => {
    setFormData(client);
    setShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.id) {
      
      setProducts(products.map(c => c.id === formData.id ? formData : c));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    handleClose();
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Catálogo de Productos</h1>
        </Col>
        <Col className="text-end">
          <Button variant="success" className="rounded-circle" onClick={() => handleShow()}>
            <i className="fas fa-plus"></i>
          </Button>
        </Col>
      </Row>

      {/* Fila de productos */}
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4} className="mb-4">
            <Card className="product-card"> 
              <Card.Img variant="top" src={product.image} style={{ width: "150px", height: "150px", objectFit: "cover", margin: "auto" }}/>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <h5>${product.price} MXN</h5>
                <Button variant="primary">Comprar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Editar Cliente" : "Agregar Cliente"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="nameProduct" value={formData.nameProduct} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Products;
