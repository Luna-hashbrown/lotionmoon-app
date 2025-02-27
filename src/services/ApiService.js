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
