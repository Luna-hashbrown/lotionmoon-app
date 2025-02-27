import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/lotions";


//ENPOINTS CLIENTE
export const getClients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/client`);
    return response.data; 
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
    return []; 
  }
};

export const createClient = async (clientData) => {
  const response = await axios.post(`${API_BASE_URL}/client-create`, clientData);
  return response.data.client;
};

export const updateClient = async (idClient, clientData) => {
  const response = await axios.put(`${API_BASE_URL}/client-update/${idClient}`, clientData);
  return response.data.client;
};

export const deleteClient = async (idClient) => {
  await axios.delete(`${API_BASE_URL}/client-delete/${idClient}`);
};

//ENDPOINTS PRODUCTO

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data; 
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return []; 
  }
};

// Crear un nuevo producto
export const createProduct = async (product) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products-create`, product);
    return response.data; 
  } catch (error) {
    console.error("Error creando producto:", error);
    throw error; 
  }
};

// Actualizar un producto por su ID
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products-update/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error actualizando producto:", error);
    throw error;
  }
};

// Eliminar un producto por su ID
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products-delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando producto:", error);
    throw error;
  }
};

//ENPOINTS INVENTARIO
export const getInventory = async () => {
  const response = await axios.get(`${API_BASE_URL}/inventory`);
  return response.data;
};

export const createInventory = async (clientData) => {
  const response = await axios.post(`${API_BASE_URL}/inventory-create`, clientData);
  return response.data;
};

export const updateInventory = async (idClient, clientData) => {
  const response = await axios.put(`${API_BASE_URL}/inventory-update/${idClient}`, clientData);
  return response.data;
};

export const deleteInventory = async (idClient) => {
  await axios.delete(`${API_BASE_URL}/inventory-delete/${idClient}`);
};



//ENDPOINTS VENTA

export const getSales = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sales`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo ventas:", error);
    return [];
  }
};

export const createSale = async (saleData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sales-create`, saleData);
    return response.data;
  } catch (error) {
    console.error("Error creando venta:", error);
    throw error;
  }
};

export const updateSaleById = async (idSale, saleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/sales-update/${idSale}`, saleData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando venta:", error);
    throw error;
  }
};

export const deleteSale = async (idSale) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/sales-delete/${idSale}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando venta:", error);
    throw error;
  }
};


//ENDPOINTS COMPRA

export const getPurchases = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/purchase`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo compras:", error);
    return [];
  }
};

export const createPurchase = async (purchaseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/purchase-create`, purchaseData);
    return response.data;
  } catch (error) {
    console.error("Error creando compra:", error);
    throw error;
  }
};

export const updatePurchaseById = async (idPurchase, purchaseData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/purchase-update/${idPurchase}`, purchaseData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando compra:", error);
    throw error;
  }
};

export const deletePurchase = async (idPurchase) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/purchase-delete/${idPurchase}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando compra:", error);
    throw error;
  }
};

//ENDPOINTS EMPLEADO

export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo empleados:", error);
    return [];
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo empleado:", error);
    throw error;
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/employees-create`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error creando empleado:", error);
    throw error;
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/employees-update/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando empleado:", error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/employees-delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando empleado:", error);
    throw error;
  }
};