import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { getEmployees } from "../services/ApiService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ id: null, employeeName: "", email: "", contrasena: "" });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        console.log("Datos recibidos de la API:", data);
        setEmployees(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (employee = { id: null, employeeName: "", email: "", contrasena: "" }) => {
    setFormData(employee);
    setShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.id) {

      setEmployees(employees.map(emp => emp.id === formData.id ? formData : emp));
    } else {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Empleados</h1>
      <Button className="mb-3" onClick={() => handleShow()}>Agregar Empleado</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Acciones</th> 
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.employeeName}</td>
              <td>{employee.email}</td>
              <td>{employee.contrasena}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(employee)}>Editar</Button>
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(employee.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Editar Empleado" : "Agregar Empleado"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} />
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

export default Employees;