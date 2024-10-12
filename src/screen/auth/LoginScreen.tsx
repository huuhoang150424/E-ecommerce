/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1ADs2FRNaQg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch } from 'react-redux';
import { testAuth } from '@/redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  return (
    <Card className='w-[90%]  '>
      <CardHeader className=''>
        <CardTitle className='text-2xl text-textColor font-bold'>Đăng nhập</CardTitle>
        {/* <CardDescription className='text-textColor '>Enter your email and password to login to your account</CardDescription> */}
      </CardHeader>
      <CardContent className='flex flex-col gap-[300px]'>
        <div className='flex flex-col gap-[15px]'>
          <div className='space-y-2'>
            <Label className='font-[400] text-textColor' htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[20px] ' required />
          </div>
          <div className='space-y-2'>
            <Label className='font-[400] ' htmlFor='password'>Password</Label>
            <Input id='password' type='password' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[20px] ' required />
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
          <Button onClick={()=>{dispatch(testAuth()); navigate("/home")}} type='submit' variant={'primaryColor'} className='w-[30%] rounded-[30px] mt-[30px] ml-[310px] '>
            Đăng nhập
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
