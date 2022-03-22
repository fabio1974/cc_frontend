import http from "./httpService";

const apiUrl = process.env.REACT_APP_API_URL;
const path = "boletos";

export function getBoletos(page, pageSize) {
  return http.get(`${apiUrl}/${path}?page=${page}&pageSize=${pageSize}`);
}

export function getBoleto(id) {
  return http.get(`${apiUrl}/${path}/${id}`);
}

export function deleteBoleto(id) {
  return http.delete(`${apiUrl}/${path}/${id}`);
}

export function createBoleto(boleto) {
  return http.post(`${apiUrl}/${path}`, boleto);
}
