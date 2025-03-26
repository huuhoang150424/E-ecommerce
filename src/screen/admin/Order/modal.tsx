import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoadingSpinner } from '@/components/common';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from '@tanstack/react-query';
import { getListOrderChange } from './api';
import { format } from 'date-fns';

export interface TypePropsModal {
  close?: boolean;
  onClose?: any;
  id: string;
}



export default function Modal({ close, onClose, id }: TypePropsModal) {
  const { isLoading, data } = useQuery({
    queryKey: ['listOrderChange', { id: id }],
    queryFn: ({ queryKey }: { queryKey: [string, { id: string }] }) => {
      const [, { id }] = queryKey;
      return getListOrderChange(id)
    }
  });

  console.log(data)
  return (
    <Dialog open={close} onOpenChange={onClose} >
      <DialogContent className="max-w-[25%] px-[15px]">
        <DialogHeader>
          <DialogTitle className="text-textColor px-[10px] ">Lịch sử đơn hàng</DialogTitle>
        </DialogHeader>
        {
          isLoading ? (<LoadingSpinner
            className={'mx-auto mt-[20px]'}
          />) : (<ScrollArea className="h-[200px]">
            {
              data?.result?.data?.map((item:any, index:number) => {
                return (
                  <div key={index} className="flex items-center justify-between mt-[10px] px-[15px] ">
                    <div className="flex items-center gap-[10px] ">
                      <img src={item?.change_by?.avatar} alt="" className="object-cover w-[40px] h-[40px] rounded-[50%] " />
                      <div className="flex flex-col gap-[0px] ">
                        <h2 className="text-[15px] text-textColor ">{item?.change_by?.name}</h2>
                        <span className="text-primaryColor text-[14px] font-[500] ">{item?.status}</span>
                      </div>
                    </div>
                    <span className="text-[14px] text-gray-500 font-[400] ">
                    {format(new Date(item?.changed_at), 'dd-MM-yyyy')}
                    </span>
                  </div>
                )
              })
            }
          </ScrollArea>)
        }



      </DialogContent>
    </Dialog >
  )
}
