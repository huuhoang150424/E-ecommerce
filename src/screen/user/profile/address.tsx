import { LoadingSpinner } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { FormDataAddDress, addAddress, pushAddress } from "./api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface Props {
  close?: boolean;
  onClose?: any
}



export default function Address({ close, onClose }: Props) {
  const queryClient=useQueryClient();
  const {register,handleSubmit, reset, formState: { errors }} =useForm<FormDataAddDress>({
    resolver: zodResolver(addAddress)
  });
  const mutation = useMutation({
    mutationFn: pushAddress,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey:['profile']})
      reset();
      onClose();
      toast({
        variant: 'success',
        title: data?.result?.message
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.response.data.error_message
      })
    },
  })
  const { isPending} = mutation;

  const onSubmit = (dataS: FormDataAddDress) => {
    mutation.mutate(dataS);
  }


  return (
    <Dialog open={close} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader className="flex flex-row items-center gap-[15px] mt-0">
          <DialogTitle className="text-textColor ">Địa chỉ giao hàng</DialogTitle>
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
                  Thêm mới địa chỉ :
                </Label>
                <Input
                  id="oldPassword"
                  className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                  placeholder="Nhập địa chỉ mới..."
                  {...register('address')}
                />
              </div>
              {errors.address && <p className="text-red-500 text-[12px] font-[500] ">{errors.address.message}</p>}
            </div>
            <Button onClick={() => { }} className="mt-[15px]  bg-primaryColor transition-all duration-300 ease-linear hover:bg-primaryColor text-white w-full  hover:opacity-80" >Thêm địa chỉ</Button>
          </form>)
        }
      </DialogContent>
    </Dialog >
  )
}
