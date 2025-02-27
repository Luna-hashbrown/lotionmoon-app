import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Alert } from "react-bootstrap";
import { getClients, createClient, updateClient, deleteClient } from "../services/ApiService";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores
  const [formData, setFormData] = useState({ _id: null, clientName: "", email: "" });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setErrorMessage("Error al cargar la lista de clientes.");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (client = { _id: null, clientName: "", email: "" }) => {
    setFormData(client);
    setShow(true);
    setErrorMessage(""); // Limpiar errores al abrir el modal
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (formData._id) {
        await updateClient(formData._id, formData);
      } else {
        await createClient(formData);
      }
      fetchClients();
      handleClose();
    } catch (error) {
      console.error("Error saving client:", error);
      setErrorMessage("No se pudo guardar el cliente. Verifica los datos e inténtalo de nuevo.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
      setErrorMessage("No se pudo eliminar el cliente. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Clientes</h1>

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}

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
              <td>{client.clientName}</td>
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
          <Modal.Title>{formData._id ? "Editar Cliente" : "Agregar Cliente"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="clientName" value={formData.clientName} onChange={handleChange} />
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
