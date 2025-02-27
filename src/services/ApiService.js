import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/lotions";

export const getClients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/client`);
    return response.data; 
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
    return []; 
  }
};


//product
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
