import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { getPurchases } from "../services/ApiService";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    creationPurchase: "",
    total: "",
    provider: "",
    employeeid: "",
    inventoryid: "",
  });

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await getPurchases();
        console.log("Datos recibidos de la API:", data);
        setPurchases(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };
    fetchPurchases();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (purchase = { id: null, creationPurchase: "", total: "", provider: "", employeeid: "", inventoryid: "" }) => {
    setFormData(purchase);
    setShow(true);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "creationPurchase") {
      value = value.split("T")[0];
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const formattedData = {
      ...formData,
      creationPurchase: formData.creationPurchase.split("T")[0],
    };

    if (formattedData.id) {
      setPurchases(purchases.map(purchase => purchase.id === formattedData.id ? formattedData : purchase));
    } else {
      setPurchases([...purchases, { ...formattedData, id: Date.now() }]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    setPurchases(purchases.filter(purchase => purchase.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Compras</h1>
      <Button className="mb-3" onClick={() => handleShow()}>Agregar Compra</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Creación</th>
            <th>Total</th>
            <th>Proveedor</th>
            <th>ID Empleado</th>
            <th>ID Inventario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => (
            <tr key={purchase.id}>
              <td>{purchase.id}</td>
              <td>{purchase.creationPurchase}</td>
              <td>{purchase.total}</td>
              <td>{purchase.provider}</td>
              <td>{purchase.employeeid}</td>
              <td>{purchase.inventoryid}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(purchase)}>Editar</Button>
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(purchase.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Editar Compra" : "Agregar Compra"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Creación</Form.Label>
              <Form.Control type="date" name="creationPurchase" value={formData.creationPurchase} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" step="0.01" name="total" value={formData.total} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control type="text" name="provider" value={formData.provider} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID Empleado</Form.Label>
              <Form.Control type="number" name="employeeid" value={formData.employeeid} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID Inventario</Form.Label>
              <Form.Control type="number" name="inventoryid" value={formData.inventoryid} onChange={handleChange} />
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

export default Purchases;