import { urlLocal } from '@/constant/baseUrl';
import queryString from 'query-string';
import axios from 'axios';
import { store } from '../redux/store';
import { jwtDecode } from 'jwt-decode';
import { updateToken } from '@/redux/authReducer';

export const axiosClient = axios.create({
  baseURL: urlLocal,
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});
// config interceptors
const updateAccessToken = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/auth/refresh-token', {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    console.log(err);
  }
};

axiosClient.interceptors.request.use(
  async (config: any) => {
    const state = store.getState();
    let accessToken = state.auth.token;
    
    if (accessToken) {
      const user: any = jwtDecode(accessToken);
      const { exp } = user;
      if (Date.now() / 1000 >= exp) {
        const data = await updateAccessToken();
        if (data && data.accessToken) {
          accessToken = data.accessToken;
          store.dispatch(updateToken({ token: accessToken }));
        }
      }
      config.headers.token = `Bearer ${accessToken}`;
    }
    config.headers.Accept = `application/json`;
    return config;
  },
  (error) => Promise.reject(error)
);


axiosClient.interceptors.response.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
