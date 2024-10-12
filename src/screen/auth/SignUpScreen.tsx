import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



export default function SignUpScreen() {
  return (
    <Card className='w-[90%]  '>
      <CardHeader className=''>
        <CardTitle className='text-2xl text-textColor font-bold'>Đăng ký</CardTitle>
        {/* <CardDescription className='text-textColor '>Enter your email and password to login to your account</CardDescription> */}
      </CardHeader>
      <CardContent className='flex flex-col gap-[300px]'>
        <div className='flex flex-col gap-[15px]'>
          <div className='space-y-2'>
            <Label className='font-[400] ' htmlFor='password'>Tên người dùng</Label>
            <Input id='password' type='password' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[20px] ' required />
          </div>
          <div className='space-y-2'>
            <Label className='font-[400] text-textColor' htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[20px] ' required />
          </div>
          <div className='space-y-2'>
            <Label className='font-[400] ' htmlFor='password'>Mật Khẩu</Label>
            <Input id='password' type='password' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[20px] ' required />
          </div>
          <div className='space-y-2'>
            <Label className='font-[400] ' htmlFor='password'>Nhắc lại mật khẩu</Label>
            <Input id='password' type='password' className='rounded-[30px] border border-primaryColor outline-none px-[16px] py-[20px] ' required />
          </div>
          <Button type='submit' variant={'primaryColor'} className='w-[30%] rounded-[30px] mt-[30px] ml-[310px] '>
            Đăng ký
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
