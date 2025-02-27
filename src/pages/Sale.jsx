import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { getSales, getClients, getEmployees, getInventory } from "../services/ApiService";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    creationDate: "",
    total: "",
    clientid: "",
    employeeid: "",
    inventoryid: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesData, clientsData, employeesData, inventoriesData] = await Promise.all([
          getSales(),
          getClients(),
          getEmployees(),
          getInventory(),
        ]);
        setSales(Array.isArray(salesData) ? salesData : []);
        setClients(Array.isArray(clientsData) ? clientsData : []);
        setEmployees(Array.isArray(employeesData) ? employeesData : []);
        setInventories(Array.isArray(inventoriesData) ? inventoriesData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (sale = { id: null, creationDate: "", total: "", clientid: "", employeeid: "", inventoryid: "" }) => {
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
      <h1 className="text-center">Gestión de Ventas</h1>
      <Button className="mb-3" onClick={() => handleShow()}>Agregar Venta</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Creación</th>
            <th>Total</th>
            <th>Cliente</th>
            <th>Empleado</th>
            <th>Inventario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.creationDate}</td>
              <td>{sale.total}</td>
              <td>{clients.find(c => c.id === sale.clientid)?.name || "Desconocido"}</td>
              <td>{employees.find(e => e.id === sale.employeeid)?.name || "Desconocido"}</td>
              <td>{inventories.find(i => i.id === sale.inventoryid)?.name || "Desconocido"}</td>
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
              <Form.Label>Fecha de Creación</Form.Label>
              <Form.Control type="date" name="creationDate" value={formData.creationDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" step="0.01" name="total" value={formData.total} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Select name="clientid" value={formData.clientid} onChange={handleChange}>
                <option value="">Seleccione un cliente</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Empleado</Form.Label>
              <Form.Select name="employeeid" value={formData.employeeid} onChange={handleChange}>
                <option value="">Seleccione un empleado</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>{employee.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Inventario</Form.Label>
              <Form.Select name="inventoryid" value={formData.inventoryid} onChange={handleChange}>
                <option value="">Seleccione un inventario</option>
                {inventories.map(inventory => (
                  <option key={inventory.id} value={inventory.id}>{inventory.name}</option>
                ))}
              </Form.Select>
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