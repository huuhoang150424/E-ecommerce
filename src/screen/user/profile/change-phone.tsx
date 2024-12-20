import { LoadingSpinner } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { changePhone,FormDataChangePhone, changePhoneForm } from "./api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface Props {
  close?: boolean;
  onClose?: any
}



export default function ChangePhone({ close, onClose }: Props) {
  const queryClient=useQueryClient();
  const {register,handleSubmit, reset, formState: { errors }} =useForm<FormDataChangePhone>({
    resolver: zodResolver(changePhoneForm)
  });
  const mutation = useMutation({
    mutationFn: changePhone,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['profile']})
      reset();
      onClose();
    },
    onError: (error: any) => {
      console.error('Tạo thất bại:', error);
    },
  })
  const { isPending, isSuccess, data,error ,isError} = mutation;

  const onSubmit = (dataS: FormDataChangePhone) => {
    mutation.mutate(dataS);
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
      toast({
        variant: 'success',
        title: data?.result?.message
      })
    }
    if (isError) {
      toast({
        variant: 'destructive',
        title: error.response.data.error_message
      })
    }
  }, [isSuccess,isError])

  return (
    <Dialog open={close} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader className="flex flex-row items-center gap-[15px] mt-0">
          <DialogTitle className="text-textColor ">Cập nhật số điện thoại</DialogTitle>
        </DialogHeader>
        {
          isPending ? (<LoadingSpinner className="mx-auto my-[50px] " />) : (<form
            onSubmit={handleSubmit(onSubmit)} 
            method="POST"
            className="grid gap-[12px] "
          >
            <div className="flex flex-col gap-[5px] ">
              <div className="flex items-center gap-4">
                <Label htmlFor="oldPassword" className="text-right text-textColor ">
                  Số điện thoại mới :
                </Label>
                <Input
                  id="oldPassword"
                  className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                  placeholder="Nhập số điện thoại mới..."
                  {...register('phone')}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-[12px] font-[500] ">{errors.phone.message}</p>}
            </div>
            <Button onClick={() => { }} className="mt-[15px]  bg-primaryColor transition-all duration-300 ease-linear hover:bg-primaryColor text-white w-full  hover:opacity-80" >Đổi</Button>
          </form>)
        }
      </DialogContent>
    </Dialog >
  )
}
