import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  close?: boolean;
  onClose?: ()=>void;
  message?: string
}



export default function Modal({close,onClose,message}:Props) {



  return (
    <Dialog open={close} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader className="flex flex-row items-center gap-[15px] mt-0">
          <i className="fa-solid fa-triangle-exclamation text-yellow-500 text-[20px] "></i>
          <DialogTitle className="text-textColor ">Thông báo</DialogTitle>
        </DialogHeader>
        <p className="text-[17px] text-textColor ">{message}</p>
        <Button className="bg-primaryColor transition-all duration-300 ease-linear hover:bg-primaryColor text-white w-full  hover:opacity-80" onClick={onClose}>Thoát</Button>
      </DialogContent>
    </Dialog >
  )
}
