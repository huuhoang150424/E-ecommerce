import { Paginator, Tables } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { Loading } from "@/components/common";
import { getAllCat } from "./api";
import Modal from "./modal";
import NoResult from "@/components/admin/NoResult";
export default function CategoryScreen() {
  const [typeModal, setTypeModal] = useState('create');
  const [closeDialog, setCloseDialog] = useState(false);
  const [category, setCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const size=6 
  //FETCH category
  const { isLoading, data, error } = useQuery({
    queryKey: ['category',{ currentPage: currentPage, pageSize: size }],
    queryFn: ({ queryKey }: { queryKey: [string, { currentPage: number; pageSize: number }] }) => {
      const [, { currentPage, pageSize }] = queryKey; // Lấy tham số từ queryKey
      return getAllCat(currentPage, pageSize);
    },
  });
  const handleDeleteCat = (category: any) => {
    setTypeModal('delete');
    setCloseDialog(true);
    setCategory(category);
  }
  const handleUpdateCat = (category: any) => {
    setTypeModal('update');
    setCategory(category);
    setCloseDialog(true);
  }
  const handleChangePage=(page:number)=>{
    setCurrentPage(page)
  }
  console.log(data)
  console.log(data?.result?.totalItems)
  return (
    <div className="">
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Danh sách mục sản phẩm</h1>
      <div className="flex items-center mb-[15px] justify-between">
        <div className="flex items-center gap-[15px]  ">
          <Input
            className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]  "
            placeholder="tìm kiếm danh mục"
          />
          <Button onClick={() => { setTypeModal('create'); setCloseDialog(true) }} size={'square'} variant={'outline'} className="px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400] ">Thêm danh mục</Button>
          <Modal
            type={typeModal}
            closeDialog={closeDialog}
            onCloseDialog={() => setCloseDialog(false)}
            element={category}
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
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={'square'} variant={'outline'} className="px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400] ">View</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>satnaing</p>
                  <p className='text-xs leading-none text-muted-foreground'>nguyenhoanghuu15042004@gm...</p>
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
      </div>
      {
        data?.result?.data.length === 0 ? (<NoResult />) : (<div className=" ">
          {
            isLoading ? (<Loading
              className={'mt-[200px] mb-[40px]'}
            />
            ) : (
              <Tables
                className="mb-[30px] border border-gray-200 shadow-none"
                nameCol={["Tên Danh mục", "Ảnh"]}
                data={data?.result?.data}
                renderRow={(row: any) => {
                  return (
                    <td className="w-full flex items-center py-[6px] ">
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">{row.category_name}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <img
                          className="ml-[20px] w-[40px] h-[40px] object-cover rounded-[100%] border border-gray-300 "
                          alt="ảnh"
                          src={row.image}
                        />
                      </div>
                    </td>
                  )
                }}
                handleDelete={handleDeleteCat}
                handleUpdate={handleUpdateCat}
              />)
          }
          <Paginator
            currentPage={data?.result?.currentPage}
            totalPage={data?.result?.totalPages}
            onPageChange={handleChangePage}
          />
        </div>)
      }
    </div>
  )
}
