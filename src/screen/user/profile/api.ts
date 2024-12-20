import { handleApi } from "@/service";
import { z } from "zod";




export const changePasswordForm = z.object({
  oldPassword: z.string().nonempty({ message: 'Trường mật khẩu cũ không được để trống' }),
  newPassword: z.string().nonempty({ message: 'Trường mật khẩu mới không được để trống' }),
  confirmPassword: z.string().nonempty({ message: 'Trường nhắc lại mật khẩu không được để trống' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Mật khẩu và nhắc lại mật khẩu không khớp',
  path: ['confirmPassword'],
});;


export const updateUserForm = z.object({
  name: z.string().nonempty({ message: 'Trường tên không được để trống' }),
  email: z.string().email({ message: 'Email không hợp lệ' }).nonempty({ message: 'Trường email không được để trống' }),
  birth_date: z.string().nonempty({ message: 'Trường ngày sinh không được để trống' }),
  gender: z.enum(["Male", "Female", "Other"]).refine((val:string) => val !== "", { message: 'Trường giới tính không được để trống' }),  
  avatar: z.string().nonempty({ message: 'Trường ảnh không được để trống' }),
});



export const changePhoneForm = z.object({
  phone: z
    .string()
    .nonempty({ message: 'Số điện thoại không được để trống' })
    .regex(/^\d+$/, { message: 'Số điện thoại phải là số' })
    .max(10, { message: 'Số điện thoại phải nhỏ hơn 10 ký tự' }) 
});

export type FormDataChangePassword=z.infer<typeof changePasswordForm>;
export type FormDataChangePhone=z.infer<typeof changePhoneForm>;
export type FormDataUpdateUser=z.infer<typeof updateUserForm>;



export const changePassword = async (data: any) => {
  try {
    const response = await handleApi(`auth/changePassword`, data, 'PATCH');
    return response.data;
  } catch (err: any) {
    throw err;;
  }
}
export const changePhone = async (data: any) => {
  try {
    const response = await handleApi(`auth/changePhone`, data, 'PATCH');
    return response.data;
  } catch (err: any) {
    throw err;;
  }
}


export const updateProfile = async (dataS: any) => {
  const { id, ...payload } = dataS; 
  try {
    const response = await handleApi(`auth/updateUser/${id}`, payload, 'PUT');
    return response.data;
  } catch (err: any) {
    throw err;;
  }
}

export const getProfile = async () => {
  try {
    const response = await handleApi(`auth/getUser`);
    return response.data;
  } catch (err: any) {
    throw err;;
  }
}



export const pushAddress = async (dataS: any) => {
  const { id, ...payload } = dataS; 
  try {
    const response = await handleApi(`auth/changePassword/${id}`, payload, 'PATCH');
    return response.data;
  } catch (err: any) {
    throw err;;
  }
}