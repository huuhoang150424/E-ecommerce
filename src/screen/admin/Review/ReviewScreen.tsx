import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Paginator, Tables } from "@/components/admin";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Loading, NetworkError } from "@/components/common";
import { getAllReview } from "./api";
import { useQuery } from "@tanstack/react-query";
import NoResult from "@/components/admin/NoResult";

export default function ReviewScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePage, setSizePage] = useState(6);
  const { isLoading, data, error } = useQuery({
    queryKey: ['allReviews', { currentPage: currentPage, pageSize: sizePage }],
    queryFn: ({ queryKey }: { queryKey: [string, { currentPage: number; pageSize: number }] }) => {
      const [, { currentPage, pageSize }] = queryKey;
      return getAllReview(currentPage, pageSize);
    }
  })

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }


  
  return (
    <div className="">
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Danh sách đánh giá sản phẩm</h1>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Input
            className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]  "
            placeholder="tìm kiếm sản phẩm..."
          />
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
      {
        error ? (<NetworkError
          className="mt-[-100px]"
        />) : (<div className="">
          
              {
                isLoading ? (<Loading className="my-[200px] " />) : (
                  <div className="">
                    {
                      data?.result?.data?.length === 0 ? (<NoResult />) : (
                      <div className="">
                        <Tables
                          nameCol={["Người dùng", "Ảnh", "Tên sản phẩm", "ảnh sản phẩm", "Số sao", "Nội dung Bình luận"]}
                          className="mb-[30px] border border-gray-200 shadow-none mt-[30px] "
                          data={data?.result?.data}
                          renderRow={(row: any) => {
                            return (
                              <td className="w-full flex items-center py-[6px] ">
                                <div className="flex-1 text-left">
                                  <span className="ml-[20px] ">{row.user.name.length > 12 ? ` ${row.user.name.substring(0, 12)}...` : row.user.name}</span>
                                </div>
                                <div className="flex-1 text-left">
                                  <img
                                    className="ml-[20px] w-[40px] h-[40px] object-cover rounded-[100%] border border-gray-300 "
                                    alt="ảnh"
                                    src={row.user.avatar}
                                  />
                                </div>
                                <div className="flex-1 text-left">
                                  <span className="ml-[20px] ">{row.product.product_name}</span>
                                </div>
                                <div className="flex-1 ">
                                  <img
                                    className="ml-[35px] w-[60px] h-[70px] object-cover rounded-[2px] border border-gray-200 "
                                    alt="ảnh"
                                    src={row.product.thumb_image}
                                  />
                                </div>
                                <div className="flex-1 text-left">
                                  <span className="ml-[25px] ">{row.rating}  <i className="fa-solid fa-star text-yellow-300"></i></span>
                                </div>
                                <div className="flex-1 text-left">
                                  <span className="ml-[20px] text-[14px] ">{row.comment.length === 0 ? "Chưa có" : `${row.comment.length > 12 ? ` ${row.comment.substring(0, 12)}...` : row.comment}`}</span>
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
                      </div>)
                    }
                  </div>

                )
              }

          
        </div>)
      }
    </div>
  )
}
