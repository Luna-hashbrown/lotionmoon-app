import axios from "axios";

const API_BASE_URL = "https://c744-207-249-176-128.ngrok-free.app/api/lotions";

export const getClients = async () => {
  const response = await axios.get(`${API_BASE_URL}/client`);
  return response.data.clients;
};