import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/common';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormDataResetPassword, resetPassword, resetPasswordSchema } from './api';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';

export default function ChangePasswordScreen() {
  const location=useLocation();
  const navigate=useNavigate()
  const email = location?.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgotPassword", { replace: true });
    }
  }, [ email, navigate])
  const { register, handleSubmit, formState: { errors } ,setValue} = useForm<FormDataResetPassword>({
    resolver: zodResolver(resetPasswordSchema)
  })
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {},
    onError: (err: any) => {
      console.log(err)
    }
  })
  const { isPending, data, isSuccess } = mutation;
  useEffect(() => {
    if (email) {
      setValue("email", email)
    }
  }, [email, setValue])
  const onSubmit = (dataS: FormDataResetPassword) => {
    console.log(dataS)
    mutation.mutate(dataS)
  };
  useEffect(() => {
    if (isSuccess) {
      console.log(data)
      toast({
        variant: "success",
        title: data.result.message
      })
      navigate("/");
    }
  }, [isSuccess])
  return (
    <Card className='w-[90%]  '>
      {
        isPending ? (<Loading className='mx-auto w-full flex justify-center  mt-[150px] ' />) : (<div>
          <CardHeader className='p-0 px-[24px] flex flex-row items-center gap-[15px] h-auto mt-[30px] '>
            <Link to={"/verifyCodeScreen"}><i className="fa-solid fa-chevron-left text-textColor text-[16px] "></i></Link>
            <span className='text-2xl text-textColor font-bold '>Đặt lại mật khẩu</span>
          </CardHeader>
          <CardContent className='flex flex-col mt-[10px] '>
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              method='POST' className='flex flex-col gap-[15px]'>
              <div className='flex flex-col gap-[5px]'>
                <div className='flex flex-col gap-[12px]'>
                  <Label className='font-[400] text-textColor' htmlFor='email'>Mật khẩu</Label>
                  <Input 
                  {...register('password')} 
                  id='password' type='password' placeholder='' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[10px] ' />
                </div>
                {errors.password && <p className="text-red-500 text-[12px] font-[500] ">{errors.password.message}</p>}
              </div>
              <div className='flex flex-col gap-[5px]'>
                <div className='flex flex-col gap-[12px]'>
                  <Label className='font-[400] text-textColor' htmlFor='email'>Xác nhận mật khẩu</Label>
                  <Input 
                  {...register('confirmPassword')} 
                  id='confirmPassword' type='password' placeholder='' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[10px] ' />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-[12px] font-[500] ">{errors.confirmPassword.message}</p>}
              </div>
              <Button  type='submit' variant={'primaryColor'} className='w-[25%] rounded-[30px] mt-[10px] ml-[350px] '>
                Đổi mật khẩu
              </Button>
            </form>
          </CardContent>
        </div>)
      }

    </Card>
  )
}





