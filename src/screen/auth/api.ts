import { handleApi } from "@/service";
import {z} from "zod"

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(1, { message: 'Mật khẩu tối thiểu 6 ký tự' })
})
export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu tối thiểu 6 ký tự' }),
  confirmPassword: z.string().min(6, { message: 'Nhắc lại mật khẩu không được để trống' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu và nhắc lại mật khẩu không khớp',
  path: ['confirmPassword'],
});
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' })
});
export const verifyCodeSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  otp_code: z
    .string()
    .length(4, "Mã OTP phải có đúng 4 chữ số")
    .regex(/^\d+$/, "Mã OTP chỉ được chứa chữ số"),
});
export const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu tối thiểu 6 ký tự' }),
  confirmPassword: z.string().min(6, { message: 'Nhắc lại mật khẩu không được để trống' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu và nhắc lại mật khẩu không khớp',
  path: ['confirmPassword'],
});

export type FormDataRegister = z.infer<typeof registerSchema>;
export type FormDataForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type FormDataVerifyCode = z.infer<typeof verifyCodeSchema>;
export type FormDataResetPassword = z.infer<typeof resetPasswordSchema>;

export const signUp=async(dataS:FormDataRegister)=>{
  const response=await handleApi('/auth/register',dataS,'POST')
  return response.data
}
export const forgotPassword=async(dataS:FormDataForgotPassword)=>{
  const response=await handleApi('/auth/forgotPassword',dataS,'POST')
  return response.data
}
export const verifyCode=async(dataS:FormDataVerifyCode)=>{
  const response=await handleApi('/auth/verifyCode',dataS,'POST')
  return response.data
}
export const resetPassword=async(dataS:FormDataResetPassword)=>{
  const response=await handleApi('/auth/resetPassword',dataS,'PATCH')
  return response.data
}