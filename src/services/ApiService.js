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