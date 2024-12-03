import NoResult from "@/components/admin/NoResult";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import Modal from "./modal";
import { useQuery } from "@tanstack/react-query";
import { getAllAttribute } from "./api";
import { Loading } from "@/components/common";
import { Paginator, Tables } from "@/components/admin";

export default function AttributesScreen() {
  const [typeModal, setTypeModal] = useState('create');
  const [closeDialog, setCloseDialog] = useState(false);
  const [attribute, setAttribute] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const size=6 


  const { isLoading, data } = useQuery({
    queryKey: ['attribute',{currentPage:currentPage,pageSize:size}],
    queryFn: ({ queryKey }: { queryKey: [string, { currentPage: number; pageSize: number }] })=>{
      const [_,{currentPage,pageSize}]=queryKey;
      return getAllAttribute(currentPage, pageSize);
    }
  });


  const handleDelete = (attribute: any) => {
    setTypeModal('delete');
    setCloseDialog(true);
    setAttribute(attribute);
  }

  const handleUpdate = (attribute: any) => {
    setTypeModal('update');
    setCloseDialog(true);
    setAttribute(attribute);
  }
  const handleChangePage=(page:number)=>{
    setCurrentPage(page)
  }
  return (
    <div>
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Danh sách thuộc tính</h1>
      <div className="flex items-center mb-[15px] justify-between ">
        <div className="flex items-center gap-[15px] ">

          <Input
            className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]  "
            placeholder="tìm kiếm thuộc tính..."
          />
          <Button onClick={() => { setTypeModal('create'); setCloseDialog(true) }} size={'square'} variant={'outline'} className="px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400] ">Thêm mới thuộc tính</Button>
          <Modal
            type={typeModal}
            closeDialog={closeDialog}
            onCloseDialog={() => setCloseDialog(false)}
            element={attribute}
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
      <div className="">
        {
          data?.result?.data.length === 0 ? (<NoResult />) : (<div className="">
            {
              isLoading ? (<Loading className="mt-[200px] mb-[30px] " />) : (
              <div className="">
                <Tables
                  className="mb-[30px] border border-gray-200 shadow-none"
                  data={data?.result?.data}
                  nameCol={["Tên thuộc tính"]}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  renderRow={(row: any) => {
                    return (
                      <td className="w-full flex items-center py-[14px] ">
                        <div className="flex-1 text-left">
                          <span className="ml-[20px] ">{row.attribute_name}</span>
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
          </div>)
        }


      </div>
    </div>
  )
}
