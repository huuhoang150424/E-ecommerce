import { Loading } from "@/components/common";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllFavoriteProduct, removeFavoriteProduct } from "./api";
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function FavoriteScreen() {
  const queryClient=useQueryClient();
  const [selectValue, setSelectValue] = useState<string>("");
  const { data, isLoading } = useQuery({
    queryKey: ['FavoriteProduct'],
    queryFn: getAllFavoriteProduct
  })


    //delete favorite
    const mutationFavorite = useMutation({
      mutationFn: removeFavoriteProduct,
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({
          queryKey: ['FavoriteProduct'],
        });
        console.log(data)
        toast({
          variant: 'success',
          title: data?.result?.message,
        })
      },
      onError: (error: any) => {
        toast({
          variant: 'destructive',
          title: error?.response?.data?.error_message,
        });
      }
    })
    const { isPending: isLoadingDeleteFavorite } = mutationFavorite;
  const handleSelectChange = (value: string, productId: string) => {
    if (value === "deleteProductFavorite") {
      mutationFavorite.mutate(productId);
    }
    setSelectValue("");
  };


  return (
    <div className=" ">
      <h1 className="text-[20px] text-textColor font-[500] ">Sản phẩm yêu thích</h1>
      {
        data?.result?.data.length === 0 ? (<div className="flex flex-col items-center justify-center  gap-[20px] mt-[20px] border border-gray-200 rounded-[4px] px-[30px] py-[40px] ">
          <img
            src="https://static.thenounproject.com/png/4850412-200.png"
            alt="Sản phẩm yêu thích"
            className="object-cover w-[200px] mt-[20px] "
          />
          <p className="text-[16px] mt-[10px] text-gray-500 font-500 ">Hãy thêm sản phẩm bạn yêu thích khi mua sắm để xem lại thuận tiện nhất</p>
          <Button variant={'default'} className="  bg-primaryColor hover:bg-primaryColor hover:opacity-80 transition-all duration-300 ease-in-out ">Thêm vào sản phẩm yêu thích</Button>
        </div>) : (<div className="">
          {
            (isLoading || isLoadingDeleteFavorite) ? (<Loading
              className="my-[150px] "
            />) : (<ul className="mt-[20px] flex flex-col gap-[15px] border border-gray-200 px-[20px] py-[15px] rounded-[4px] ">
              {
                data?.result?.data?.map((item: any, index: number) => {
                  return (
                    <li key={index} className=" flex items-center gap-[15px] border-b border-gray-200 pb-[15px]">
                      <img
                        src={item?.product?.thumb_image}
                        alt=""
                        className="object-cover w-[60px] h-[80px] border border-gray-200  "
                      />
                      <div className="flex items-center justify-between  w-full ">
                        <div className="flex flex-col gap-[10px] ">
                          <h3 className="text-[17px] font-[400] text-textColor">{item?.product?.product_name}</h3>
                          <span className="text-gray-400 text-[14px] ">Số lượng còn lại: {item?.product?.stock}</span>
                        </div>
                        <div className="self-start ">
                          <Select
                            value={selectValue}
                            onValueChange={(value: string) => {
                              setSelectValue(value);
                              handleSelectChange(value, item?.product?.id);
                            }}
                          >
                            <SelectTrigger isShowIcon={false} className="w-0 mr-[10px] border-none shadow-none">
                              <i className="fa-solid fa-ellipsis text-textColor"></i>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="deleteProductFavorite">Xóa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>)
          }
        </div>)
      }
    </div>
  )
}
