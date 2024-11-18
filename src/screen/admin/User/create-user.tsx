import { LoadingSpinner } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUser, FormData, TypePropsModal, uploadUser } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { handleUpload } from "@/utils/upLoadImage";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";


export default function CreateUserModal({ close, onClose }: TypePropsModal) {
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient()
  //POST user
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(uploadUser)
  });
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      onClose(false);
      reset();
      setImgUrl("");
    },
    onError: (error: any) => {
      console.error('Tạo thất bại:', error);
    },
  })
  const { isPending, isSuccess, data: mutationData } = mutation;
  const handleUploadImage = async (image: any) => {
    setLoading(true);
    try {
      const { imageUrl } = await handleUpload(image);
      setImgUrl(imageUrl || "");
      setValue("avatar", imageUrl || "");
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = (dataS: FormData) => {
    console.log(dataS)
    mutation.mutate(dataS)
  }
  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: 'success',
        title: mutationData?.result?.message
      })
    }
  }, [isSuccess])
  return (
    <Dialog open={close} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle className="text-textColor">Thêm người dùng</DialogTitle>
        </DialogHeader>
        {
          isPending ? (<LoadingSpinner className='my-[70px] mx-auto ' />) : (
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className="grid gap-4 py-4">
              <div className="flex flex-col gap-[5px] ">
                <div className="flex items-center gap-4">
                  <Label htmlFor="name" className="text-right text-textColor ">
                    Tên người dùng :
                  </Label>
                  <Input
                    id="name"
                    className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                    placeholder="Tên người dùng"
                    {...register('name')}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-[12px] font-[500] ">{errors.name.message}</p>}
              </div>
              <div className="flex flex-col gap-[5px] ">
                <div className="flex items-center gap-4">
                  <Label htmlFor="email" className="text-right text-textColor ">
                    Email :
                  </Label>
                  <Input
                    id="email"
                    className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                    placeholder="Email"
                    {...register('email')}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[12px] font-[500] ">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col gap-[5px] ">
                <div className="flex items-center gap-4">
                  <Label htmlFor="password" className="text-right text-textColor ">
                    Mật khẩu :
                  </Label>
                  <Input
                    id="password"
                    className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                    placeholder="mật khẩu..."
                    {...register('password')}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-[12px] font-[500] ">{errors.password.message}</p>}
              </div>
              <div className="flex flex-col gap-[5px] ">
                <div className="flex items-center gap-4">
                  <Label htmlFor="gender" className="text-right text-textColor ">
                    Giới tính :
                  </Label>
                  <Select onValueChange={(value: "Male" | "Female" | "Other") => setValue("gender", value)}>
                    <SelectTrigger className="text-textColor w-[180px]" >
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent className="text-textColor">
                      <SelectGroup>
                        <SelectLabel>Giới tính</SelectLabel>
                        <SelectItem value="Male">Nam</SelectItem>
                        <SelectItem value="Female">Nữ</SelectItem>
                        <SelectItem value="Other">Khác</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {errors.gender && <p className="text-red-500 text-[12px] font-[500] ">{errors.gender.message}</p>}
              </div>
              <div className="flex flex-col gap-[5px] ">
                <div className="flex items-center gap-4">
                  <Label htmlFor="isAdmin" className="text-right text-textColor ">
                    Quyền :
                  </Label>
                  <Select
                    onValueChange={(value: string) => {
                      setValue("isAdmin", value === "true");
                    }}
                  >
                    <SelectTrigger className="w-[180px] text-textColor">
                      <SelectValue placeholder="Chọn loại tài khoản" />
                    </SelectTrigger>
                    <SelectContent className="text-textColor">
                      <SelectGroup>
                        <SelectLabel>Quyền</SelectLabel>
                        <SelectItem value="True">Quản trị</SelectItem>
                        <SelectItem value="False">Người dùng</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {errors.isAdmin && <p className="text-red-500 text-[12px] font-[500] ">{errors.isAdmin.message}</p>}
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-[5px] ">
                  <Label htmlFor="username" className="text-left text-textColor ">Ảnh đại diện: </Label>
                  {errors.avatar && <p className="text-red-500 text-[12px] font-[500] ">{errors.avatar.message}</p>}
                </div>
                <label htmlFor="uploadFile1" className="bg-white text-gray-500 font-semibold text-base rounded max-w-md px-[30px] py-[10px] flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]">
                  {
                    loading ? (<LoadingSpinner className='my-[20px] ' />) : (<div className="">
                      {
                        imgUrl ? (<img
                          src={imgUrl}
                          className="w-full object-cover h-[200px] "
                          alt="Ảnh danh mục"
                        />) : (<div className="w-full flex flex-col items-center justify-center  ">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                            <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" data-original="#000000" />
                            <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" data-original="#000000" />
                          </svg>
                          Upload Image
                        </div>)
                      }
                    </div>)
                  }
                  <input onChange={(e: any) => handleUploadImage(e.target.files[0])} type="file" id="uploadFile1" className="hidden" />
                </label>
              </div>
              <Button className="bg-primaryColor hover:bg-primaryColor transition-all duration-300 ease-linear hover:opacity-80" type="submit">Lưu</Button>
            </form>)
        }
      </DialogContent>
    </Dialog >
  )
}
