import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteUser, TypePropsModal } from "./api";
import { LoadingSpinner } from "@/components/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function DeleteUserModal({ close, onClose, id }: TypePropsModal) {

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      onClose(false);
    },
    onError: (err: any) => {
      console.log(err)
    }
  })
  const { isPending } = mutation;

  return (
    <Dialog open={close} onOpenChange={onClose} >
      <DialogContent className="max-w-[25%] ">
        <DialogHeader>
          <DialogTitle className="text-textColor">Bán có chắc xóa người dùng này</DialogTitle>
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
