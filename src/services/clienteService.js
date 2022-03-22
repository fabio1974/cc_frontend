import http from "./httpService";

//const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = "http://localhost:8080/api";
const path = "clientes";

export function getClientes(page, pageSize) {
  return http.get(`${apiUrl}/${path}?page=${page}&pageSize=${pageSize}`);
}

export function getClienteByCpfCnpj(cpfCnpj) {
  return http.get(`${apiUrl}/${path}/${cpfCnpj}`);
}

export function deleteCliente(id) {
  return http.delete(`${apiUrl}/${path}/${id}`);
}

export function createCliente(cliente) {
  return http.post(`${apiUrl}/${path}`, {
    /*
        payer:boleto.payer,
        total: boleto.total,
        status:boleto.status,
        due_date: boleto.due_date,
        pay_date: boleto.pay_date,
        message:boleto.message,
        our_number: boleto.our_number
*/
  });
}
