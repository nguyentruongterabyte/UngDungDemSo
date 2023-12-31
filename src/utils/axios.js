import axios from 'axios';
import config from '~/config';
// baseURL: 'http://localhost:8080/api',

export default axios.create({
  baseURL: config.constants.SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: config.constants.SERVER,
  headers: { 'Content-Type': 'application/json', withCredentials: true },
});
