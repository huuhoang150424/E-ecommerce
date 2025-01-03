import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { useState } from "react";
import { Loading } from "@/components/common";
import { Paginator, Tables } from "@/components/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { confirmOrder, destroyOrder, getAllOrder } from "./api";
import { toast } from "@/hooks/use-toast";



export default function OrderScreen() {
  const [sizePage, setSizePage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
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
      console.error(error?.response?.data?.error_message);
      toast({
        variant: 'destructive',
        title: error?.response?.data?.error_message,
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
      toast({
        variant: 'destructive',
        title: error?.response?.data?.error_message,
      });
    }
  })
  const { isPending: isLoadingDestroy } = mutationDestroyOrder;

  const handleSelectChange = (value: string, id: string) => {
    if (value === "confirm") {
      mutationConfirmOrder.mutate(id);
      console.log("Selected value confirm: ", id);
    }
    if (value === "destroy") {
      mutationDestroyOrder.mutate(id);
    }
  };

  return (
    <div className=''>
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Danh sách đơn hàng</h1>
      <div className="flex items-center mb-[15px] justify-between ">
        <div className="flex items-center gap-[15px] ">
          <Input
            className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]  "
            placeholder="tìm kiếm đơn hàng..."
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={'square'} variant={'outline'} className="px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400] ">Lọc</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>satnaing</p>
                  <p className='text-xs leading-none text-muted-foreground '>nguyenhoanghuu15042004@gm...</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Trang cá nhân</DropdownMenuItem>
                <DropdownMenuItem>Cài đặt</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
                          <span className="ml-[20px] "> {row.total_amount}</span>
                        </div>
                        <div className="flex-1 text-left">
                          <span className="ml-[20px] "> {row.user.name}</span>
                        </div>
                        <div className="flex-1 text-left">
                          <div className={`${row.status === 'NOT_CONFIRMED' ? 'bg-red-500' : 'bg-blue-400'} ml-[10px]   w-[100px] px-[6px] py-[1px]  flex items-center rounded-[6px] justify-center text-white `}>
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
                        <Select onValueChange={(value: string) => handleSelectChange(value, row.id)}>
                          <SelectTrigger isShowIcon={false} className="w-[100px] border-none shadow-none ">
                            <div className="w-full h-full flex items-center justify-center">
                              <i className="fa-solid fa-ellipsis text-textColor mr-[10px]"></i>
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem onClick={() => { console.log("hellow word") }} value="confirm">Xác nhận</SelectItem>
                            <SelectItem onClick={() => { console.log("hellow word") }} value="destroy">Hủy đơn</SelectItem>
                          </SelectContent>
                        </Select>
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
