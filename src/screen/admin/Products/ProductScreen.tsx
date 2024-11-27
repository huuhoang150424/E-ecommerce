
import { Input } from "@/components/ui/input";
import { Tables } from "@/components/admin";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loading } from "@/components/common";
import NoResult from "@/components/admin/NoResult";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "./api";
import DeleteProductModal from "./modal";

export default function ProductScreen() {
  const [closeDialog, setCloseDialog] = useState(false);
  const [product, setProduct] = useState<any>();

  const { isLoading, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  })

  const handleDeleteProduct = (product: any) => {
    setCloseDialog(true);
    setProduct(product);
  }
  console.log(data?.result?.data.length)
  return (
    <div className="">
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Danh sách sản phẩm</h1>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Input
            className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]  "
            placeholder="tìm kiếm sản phẩm"
          />
          <DeleteProductModal
            close={closeDialog}
            onClose={setCloseDialog}
            id={product?.id}
          />
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
            isLoading ? (<Loading className="my-[200px] " />) : (
              <Tables
                nameCol={["Tên sản phẩm", "Ảnh", "Giá", "Số lượng ", "Trạng thái", "Đánh giá", "Bình luận", "Số lượt mua"]}
                className="mb-[100px] border border-gray-200 shadow-none mt-[30px] "
                data={data?.result?.data}
                renderRow={(row: any) => {
                  return (
                    <td className="w-full flex items-center py-[8px] ">
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">{row.product_name.length > 12 ? ` ${row.product_name.substring(0, 12)}...` : row.product_name}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <img
                          className="ml-[20px] w-[40px] h-[40px] object-cover rounded-[100%] border border-gray-300 "
                          alt="ảnh"
                          src={row.thumb_image}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">{row.price}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">{row.stock}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] text-[14px] ">{row.status}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">chưa có</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">chưa có</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="ml-[20px] ">chưa có</span>
                      </div>
                    </td>
                  )
                }}
                handleDelete={handleDeleteProduct}
                isUpdate={true}
              />)
          }
        </div>)
      }
    </div>
  )
}