import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { getPurchases, getEmployees, getInventory, createPurchase } from "../services/ApiService";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    total: "",
    provider: "",
    employeeID: "",
    inventoryID: "",
    quantity: 1, // Inicializado en 1
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [purchasesData, employeesData, inventoriesData] = await Promise.all([
          getPurchases(),
          getEmployees(),
          getInventory(),
        ]);
        setPurchases(Array.isArray(purchasesData) ? purchasesData : []);
        setEmployees(Array.isArray(employeesData) ? employeesData : []);
        setInventories(Array.isArray(inventoriesData) ? inventoriesData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setFormData({ total: "", provider: "", employeeID: "", inventoryID: "", quantity: 1 });
    setShow(true);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePurchase = async () => {
    try {
      const purchaseData = {
        products: [{ 
          inventoryID: formData.inventoryID, 
          quantity: parseInt(formData.quantity, 10) // Convertimos a número entero
        }],
        total: parseFloat(formData.total), // Convertimos a número decimal
        provider: formData.provider,
        employeeID: formData.employeeID
      };

      const newPurchase = await createPurchase(purchaseData);
      setPurchases([...purchases, newPurchase]);
      handleClose();
    } catch (error) {
      console.error("Error al crear la compra:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Compras</h1>
      <Button className="mb-3" onClick={handleShow}>Agregar Compra</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Proveedor</th>
            <th>Empleado</th>
            <th>Inventario</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => (
            <tr key={purchase._id}>
              <td>{purchase._id}</td>
              <td>{purchase.total}</td>
              <td>{purchase.provider}</td>
              <td>
                {employees.find(e => e._id === purchase.employeeID)?.employeeName || "Desconocido"}
              </td>
              <td>{inventories.find(i => i.id === purchase.inventoryID)?.product.productName || "Desconocido"}</td>
              <td>
                {purchase.products?.length > 0 ? purchase.products[0].quantity : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" step="0.01" name="total" value={formData.total} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control type="text" name="provider" value={formData.provider} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Empleado</Form.Label>
              <Form.Select name="employeeID" value={formData.employeeID} onChange={handleChange}>
                <option value="">Seleccione un empleado</option>
                {employees.map(employee => (
                  <option key={employee._id} value={employee._id}>{employee.employeeName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Inventario</Form.Label>
              <Form.Select name="inventoryID" value={formData.inventoryID} onChange={handleChange}>
                <option value="">Seleccione un inventario</option>
                {inventories.map(inventory => (
                  <option key={inventory._id} value={inventory._id}>
                    {inventory.product?.productName || "Desconocido"}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control 
                type="number" 
                name="quantity" 
                min="1" 
                value={formData.quantity} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleCreatePurchase}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Purchases;
{/* <td>{inventories.find(i => i.id === purchase.inventoryID)?.product.productName || "Desconocido"}</td> */}