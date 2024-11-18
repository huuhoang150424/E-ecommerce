import { axiosClient } from "./axiosClient"

/**
 * 
 * @param url 
 * @param data 
 * @param method 
 * @param params 
 * @returns 
 */

export const handleApi = async (
  url: string,
  data?: any,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  params?: any
) => {
  return axiosClient(url, {
    method,
    data,
    params,
  });
};