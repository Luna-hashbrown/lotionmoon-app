import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { getInventory, createInventory, updateInventory, deleteInventory } from "../services/ApiService";
import { getProducts } from "../services/ProductService"; // Asegúrate de tener este servicio

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]); // Lista de productos disponibles
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ stock: "", minimunStock: "", maximunStock: "" , product: "" });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventory();
        setInventory(data || []);
      } catch (error) {
        console.error("Error al obtener inventario:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setAvailableProducts(productsData || []);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchInventory();
    fetchProducts();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (item = { stock: "", minimunStock: "", maximunStock: "" , product: "" }) => {
    setFormData(item);
    setShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (formData._id) {
        await updateInventory(formData._id, formData);
        setInventory(inventory.map(i => (i._id === formData._id ? formData : i)));
      } else {
        const newItem = await createInventory(formData);
        setInventory([...inventory, newItem]);
      }
      handleClose();
    } catch (error) {
      console.error("Error al guardar el inventario:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInventory(id);
      setInventory(inventory.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error al eliminar el inventario:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Inventario</h1>
      <Button className="mb-3" onClick={() => handleShow()}>Agregar Producto al Inventario</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Stock Mínimo</th>
            <th>Stock Máximo</th>
            <th>Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item._id}>
              <td>{item.stock}</td>
              <td>{item.stockMin}</td>
              <td>{item.stockMax}</td>
              <td>{availableProducts.find(p => p._id === item.productId)?.name || "Desconocido"}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(item)}>Editar</Button>
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(item._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData._id ? "Editar Inventario" : "Agregar Inventario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Producto</Form.Label>
              <Form.Select name="productId" value={formData.productId} onChange={handleChange}>
                <option value="">Seleccione un producto</option>
                {availableProducts.map(product => (
                  <option key={product._id} value={product._id}>{product.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
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

