import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const overlaysAPI = {
  getAll: () => axios.get(`${BASE_URL}/overlays`),
  create: (data) => axios.post(`${BASE_URL}/overlays`, data),
  update: (id, data) => axios.put(`${BASE_URL}/overlays/${id}`, data),
  delete: (id) => axios.delete(`${BASE_URL}/overlays/${id}`)
};
