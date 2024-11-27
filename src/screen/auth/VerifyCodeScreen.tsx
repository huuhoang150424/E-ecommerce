import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/common';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp";
import { CountdownTimer } from '@/components/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDataVerifyCode, verifyCode, verifyCodeSchema } from './api';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';


const isoToSeconds = (isoTime: string): number => {
  const targetDate: Date = new Date(isoTime);
  const currentDate: Date = new Date();

  return Math.max(Math.floor((targetDate.getTime() - currentDate.getTime()) / 1000), 0);
};



export default function VerifyCodeScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const isoTime = location?.state?.expiration;
  const email = location?.state?.email;

  useEffect(() => {
    if (!isoTime || !email) {
      navigate("/forgotPassword", { replace: true });
    }
  }, [isoTime, email, navigate])


  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormDataVerifyCode>({
    resolver: zodResolver(verifyCodeSchema)
  })
  const mutation = useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {

    },
    onError: (err: any) => {
      console.log(err)
    }
  })
  const { isPending, data, isSuccess, error } = mutation;

  const secondsLeft = isoToSeconds(isoTime);
  useEffect(() => {
    if (email) {
      setValue("email", email)
    }
  }, [email, setValue])
  const onSubmit = (dataS: FormDataVerifyCode) => {
    console.log(dataS)
    mutation.mutate(dataS)
  };
  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: "success",
        title: data.result.message
      })
      navigate("/changePassword", {
        state: {
          email: email
        } as any, 
      });
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error.response.data.error_message.non_field_errors[0]
      })
    }
  }, [isSuccess, error])

  return (
    <Card className='w-[90%]  '>
      {
        isPending ? (<Loading className='mx-auto w-full flex justify-center  mt-[150px] ' />) : (<div>
          <CardHeader className='p-0 px-[24px] flex flex-row items-center gap-[15px] h-auto mt-[30px] '>
            <Link to={"/forgotPassword"}><i className="fa-solid fa-chevron-left text-textColor text-[16px] "></i></Link>
            <span className='text-2xl text-textColor font-bold '>Nhập mã xác thực</span>
          </CardHeader>
          <CardContent className='flex flex-col mt-[5px] '>
            <CountdownTimer
              time={secondsLeft}
            />
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className="flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[5px]">
                <Label className="text-[14px] font-[400] text-gray-500">
                  Một mã xác thực gồm 4 chữ số đã được gửi về <strong>{email}</strong> của bạn
                </Label>
                {
                  secondsLeft <= 0 ? (
                    <div className='flex justify-center '>
                      <span className='text-[14px] font-[500] cursor-pointer text-primaryColor '>Gửi lại</span>
                    </div>
                  ) : (null)
                }
                <InputOTP
                  onChange={(value: string) => setValue("otp_code", value)}
                  maxLength={4}
                  containerClassName="justify-around"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-[50px] h-[50px] text-[20px] text-gray-500 font-[500] ring-primaryColor" />
                    <InputOTPSlot index={1} className="w-[50px] h-[50px] text-[20px] text-gray-500 font-[500] ring-primaryColor" />
                    <InputOTPSlot index={2} className="w-[50px] h-[50px] text-[20px] text-gray-500 font-[500] ring-primaryColor" />
                    <InputOTPSlot index={3} className="w-[50px] h-[50px] text-[20px] text-gray-500 font-[500] ring-primaryColor" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button type="submit" variant="primaryColor" className="w-[20%] rounded-[30px] mt-[10px] ml-[370px]">
                Gửi
              </Button>
            </form>

          </CardContent>
        </div>)
      }
    </Card >
  )
}



