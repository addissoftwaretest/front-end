import axios from 'axios';

const apiUrl: string = 'http://localhost:5000/';

const api = axios.create({
  baseURL: `${apiUrl}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
