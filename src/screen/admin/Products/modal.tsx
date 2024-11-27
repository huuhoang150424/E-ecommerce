import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteProduct } from "./api";
import { LoadingSpinner } from "@/components/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
export interface TypePropsModal {
  close?: boolean;
  onClose?: any;
  id?:string;
}

export default function DeleteProductModal({ close, onClose, id }: TypePropsModal) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      onClose(false);
    },
    onError: (err: any) => {
      console.log(err)
    }
  })
  const { isPending, isSuccess,data } = mutation;

  useEffect(()=>{
    if (isSuccess) {
      toast({
        variant: 'success',
        title: data?.result?.message
      })
    }
  },[isSuccess])

  return (
    <Dialog open={close} onOpenChange={onClose} >
      <DialogContent className="max-w-[25%] ">
        <DialogHeader>
          <DialogTitle className="text-textColor">Bán có chắc xóa sản phẩm này</DialogTitle>
        </DialogHeader>
        {
          isPending ? (<LoadingSpinner
            className={'mx-auto mt-[20px]'}
          />) : (<Button onClick={()=>mutation.mutate(id ?? "")} className="bg-red-500 hover:bg-red-400 transition-all duration-300 ease-linear hover:opacity-80 mt-[20px] " type="submit">Xóa</Button>)
        }
      </DialogContent>
    </Dialog >
  )
}
