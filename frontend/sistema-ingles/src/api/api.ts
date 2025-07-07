import axios from "axios";

const token = localStorage.getItem('authToken');

// Configura o axios para enviar o token em todas as requisições
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});