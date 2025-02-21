import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

const Inventory = () => {
  const [products, setProducts] = useState([
    { id: 1, stock: 50, stockMin: 10, stockMax: 100 },
    { id: 2, stock: 20, stockMin: 5, stockMax: 50 },
  ]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ id: null, stock: "", stockMin: "", stockMax: "" });

  const handleClose = () => setShow(false);
  const handleShow = (product = { id: null, stock: "", stockMin: "", stockMax: "" }) => {
    setFormData(product);
    setShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.id) {
      setProducts(products.map(p => p.id === formData.id ? formData : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Productos</h1>
      <Button className="mb-3" onClick={() => handleShow()}>Agregar Producto</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Stock</th>
            <th>Stock Mínimo</th>
            <th>Stock Máximo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.stock}</td>
              <td>{product.stockMin}</td>
              <td>{product.stockMax}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(product)}>Editar</Button>
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(product.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock Mínimo</Form.Label>
              <Form.Control type="number" name="stockMin" value={formData.stockMin} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock Máximo</Form.Label>
              <Form.Control type="number" name="stockMax" value={formData.stockMax} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inventory;