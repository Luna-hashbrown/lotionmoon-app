import React, { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import '../styles/Products.css';

const Products = () => {
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

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Catálogo de Productos</h1>
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
    </Container>
  );
};

export default Products;