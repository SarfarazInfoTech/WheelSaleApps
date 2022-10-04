import axios from 'axios';
export const BASE_URL = 'http://192.168.1.34:8080/wheelsale-app-ws/';

export const myAxios = axios.create({
  baseURL: BASE_URL,
});
