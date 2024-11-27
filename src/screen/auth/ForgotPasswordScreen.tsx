import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/common';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPassword, forgotPasswordSchema, FormDataForgotPassword } from './api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface VerifyCodeState {
  expiration: Date
}


export default function ForgotPasswordScreen() {
  const navigate=useNavigate()
  const {register,handleSubmit,formState :{errors}}=useForm<FormDataForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const mutation=useMutation({
    mutationFn: forgotPassword,
    onSuccess: ()=>{

    },
    onError: (err)=>{
      console.log(err)
    }
  })
  const {isPending,data,isSuccess}=mutation;
  console.log(data)

  useEffect(()=>{
    if (isSuccess) {
      toast({
        title: data.result.message,
        variant: 'success'
      })
      navigate("/verifyCode", {
        state: {
          expiration: data.result.data.expiration,
          email: data.result.data.email
        } as any, 
      });
    }
  },[isSuccess])

  const onSubmit = (dataS: FormDataForgotPassword) => {
    mutation.mutate(dataS); 
  };

  return (
    <Card className='w-[90%]  '>
      {
        isPending ? (<Loading className='mx-auto w-full flex justify-center  mt-[150px] ' />) : (<div>
          <CardHeader className='p-0 px-[24px] flex flex-row items-center gap-[15px] h-auto mt-[30px] '>
            <Link to={"/"}><i className="fa-solid fa-chevron-left text-textColor text-[16px] "></i></Link>
            <span className='text-2xl text-textColor font-bold '>Nhập email của bạn</span>
          </CardHeader>
          <CardContent className='flex flex-col mt-[10px] '>
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              method='POST' className='flex flex-col gap-[15px]'>
              <div className='flex flex-col gap-[5px]'>
                <div className='flex flex-col gap-[12px]'>
                  <Label className='font-[400] text-textColor' htmlFor='email'>Email</Label>
                  <Input 
                  {...register('email')} 
                  id='email' type='email' placeholder='' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[10px] ' />
                </div>
                {errors.email && <p className="text-red-500 text-[12px] font-[500] ">{errors.email.message}</p>}
              </div>
              <Button type='submit' variant={'primaryColor'} className='w-[20%] rounded-[30px] mt-[10px] ml-[370px] '>
                Gửi
              </Button>
            </form>
          </CardContent>
        </div>)
      }

    </Card>
  )
}
