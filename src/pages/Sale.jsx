import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { getSales } from "../services/ApiService";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    creationDate: "",
    total: "",
    clientID: "",  
    employeeID: "", 
    inventoryID: "",
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getSales();
        console.log("Datos recibidos de la API:", data);
        setSales(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };
    fetchSales();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (sale = { id: null, creationDate: "", total: "", clientID: "", employeeID: "", inventoryID: "" }) => {
    setFormData(sale);
    setShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.id) {
      setSales(sales.map(sale => sale.id === formData.id ? formData : sale));
    } else {
      setSales([...sales, { ...formData, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setSales(sales.filter(sale => sale.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Ventas</h1>
      <Button className="mb-3" onClick={() => handleShow()}>Agregar Venta</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Creación</th>
            <th>Total</th>
            <th>ID Cliente</th>
            <th>ID Empleado</th>
            <th>ID Inventario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.creationDate}</td>
              <td>{sale.total}</td>
              <td>{sale.clientID}</td>     {/* 🔄 Cambio de "sale.clientid" a "sale.clientID" */}
              <td>{sale.employeeID}</td>   {/* 🔄 Cambio de "sale.employeeid" a "sale.employeeID" */}
              <td>{sale.inventoryID}</td>  {/* 🔄 Cambio de "sale.inventoryid" a "sale.inventoryID" */}
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(sale)}>Editar</Button>
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(sale.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Editar Venta" : "Agregar Venta"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Creación</Form.Label>
              <Form.Control type="date" name="creationDate" value={formData.creationDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" step="0.01" name="total" value={formData.total} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID Cliente</Form.Label>
              <Form.Control type="number" name="clientID" value={formData.clientID} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID Empleado</Form.Label>
              <Form.Control type="number" name="employeeID" value={formData.employeeID} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID Inventario</Form.Label>
              <Form.Control type="number" name="inventoryID" value={formData.inventoryID} onChange={handleChange} />
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

export default Sales;