import { handleApi } from "@/service";
import {z} from "zod";


export const uploadAttribute=z.object({
  attribute_name: z.string().min(5,{message: 'Tên thuộc tính phải trên 5 ký tự'})
})

export type FormData=z.infer<typeof uploadAttribute>


export interface TypePropsModal {
  close?: boolean;
  onClose?: any;
  id?:string;
  attribute?: any
}

export const createAttribute=async (dataS:FormData)=>{
  try {
    const response=await handleApi('product/createAttribute',dataS,'POST')
    return response.data
  } catch (err:any) {
    throw err;
  }

}
export const getAllAttributes = async (page?: number, pageSize?: number) => {
  try {
      const params = page && pageSize ? { page, size: pageSize } : undefined;
      const response = await handleApi('product/getAllAttribute', null, 'GET', params);
      return response.data;
  } catch (err: any) {
      throw err;
  }
};

export const updateAttribute = async (dataS: any) => {
  const { id, ...payload } = dataS; 
  try {
    const response = await handleApi(`product/updateAttribute/${id}`, payload, 'PUT');
    return response.data;
  } catch (err: any) {
    throw err;;
  }
}


export const deleteAttribute=async (id:string)=>{
  try {
    const response=await handleApi(`product/deleteAttribute/${id}`,null,'DELETE')
    return response.data
  } catch (err:any) {
    throw err;
  }

}