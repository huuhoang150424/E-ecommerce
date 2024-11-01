import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loading } from '@/components/common';
import { handleApi } from '@/service';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu tối thiểu 6 ký tự' }),
  confirmPassword: z.string().min(6, { message: 'Nhắc lại mật khẩu không được để trống' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu và nhắc lại mật khẩu không khớp',
  path: ['confirmPassword'],
});
type FormData = z.infer<typeof registerSchema>;

//sign up
const signUp=async(dataS:FormData)=>{
  const {data}=await handleApi('/auth/register',dataS,'POST')
  return data
}

export default function SignUpScreen() {
  const navigate=useNavigate()
  const queryClient=useQueryClient()
  const {toast}=useToast()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(registerSchema)
  })

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']});
    },
    onError: (error: any) => {
      console.error('Đăng ký thất bại:', error);
    },
  });
  const {isPending,data,isSuccess}=mutation
  const onSubmit = (dataS: FormData) => {
    mutation.mutate(dataS); 
  };
  useEffect(()=>{
    if (isSuccess) {
      toast({
        title: data.message,
        variant: 'success'
      });
      navigate("/");
    }
  },[isSuccess])

  return (
    <div className='w-[90%]  '>
      {
        isPending ? (<Loading className='mx-auto w-full flex justify-center  mt-[150px] ' />) : (<Card>
          <CardHeader className=''>
            <CardTitle className='text-2xl text-textColor font-bold'>Đăng ký</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-[300px]'>
            <form onSubmit={handleSubmit(onSubmit)} method='POST' className='flex flex-col gap-[10px]'>
              <div className='flex flex-col gap-[5px] '>
                <div className='flex flex-col gap-[12px] '>
                  <Label className='font-[400] ' htmlFor='name'>Tên người dùng</Label>
                  <Input {...register('name')} id='name' type='text' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[10px] ' />
                </div>
                {errors.name && <p className="text-red-500 text-[12px] font-[500] ">{errors.name.message}</p>}
              </div>
              <div className='flex flex-col gap-[5px] '>
                <div className='flex flex-col gap-[12px] '>
                  <Label className='font-[400] text-textColor' htmlFor='email'>Email</Label>
                  <Input {...register('email')} id='email' type='email' placeholder='' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[10px] ' />
                </div>
                {errors.email && <p className="text-red-500 text-[12px] font-[500] ">{errors.email.message}</p>}
              </div>
              <div className='flex flex-col gap-[5px] '>
                <div className='flex flex-col gap-[12px] '>
                  <Label className='font-[400] ' htmlFor='password'>Mật Khẩu</Label>
                  <Input {...register('password')} id='password' type='password' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[10px] ' />
                </div>
                {errors.password && <p className="text-red-500 text-[12px] font-[500] ">{errors.password.message}</p>}
              </div>
              <div className='flex flex-col gap-[5px] '>
                <div className='flex flex-col gap-[12px] '>
                  <Label className='font-[400] ' htmlFor='confirmPassword'>Nhắc lại mật khẩu</Label>
                  <Input {...register('confirmPassword')} id='confirmPassword' type='password' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[10px] ' />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-[12px] font-[500] ">{errors.confirmPassword.message}</p>}
              </div>
              <Button type='submit' variant={'primaryColor'} className='w-[30%] rounded-[30px] mt-[30px] ml-[310px] hover:opacity-85 transition-all duration-300 ease-linear'>
                Đăng ký
              </Button>
            </form>
          </CardContent>
        </Card>)
      }
    </div>
  );
}
