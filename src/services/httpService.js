import axios from "axios";
import { toast } from "react-toastify";
import LoadingContext from "../context/LoadingContext";

const apiUrl = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("Generic unexpected error", error);
    console.log(error);
  }
  return Promise.reject(error); //<= pass control do any catch block
});

axios.interceptors.request.use((request) => {
  const jwt = localStorage.getItem("token");

  if (request.url.includes(apiUrl) && jwt)
    request.headers.common["x-auth-token"] = jwt;

  return request;
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
