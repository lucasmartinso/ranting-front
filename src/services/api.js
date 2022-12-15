import axios from 'axios';

const instance = axios.create({
  baseURL: "https://rating-api.onrender.com"
});

export default instance;
