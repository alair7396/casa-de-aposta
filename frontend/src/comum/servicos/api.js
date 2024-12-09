import axios from 'axios';

// Configuração da instância do Axios
const api = axios.create({
  baseURL: 'https://apipato.onrender.com', // Substitua pela URL correta da API
});

// Interceptor para adicionar o token JWT ao cabeçalho Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Recupera o token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Rejeita a requisição caso haja um erro no interceptor
  }
);

export default api;
