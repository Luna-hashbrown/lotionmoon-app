import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { getInventory, getClients, getEmployees, createSale } from "../services/ApiService"; 

const CreateSale = ({ onSaleCreated }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryData = await getInventory();
        console.log(inventoryData);
        setInventory(inventoryData);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    const fetchClients = async () => {
      try {
        const clientsData = await getClients();
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchInventory();
    fetchClients();
    fetchEmployees();
  }, []);

  const handleSearchProduct = () => {
    setIsModalOpen(true);
  };

  const handleSelectProduct = (product) => {
    setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    setIsModalOpen(false);
  };

  

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = quantity;
    setSelectedProducts(updatedProducts);
  };

  const handleCreateSale = async () => {
    const saleData = {
      products: selectedProducts.map((p) => ({
        inventoryID: p._id,
        quantity: p.quantity,
      })),
      totalPrice: selectedProducts.reduce((acc, p) => acc + p.product.price * p.quantity, 0),
      clientID: selectedClient,
      employeeID: selectedEmployee,
    };
    console.log("Selected Products:", selectedProducts);
    console.log("Sale Data:", saleData);
    try {
      await createSale(saleData);
      
      onSaleCreated();
    } catch (error) {
      console.error("Error creating sale:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Crear Venta</h2>

      <Form.Group className="mb-3">
        <Form.Label>Cliente</Form.Label>
        <Form.Select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
          <option value="">Seleccione un cliente</option>
          {clients.length > 0 ? (
            clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.clientName}
              </option>
            ))
          ) : (
            <option disabled>Cargando clientes...</option>
          )}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Empleado</Form.Label>
        <Form.Select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="">Seleccione un empleado</option>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.employeeName}
              </option>
            ))
          ) : (
            <option disabled>Cargando empleados...</option>
          )}
        </Form.Select>
      </Form.Group>

      <Button className="btn btn-primary mb-3" onClick={handleSearchProduct}>
        Buscar Producto
      </Button>

      <Table className="table table-bordered">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th className="text-end">Precio</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product, index) => (
            <tr key={product._id}>
              <td>{product.product.productName}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                  min="1"
                />
              </td>
              <td className="text-end">${product.product.price * product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total: ${selectedProducts.reduce((acc, p) => acc + p.product.price * p.quantity, 0)}</h4>

      <Button className="btn btn-success" onClick={handleCreateSale}>
        Crear Venta
      </Button>

      {isModalOpen && (
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Seleccionar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="list-group">
              {inventory.length > 0 ? (
                inventory.map((product) => (
                  <li
                    key={product._id}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSelectProduct(product)}
                    style={{ cursor: "pointer" }}
                  >
                    {product.product.productName} - ${product.product.price}
                  </li>
                ))
              ) : (
                <li className="list-group-item">Cargando productos...</li>
              )}
            </ul>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default CreateSale;
