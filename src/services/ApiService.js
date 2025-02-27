import axios from "axios";

const API_BASE_URL = "https://c744-207-249-176-128.ngrok-free.app/api/lotions";

export const getClients = async () => {
  const response = await axios.get(`${API_BASE_URL}/client`);
  return response.data.clients;
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