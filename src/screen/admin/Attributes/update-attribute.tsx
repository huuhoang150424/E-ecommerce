import { LoadingSpinner } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {  FormData, TypePropsModal, updateAttribute } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";



export default function UpdateAttributeModal({close,onClose,attribute}:TypePropsModal) {
  const queryClient=useQueryClient();
  //POST attribute
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      attribute_name: attribute.attribute_name
    }
  });
  const mutation = useMutation({
    mutationFn: updateAttribute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attribute'] });
      onClose(false);
      reset();
    },
    onError: (error: any) => {
      console.error('Tạo thất bại:', error);
    },
  })
  const { isPending, isSuccess, data } = mutation;

  const onSubmit = (dataS: FormData) => {
    mutation.mutate({...dataS,id: attribute.id})
  }
  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: 'success',
        title: data?.result?.message
      })
    }
  }, [isSuccess])
  return (
    <Dialog open={close} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle className="text-textColor">Chỉnh sửa thuộc tính</DialogTitle>
        </DialogHeader>
        {
          isPending ? (<LoadingSpinner className='my-[50px] mx-auto ' />) : (<form onSubmit={handleSubmit(onSubmit)} method="POST" className="grid gap-8 py-4">
            <div className="flex flex-col gap-[5px] ">
              <div className="flex items-center gap-4">
                <Label htmlFor="attribute_name" className="text-right text-textColor">
                  Tên thuộc tính :
                </Label>
                <Input
                  id="attribute_name"
                  className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                  placeholder="Tên thuộc tính..."
                  {...register('attribute_name')}
                />
              </div>
              {errors.attribute_name && <p className="text-red-500 text-[12px] font-[500] ">{errors.attribute_name.message}</p>}
            </div>
            <Button className="bg-primaryColor hover:bg-primaryColor transition-all duration-300 ease-linear hover:opacity-80" type="submit">Sửa</Button>
          </form>)
        }
      </DialogContent>
    </Dialog >
  )
}
