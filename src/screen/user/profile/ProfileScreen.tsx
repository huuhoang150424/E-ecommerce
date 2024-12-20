import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { selectUser } from '@/redux/authReducer';
import { useSelector } from 'react-redux';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Modal from './modal';
import { useQuery } from '@tanstack/react-query';
import { FormDataUpdateUser, getProfile } from './api';
import { Loading, LoadingSpinner } from '@/components/common';
import { handleUpload } from '@/utils/upLoadImage';
import { useForm } from 'react-hook-form';

export default function ProfileScreen() {
  const [openModal,setOpenModal]=useState(false);
  const [loadingUploadAvatar,setLoadingUploadAvatar]=useState(false);
  const [typeModal,setTypeModal]=useState("change-password");


  const {data:dataProfile,isLoading}=useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  })
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [urlAvatar, setUrlAvatar] = useState("");
  useEffect(() => {
    if (dataProfile) {
      setDate(new Date(dataProfile.result.data.birth_date));
      setUrlAvatar(dataProfile.result.data.avatar);
    }
  }, [dataProfile]);

  const handleUploadImage = async (image: any) => {
    setLoadingUploadAvatar(true);
    try {
      const { imageUrl } = await handleUpload(image);
      setUrlAvatar(imageUrl || "");
      //setValue("avatar", imageUrl || "");
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoadingUploadAvatar(false);
    }
  };

  //update profile
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormDataUpdateUser>({
    defaultValues: {
      // name: user.name,
      // email: user.email,
      // gender: user.gender,
      // isAdmin: user.isAdmin,
      // avatar: user.avatar
    }
  });

  //add address

  return (
    <div className="border border-gray-200 rounded-[4px] overflow-hidden p-[20px] flex justify-between">
      <Modal
        closeDialog={openModal}
        type={typeModal}
        onCloseDialog={()=>setOpenModal(false)}
      />
      <div className="w-[60%] ">
        <h2 className="text-[16px] leading-[24px] font-[400] text-textColor">Thông tin tài khoản</h2>
        {
          isLoading ? (<Loading className='mx-auto my-[120px] ' />) : (<form className="mt-[15px] flex flex-col gap-[20px]   ">
            <div className="flex items-center gap-[40px] w-full">
              <div className="relative flex items-center justify-center w-[100px] h-[100px] border border-gray-200 rounded-[50%] ">
                {
                  loadingUploadAvatar ? (<LoadingSpinner />) : (<img
                    className="object-cover rounded-[50%] w-full h-full"
                    alt=""
                    src={urlAvatar}
                  />)
                }
                  <input onChange={(e: any) => handleUploadImage(e.target.files[0])} type="file" id="uploadFile1" className="hidden" />
                  <label htmlFor="uploadFile1" className="bg-gray-100 cursor-pointer  absolute flex items-center justify-center p-[6px] border border-gray-200 rounded-[50%] right-[0] top-[74%] z-10"><i className="fa-solid fa-pen text-[12px] text-textColor "></i></label>
              </div>

              <ul className="flex flex-col gap-[15px] w-[70%] ">
                <li className="flex items-center gap-[30px] ">
                  <Label htmlFor='name' className="text-[16px] leading-[24px] font-[400] text-textColor ">Họ và tên: </Label>
                  <Input
                    className='px-[12px] py-[8px] outline-none text-textColor w-[70%] '
                    name='name'
                    id='name'
                    value={dataProfile?.result?.data?.name}
                    onChange={() => { }}
                    placeholder='Enter name....'
                  />
                </li>
                <li className="flex items-center gap-[30px] ">
                  <Label htmlFor='email' className="text-[16px] leading-[24px] font-[400] text-textColor ">Email: </Label>
                  <Input
                    className='px-[12px] py-[8px] outline-none text-textColor w-[70%] '
                    name='email'
                    id='email'
                    value={dataProfile?.result?.data?.email}
                    onChange={() => { }}
                    placeholder='Enter email....'
                  />
                </li>
              </ul>
            </div>
            <ul className="flex flex-col gap-[20px] ">
              <li className="flex items-center gap-[20px] ">
                <Label htmlFor='date' className="text-[16px] leading-[24px] font-[400] text-textColor ">Ngày sinh: </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <i className="fa-solid fa-calendar-days text-textColor"></i>
                      {date ? format(date, "PPP", { locale: vi }) : <span className='text-textColor'>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </li>
              <li className="flex items-center gap-[20px] ">
                <Label htmlFor='date' className="text-[16px] leading-[24px] font-[400] text-textColor ">Giới tính: </Label>
                <RadioGroup defaultValue={dataProfile?.result?.data?.gender} className="flex flex gap-[20px] ">
                  <div className="flex items-center gap-[15px] ">
                    <RadioGroupItem value="Female" id="r2" className="text-primaryColor" />
                    <Label className="text-[15px] text-textColor cursor-pointer " htmlFor="r2">Nam</Label>
                  </div>
                  <div className="flex items-center gap-[15px]">
                    <RadioGroupItem value="Male" id="r3" className="text-primaryColor" />
                    <Label className="text-[15px] text-textColor cursor-pointer " htmlFor="r3">Nữ</Label>
                  </div>
                  <div className="flex items-center gap-[15px]">
                    <RadioGroupItem value="Other" id="r4" className="text-primaryColor" />
                    <Label className="text-[15px] text-textColor cursor-pointer " htmlFor="r4">Khác</Label>
                  </div>
                </RadioGroup>
              </li>
            </ul>
            <Button className='ml-auto   bg-primaryColor hover:bg-primaryColor hover:opacity-80'>Lưu thay đổi</Button>


          </form>)
        }


        <div className="w-full h-[0.5px] bg-gray-200 my-[20px] "></div>
        <div className="flex flex-col gap-[20px]">
          {
            dataProfile?.result?.data?.address?.length === 0 ? (<div className="flex flex-col items-center justify-center gap-[10px] mt-[10px] ">
              <img
                src="https://www.shutterstock.com/image-vector/set-home-location-address-concept-600nw-2160252327.jpg"
                alt=""
                className="object-cover w-[100px] "
              />
              <h3 className="text-textColor text-[16px] font-[500]">Chưa có địa chỉ</h3>
            </div>) : (<ul className="flex flex-col gap-[20px]">
              {
                dataProfile?.result?.data?.address?.map((item: any, index: number) => {
                  return (
                    <li key={index} className="">
                      <RadioGroup defaultValue="check" className="flex items-center gap-[20px] ">
                        <RadioGroupItem value="female" id="r2" className="text-primaryColor" />
                        <div className="w-full flex flex-col gap-[6px] px-[12px] py-[10px] border-[2px] border-gray-200 border-dashed rounded-[6px]">
                          <div className="flex items-center justify-between ">
                            <div className="flex items-center gap-[15px]">
                              <h3 className="text-[15px] text-textColor ">{dataProfile?.result?.data?.name}</h3>
                              <div className="flex items-center gap-[5px] ">
                                <i className="fa-regular fa-circle-check text-[14px] text-green-500 mt-[2px] "></i>
                                <span className="text-[14px] font-[500] text-green-500 ">Địa chỉ mặc định</span>
                              </div>
                            </div>
                            <i className="fa-solid fa-ellipsis text-textColor mr-[10px] cursor-pointer "></i>
                          </div>
                          <div className="flex items-center gap-[15px]">
                            <h3 className="text-[15px] text-textColor">Địa chỉ: </h3>
                            <span className="text-[14px] ">{item}</span>
                          </div>
                        </div>
                      </RadioGroup>
                    </li>
                  )
                })
              }
            </ul>)
          }


          <Button variant={'outline'} className='ml-auto text-primaryColor  border-primaryColor hover:opacity-80'>Thêm mới địa chỉ</Button>
        </div>
      </div>
      <div className="h-[400px] w-[1px] bg-gray-200 "></div>
      <div className="w-[35%] ">
        <h2 className="text-[16px] leading-[24px] font-[400] text-textColor">Số điên thoai và email</h2>
        <ul className="flex flex-col gap-[15px] mt-[15px] ">
          <li className="w-full flex items-center justify-between ">
            <div className="flex gap-[10px] ">
              <i className="fa-solid fa-phone text-[14px] text-textColor mt-[5px]"></i>
              <div className="flex flex-col ">
                <h3 className="text-[15px] text-gray-500 ">Số điện thoại: </h3>
                <span className="text-[14px] text-gray-400">{dataProfile?.result?.data?.phone}</span>
            </div>
            </div>
            <Button 
              variant={'outline'} 
              onClick={()=>{
                setTypeModal('change-phone')
                setOpenModal(true)
              }} 
              className='text-primaryColor border-[1.5px] border-primaryColor '
            >
              Thay đổi
            </Button>
          </li>
        </ul>
        <div className="w-full h-[1px] bg-gray-200 my-[15px] "></div>
        <h2 className="text-[16px] leading-[24px] font-[400] text-textColor">Bảo mật</h2>
        <ul className="flex flex-col gap-[15px] mt-[15px] ">
          <li className="w-full flex items-center justify-between ">
            <div className="flex gap-[10px] ">
              <i className="fa-solid fa-lock text-[14px] text-textColor mt-[3px]"></i>
              <h3 className="text-[15px] text-gray-500 ">Đổi mật khẩu: </h3>
            </div>
            <Button 
              variant={'outline'} 
              onClick={()=>{
                setOpenModal(true);
                setTypeModal("change-password");
              }} 
              className='text-primaryColor border-[1.5px] border-primaryColor '
            >Thay đổi</Button>
          </li>
          <li className="w-full flex items-center justify-between ">
            <div className="flex gap-[10px] ">
              <i className="fa-solid fa-circle-check text-[14px] text-textColor mt-[5px]"></i>
              <h3 className="text-[15px] text-gray-500 ">Xác thực 2 bước: </h3>
            </div>
            <Button variant={'outline'} onClick={()=>{}} className='text-primaryColor border-[1.5px] border-primaryColor '>Thiết lập</Button>
          </li>
        </ul>
        {/* <h2 className="text-[16px] leading-[24px] font-[400] text-textColor mt-[15px] "  >Thêm địa chỉ nhận hàng</h2> */}
      </div>
    </div>
  )
}
