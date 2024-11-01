import { urlLocal } from '@/constant/baseUrl';
import queryString from 'query-string';
import axios from 'axios';


export const axiosClient=axios.create({
  baseURL: urlLocal,
  paramsSerializer: (params)=>queryString.stringify(params),
  withCredentials: true
})
// config interceptors 

axiosClient.interceptors.request.use((config:any)=>{
  return config
},(error:any)=>{
  return Promise.reject(error)
})

axiosClient.interceptors.response.use((config:any)=>{
  return config
},(error:any)=>{
  return Promise.reject(error)
})