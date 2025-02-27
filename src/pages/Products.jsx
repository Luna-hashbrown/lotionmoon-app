import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Form, Modal } from "react-bootstrap";
import '../styles/Products.css';

import { getProducts, createProduct, updateProduct, deleteProduct} from "../services/ApiService";

const Products = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ id: null, productName: "", price: "", brand: "", descripcion: "" });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (product = { id: null, productName: "", price: "", brand: "", descripcion: "" }) => {
    setFormData(product);
    setShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.id) {
      try {
        const updatedProduct = await updateProduct(formData.id, formData);
        setProducts(products.map(p => p.id === formData.id ? updatedProduct.product : p));
      } catch (error) {
        console.error("Error al actualizar el producto", error);
      }
    } else {
      try {
        const newProduct = await createProduct(formData);
        setProducts([...products, newProduct]);
      } catch (error) {
        console.error("Error al crear el producto", error);
      }
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
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
          <Col key={product._id} md={4} className="mb-4">
            <Card className="product-card">
              <Card.Img variant="top" src={product.image} style={{ width: "150px", height: "150px", objectFit: "cover", margin: "auto" }} />
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
                <Card.Text>{product.descripcion}</Card.Text>
                <h5>${product.price} MXN</h5>
                <Button variant="primary">Comprar</Button>
                <Button variant="danger" onClick={() => handleDelete(product._id)}>Eliminar</Button>
                <Button variant="secondary" onClick={() => handleShow(product)}>Editar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="productName" value={formData.productName} onChange={handleChange} />
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
              <Form.Control type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />
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
