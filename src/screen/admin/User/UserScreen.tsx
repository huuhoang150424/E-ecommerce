import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import NoResult from "@/components/admin/NoResult";
import { Loading } from "@/components/common";
import { Paginator, Tables } from "@/components/admin";
import Modal from "./modal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "./api";
import useScrollToTopOnMount from "@/hooks/useScrollToTopOnMount";

export default function UserScreen() {
  useScrollToTopOnMount();
  const [typeModal, setTypeModal] = useState('create');
  const [closeDialog, setCloseDialog] = useState(false);
  const [user, setUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePage, setSizePage] = useState(6);

  const { isLoading, data } = useQuery({
    queryKey: ['user',{currentPage:currentPage,pageSize:sizePage}],
    queryFn: ({ queryKey }: { queryKey: [string, { currentPage: number; pageSize: number }] })=>{
      const [_,{currentPage,pageSize}]=queryKey;
      return getAllUser(currentPage,pageSize)}
  });

  const handleDelete=(user:any)=>{
    setTypeModal('delete');
    setCloseDialog(true);
    setUser(user);
  }

  const handleUpdate=(user:any)=>{
    setTypeModal('update');
    setCloseDialog(true);
    setUser(user);
  }
  const handleChangePage=(page:number)=>{
    setCurrentPage(page)
  }
  return (
    <div className="">
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Danh sách người dùng</h1>

      <div className="flex items-center mb-[15px] justify-between ">
        <div className="flex items-center gap-[15px] ">
          <Input
            className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]  "
            placeholder="tìm kiếm người dùng..."
          />
          <Button onClick={() => { setTypeModal('create'); setCloseDialog(true) }} size={'square'} variant={'outline'} className="px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400] ">Thêm người dùng</Button>
          <Modal
            type={typeModal}
            closeDialog={closeDialog}
            onCloseDialog={() => setCloseDialog(false)}
            element={user}
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
            isLoading ? (<Loading className="mt-[200px] mb-[40px] " />) : (
            <div className="">
              <Tables
                className="mb-[30px] border border-gray-200 shadow-none"
                data={data?.result?.data}
                nameCol={["Tên Người dùng", "Địa chỉ", "Email", "Giới tính", "Quyền ", "Ảnh"]}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                renderRow={(row: any) => {
                  return (
                    <td className="w-full flex items-center py-[6px] ">
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">{row.name}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">{row.address[0]}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">{ row.email.length>20?` ${row.email.substring(0,20)}..`:`${row.email}`  }</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">{row.gender}</span>
                      </div>
                      <div className="flex-1 text-left ">
                        <div className={`${row.isAdmin ? 'bg-red-500': 'bg-blue-400'}  w-[100px] px-[6px] py-[2px]  flex items-center rounded-[6px] justify-center text-white `}>
                          <span className="font-[500] ">{row.isAdmin ? 'Quản trị' : 'Người dùng'}</span>
                        </div>
                      </div>
                      <div className="flex-1 text-left">
                        <img
                          className="ml-[20px] w-[40px] h-[40px] object-cover rounded-[100%] border border-gray-300 "
                          alt="ảnh"
                          src={row.avatar}
                        />
                      </div>
                    </td>
                  )
                }}
              />
              <Paginator
                currentPage={data?.result?.currentPage}
                totalPage={data?.result?.totalPages}
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
