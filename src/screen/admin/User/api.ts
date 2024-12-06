import { handleApi } from "@/service";
import { z } from "zod";


export const uploadUser = z.object({
  name: z.string().nonempty({ message: 'Trường tên không được để trống' }),
  email: z.string().email({ message: 'Email không hợp lệ' }).nonempty({ message: 'Trường email không được để trống' }),
  password: z.string().nonempty({ message: 'Trường mật khẩu không được để trống' }),
  gender: z.enum(["Male", "Female", "Other"]).refine((val:string) => val !== "", { message: 'Trường giới tính không được để trống' }),  // Chắc chắn rằng gender có giá trị hợp lệ
  avatar: z.string().nonempty({ message: 'Trường ảnh không được để trống' }),
  isAdmin: z.boolean().refine(val => typeof val === 'boolean', { message: 'Trường quyền không hợp lệ' }) // isAdmin là boolean
});


export type FormData=z.infer<typeof uploadUser>

export interface TypePropsModal {
  close?: boolean;
  onClose?: any;
  id?:string;
  user?: any
}

export const createUser=async (dataS:FormData)=>{
  try {
    const response=await handleApi('auth/createUser',dataS,'POST')
    return response.data
  } catch (err:any) {
    throw err;
  }

}
export const getAllUser=async (page: number, pageSize: number)=>{
  try {
    const response=await handleApi('auth/getAllUser',null,'GET',{ page, size: pageSize })
    return response.data
  } catch (err:any) {
    throw err;
  }

}
export const updateUser = async (dataS: any) => {
  const { id, ...payload } = dataS; 
  try {
    const response = await handleApi(`auth/updateUser/${id}`, payload, 'PUT');
    return response.data;
  } catch (err: any) {
    throw err;;
  }
}


export const deleteUser=async (id:string)=>{
  try {
    const response=await handleApi(`auth/deleteUser/${id}`,null,'DELETE')
    return response.data
  } catch (err:any) {
    throw err;
  }

}