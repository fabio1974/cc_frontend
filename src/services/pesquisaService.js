import http from "./httpService";

const apiUrl = process.env.REACT_APP_API_URL;

export function searchSigv(placa, codControle) {
  return http.get(`${apiUrl}/sigv?placa=${placa}&codControle=${codControle}`);
}
