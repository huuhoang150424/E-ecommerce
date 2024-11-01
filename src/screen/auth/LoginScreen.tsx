import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from '@/redux/authReducer';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Loading } from '@/components/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAuth } from '@/redux/action/auth';
import { AppDispatch } from '@/redux/store';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(1, { message: 'Mật khẩu tối thiểu 6 ký tự' })
})

type FormData = z.infer<typeof loginSchema>

export default function LoginScreen() {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (dataS: FormData) => {
    dispatch(loginAuth(dataS))
  }
  return (
    <Card className='w-[90%]  '>
      {
        loading ? (<Loading className='mx-auto w-full flex justify-center  mt-[150px] ' />) : (<div>
          <CardHeader className=''>
            <CardTitle className='text-2xl text-textColor font-bold'>Đăng nhập</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-[300px]'>
            <form onSubmit={handleSubmit(onSubmit)} method='POST' className='flex flex-col gap-[15px]'>
              <div className='flex flex-col gap-[5px]'>
                <div className='flex flex-col gap-[12px]'>
                  <Label className='font-[400] text-textColor' htmlFor='email'>Email</Label>
                  <Input {...register('email')} id='email' type='email' placeholder='' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[10px] ' />
                </div>
                {errors.email && <p className="text-red-500 text-[12px] font-[500] ">{errors.email.message}</p>}
              </div>
              <div className='flex flex-col gap-[5px]'>
                <div className='flex flex-col gap-[12px]'>
                  <Label className='font-[400] ' htmlFor='password'>Password</Label>
                  <Input {...register('password')} id='password' type='password' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[10px] ' />
                </div>
                {errors.password && <p className="text-red-500 text-[12px] font-[500] ">{errors.password.message}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-[400] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <Button type='submit' variant={'primaryColor'} className='w-[30%] rounded-[30px] mt-[30px] ml-[310px] '>
                Đăng nhập
              </Button>
            </form>
          </CardContent>
        </div>)
      }

    </Card>
  );
}
