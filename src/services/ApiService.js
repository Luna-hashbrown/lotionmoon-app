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
  const response = await axios.post(`${API_BASE_URL}/cliente-create`, clientData);
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
    const response = await axios.put(`${API_BASE_URL}/product-update/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error actualizando producto:", error);
    throw error;
  }
};

// Eliminar un producto por su ID
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/product-delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando producto:", error);
    throw error;
  }
};

//ENPOINTS INVENTARIO
export const getInventory = async () => {
  const response = await axios.get(`${API_BASE_URL}/inventory`);
  return response.data.clients;
};

export const createInventory = async (clientData) => {
  const response = await axios.post(`${API_BASE_URL}/inventory-create`, clientData);
  return response.data.client;
};

export const updateInventory = async (idClient, clientData) => {
  const response = await axios.put(`${API_BASE_URL}/inventory-update/${idClient}`, clientData);
  return response.data.client;
};

export const deleteInventory = async (idClient) => {
  await axios.delete(`${API_BASE_URL}/inventory-delete/${idClient}`);
};

export const getEmployees = async () => {
  const response = await axios.get(`${API_BASE_URL}/employee`);
  return response.data.employees;
};

export const getSales = async () => {
  const response = await axios.get(`${API_BASE_URL}/sale`);
  return response.data.sales;
}

export const getPurchases = async () => {
  const response = await axios.get(`${API_BASE_URL}/purchase`);
  return response.data.purchases;
}
