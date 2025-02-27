import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { getClients } from "../services/ApiService";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", email: "" });

  

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        console.log("Datos recibidos de la API:", data); // Para verificar en consola
        setClients(Array.isArray(data) ? data : []); // Asegura que siempre sea un array
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);
  
  

  const handleClose = () => setShow(false);
  const handleShow = (client = { id: null, name: "", email: "" }) => {
    setFormData(client);
    setShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(clients); // Debe ser un arreglo
  const handleSubmit = () => {
    if (formData.id) {
      
      setClients(clients.map(c => c.id === formData.id ? formData : c));
    } else {
      setClients([...clients, { ...formData, id: Date.now() }]);
    }
    handleClose();
  };
  
  const handleDelete = (id) => {
    setClients(clients.filter(client => client._id !== id)); // Cambia client.id por client._id
  };
  

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Clientes</h1>
      <Button className="mb-3" onClick={() => handleShow()}>Agregar Cliente</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {clients.map(client => (
          <tr key={client._id}>
            <td>{client._id}</td>
            <td>{client.clientName}</td> {/* Corrección: clientName en lugar de _clientName */}
            <td>{client.email}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => handleShow(client)}>Editar</Button>
              <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(client._id)}>Eliminar</Button>
            </td>
          </tr>
        ))}

        </tbody>
      </Table> 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Editar Cliente" : "Agregar Cliente"}</Modal.Title>
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

export default Clients;