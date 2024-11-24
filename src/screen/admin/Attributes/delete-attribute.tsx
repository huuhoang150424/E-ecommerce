import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteAttribute, TypePropsModal } from "./api";
import { LoadingSpinner } from "@/components/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";


export default function DeleteAttributeModal({ close, onClose, id }: TypePropsModal) {
  console.log(id)
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteAttribute,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['attribute'],
      });
      onClose(false);
    },
    onError: (err: any) => {
      console.log(err)
    }
  })
  const { isPending, data,isSuccess } = mutation;
  console.log(data)
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
          <DialogTitle className="text-textColor">Bán có chắc xóa thuộc tính này</DialogTitle>
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
