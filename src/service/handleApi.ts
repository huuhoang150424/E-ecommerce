import { axiosClient } from "./axiosClient"

/**
 * 
 * @param url 
 * @param data 
 * @param method 
 * @param params 
 * @returns 
 */

export const handleApi=async (url: string,data?:any, method?: string | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', params ?: any)=>{
  return axiosClient(url,{
    method: method ?? 'GET',
    data,
    params
  }
  )
}