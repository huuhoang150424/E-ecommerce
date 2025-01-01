
import { Input } from "@/components/ui/input";
import { Paginator, Tables } from "@/components/admin";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { useState } from "react";
import { Loading, NetworkError } from "@/components/common";
import NoResult from "@/components/admin/NoResult";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "./api";
import DeleteProductModal from "./modal";

export default function ProductScreen() {
  const [closeDialog, setCloseDialog] = useState(false);
  const [product, setProduct] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePage, setSizePage] = useState(6);
  const { isLoading, data, error } = useQuery({
    queryKey: ['products', { currentPage: currentPage, pageSize: sizePage }],
    queryFn: ({ queryKey }: { queryKey: [string, { currentPage: number; pageSize: number }] }) => {
      const [, { currentPage, pageSize }] = queryKey;
      return getAllProducts(currentPage, pageSize);
    }
  })

  const handleDeleteProduct = (product: any) => {
    setCloseDialog(true);
    setProduct(product);
  }


  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

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
        error ? (<NetworkError className="mt-[-100px]" />) : (
          <div className="">
            {
              isLoading ? (<Loading className="my-[200px] " />) : (
                <div className="">
                  {
                    data?.result?.data?.length === 0 ? (<NoResult />) : (
                      <div className="">

                        <Tables
                          nameCol={["Tên sản phẩm", "Ảnh", "Giá", "Số lượng ", "Trạng thái", "Đánh giá", "Bình luận", "Số lượt mua"]}
                          className="mb-[30px] border border-gray-200 shadow-none mt-[30px] "
                          data={data.result.data}
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