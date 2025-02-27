import axios from "axios";

const API_BASE_URL = "https://c744-207-249-176-128.ngrok-free.app/api/lotions";


//ENPOINTS CLIENTE
export const getClients = async () => {
  const response = await axios.get(`${API_BASE_URL}/client`);
  return response.data.clients;
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