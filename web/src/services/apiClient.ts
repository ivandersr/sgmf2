import axios from 'axios';

const api = axios.create({
  baseURL: 'http://sgmf2.herokuapp.com',
});

export default api;
