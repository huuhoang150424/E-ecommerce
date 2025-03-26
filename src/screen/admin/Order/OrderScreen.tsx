import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from "react";
import { Loading } from "@/components/common";
import { Paginator, Tables } from "@/components/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { confirmOrder, destroyOrder, getAllOrder } from "@/screen/admin/Order/api";
import { toast } from "@/hooks/use-toast";
import Modal from "@/screen/admin/Order/modal";



export default function OrderScreen() {
  const [closeDialog, setCloseDialog] = useState(false);
  const [sizePage, setSizePage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [idOrder, setIdOrder] = useState("");
  const queryClient = useQueryClient();
  //fetch order
  const { isLoading: loadingOrder, data: dataOrders } = useQuery({
    queryKey: ['allOrders', { currentPage: currentPage, pageSize: sizePage }],
    queryFn: ({ queryKey }: { queryKey: [string, { currentPage: number; pageSize: number }] }) => {
      const [_, { currentPage, pageSize }] = queryKey;
      return getAllOrder(currentPage, pageSize);
    }
  })

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }


  //confirm order
  const mutationConfirmOrder = useMutation({
    mutationFn: confirmOrder,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ['allOrders'],
      });
      console.log(data)
      toast({
        variant: 'success',
        title: data?.message,
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error?.response?.data?.error_message?.error_message ?? "Lỗi bất ngờ",
      });
    }
  })
  const { isPending: isLoadingConfirm } = mutationConfirmOrder;
  //destroy order
  const mutationDestroyOrder = useMutation({
    mutationFn: destroyOrder,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ['allOrders'],
      });
      toast({
        variant: 'success',
        title: data?.message,
      })
    },
    onError: (error: any) => {
      console.error(error?.response?.data?.error_message?.error_message);
      toast({
        variant: 'destructive',
        title: error?.response?.data?.error_message?.error_message ?? "Lỗi bất ngờ",
      });
    }
  })
  const { isPending: isLoadingDestroy } = mutationDestroyOrder;



  return (
    <div className=''>
      <Modal
        close={closeDialog}
        onClose={() => setCloseDialog(false)}
        id={idOrder}
      />
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Danh sách đơn hàng</h1>
      <div className="flex items-center mb-[15px] justify-between ">
        <Input
          className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]  "
          placeholder="tìm kiếm đơn hàng..."
        />
        <Select
          value={`${sizePage}`}
          onValueChange={(value) => {
            setSizePage(Number(value))
          }}
        >
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent side='top'>
            {[6, 12, 20, 30, 40].map((pageSize) => (
              <SelectItem className="text-textColor" key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="">
        {/* <NoResult/> */}
        <div className="">
          {
            (loadingOrder || isLoadingConfirm || isLoadingDestroy) ? (<Loading className="mt-[200px] mb-[40px] " />) : (
              <div className="">
                <Tables
                  className="mb-[30px] border border-gray-200 shadow-none"
                  data={dataOrders?.result?.data}
                  nameCol={["Địa chỉ nhận hàng", "Mã đơn hàng", "Tổng số tiền", "Người nhận", "Trạng thái"]}
                  renderRow={(row: any) => {
                    return (
                      <td className="w-full flex items-center py-[16px] ">
                        <div className="flex-1 text-left">
                          <span className="ml-[20px] "> {row.shipping_address}</span>
                        </div>
                        <div className="flex-1 text-left">
                          <span className="ml-[20px] "> {row.order_code}</span>
                        </div>
                        <div className="flex-1 text-left">
                          <span className=" ml-[20px]"> {row.total_amount}</span>
                        </div>
                        <div className="flex-1 text-left">
                          <span className="ml-[20px]  "> {row.user.name}</span>
                        </div>
                        <div className="flex-1 text-left">
                          <div className={`${row.status === 'NOT_CONFIRMED' ? 'bg-red-500' : 'bg-blue-400'}    w-[100px] px-[6px] py-[1px]  flex items-center rounded-[6px] justify-center text-white `}>
                            <span className="font-[500] text-[11px] ">{row.status}</span>
                          </div>
                        </div>
                      </td>
                    )
                  }}
                  isAction={false}
                  renderSelect={(row: any) => {
                    return (
                      <td className=" flex items-center justify-center ">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="px-[30px] ">
                              <i className="fa-solid fa-ellipsis text-textColor mr-[10px] cursor-pointer"></i>
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='w-[160px]  ' align='end' forceMount>
                            <DropdownMenuGroup>
                              <DropdownMenuItem onClick={() => mutationConfirmOrder.mutate(row.id)} className="flex justify-center">Xác nhận</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => mutationDestroyOrder.mutate(row.id)} className="flex justify-center">Hủy đơn</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { setCloseDialog(true); setIdOrder(row.id) }} className="flex justify-center">Xem lịch sử đơn hàng</DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    )
                  }}
                />
                <Paginator
                  currentPage={dataOrders?.result?.currentPage}
                  totalPage={dataOrders?.result?.totalPages}
                  onPageChange={handleChangePage}
                />
              </div>
            )
          }
        </div>
      </div>

    </div>
  )
}
