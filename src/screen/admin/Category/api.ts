import { handleApi } from "@/service"
import {z} from 'zod';


export interface TypePropsModal {
  close?: boolean;
  onClose?: any;
  id?:string;
  category?: any
}

export const uploadCat = z.object({
  category_name: z.string().min(5, { message: 'Tên danh mục phải trên 5 ký tự' }),
  image: z.string().nonempty({ message: 'Trường ảnh không được để trống' })
})
export type FormData = z.infer<typeof uploadCat>;

export const uploadCategory = async (dataS:FormData) => {
  const response:any=await handleApi('category/createCat',dataS,'POST')
  return response.data
}

export const getAllCat=async()=>{
  try {
    const response:any=await handleApi('category/getAllCat')
    return response.data
  } catch (err:any) {
    console.log(err)
  }
}
export const updateCat=async(data:any)=>{
  const {catId,...dataS}=data
  try {
    const response:any=await handleApi(`category/updateCat/${catId}`,dataS,'PUT')
    return response.data
  } catch (err:any) {
    console.log(err)
  }
}
export const deleteCat=async(catId:string)=>{
  try {
    const response:any=await handleApi(`category/deleteCat/${catId}`,null,'DELETE')
    return response.data
  } catch (err:any) {
    console.log(err)
  }
}