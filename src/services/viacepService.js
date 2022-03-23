import http from "./httpService";

const apiUrl = process.env.REACT_APP_API_URL;
const path = "viacep";

export function getEnderecoByCep(cep) {
  return http.get(`${apiUrl}/${path}/${cep}`);
}
