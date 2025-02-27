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
    clientID: "",
    employeeID: "",
    inventoryID: "",
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

        console.log("Sales data:", salesData);
      console.log("Clients data:", clientsData);
      console.log("Employees data:", employeesData);
      console.log("Inventories data:", inventoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (sale = { _id: null, creationDate: "", total: "", clientID: "", employeeID: "", inventoryID: "" }) => {
    setFormData(sale);
    setShow(true);
  };  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.id) {
      setSales(sales.map(sale => sale._id === formData.id ? formData : sale));
    } else {
      setSales([...sales, { ...formData, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setSales(sales.filter(sale => sale._id !== id));
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
            <tr key={sale._id}>
              <td>{sale._id}</td>
              <td>{sale.creationDate}</td>
              <td>{sale.total}</td>
              <td>{clients.find(c => c._id === sale.clientID)?.clientName || "Desconocido"}</td>
              <td>{employees.find(e => e._id === sale.employeeID)?.employeeName || "Desconocido"}</td>
              <td>
                {sale.products?.length > 0 ? (
                  sale.products.map((p, index) => {
                    const inventory = inventories.find(i => i._id === p.inventoryID);
                    return (
                      <div key={index}>
                        {inventory?.product?.productName || "Desconocido"}
                      </div>
                    );
                  })
                ) : (
                  "Sin productos"
                )}
              </td>
              <td>
                <Button variant="warning" sizes="sm" onClick={() => handleShow(sale)}>Editar</Button>
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
              <Form.Select name="clientID" value={formData.clientID} onChange={handleChange}>
                <option value="">Seleccione un cliente</option>
                {clients.map(client => (
                  <option key={client.clientID} value={client.clientID}>{client.clientName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Empleado</Form.Label>
              <Form.Select name="employeeID" value={formData.employeeID} onChange={handleChange}>
                <option value="">Seleccione un empleado</option>
                {employees.map(employee => (
                  <option key={employee._id} value={employee.id}>{employee.employeeName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Inventario</Form.Label>
            <Form.Select
                name="inventoryID"
                multiple
                value={formData.inventoryIDs || []} 
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    inventoryIDs: [...e.target.selectedOptions].map(option => option.value)
                  })
                }
              >
                <option value="">Seleccione un inventario</option>
                {inventories.map(inventory => (
                  <option key={inventory._id} value={inventory._id}>
                    {inventory.product?.productName || "Desconocido"}
                  </option>
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