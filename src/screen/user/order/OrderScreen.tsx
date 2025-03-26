import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsComponent } from "@/components/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { destroyOrder, getAllMyOrder, receivedOrder } from "@/screen/user/order/api";
import { Loading, LoadingSpinner } from "@/components/common";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";


const tabs: any[] = [{ id: 1, label: "Tất cả", typeOrder: 'getOrderByUser' }, { id: 2, label: "Đợi xác nhận", typeOrder: 'getOrderProcessing' }, { id: 3, label: "Đã hủy", typeOrder: 'getOrderDestroy' }, { id: 4, label: "Đã nhận hàng", typeOrder: 'getOrderReceived' }, { id: 5, label: "Đang giao", typeOrder: 'getOrderShipped' }];

export default function OrderScreen() {
  const queryClient=useQueryClient();
  const [typeOrder, setTypeOrder] = useState('getOrderByUser');


  const { isLoading: loadingOrder, data: rawData } = useQuery({
    queryKey: ['myOrder', { typeOrder: typeOrder }],
    queryFn: ({ queryKey }: { queryKey: [string, { typeOrder: string }] }) => {
      const [_, { typeOrder }] = queryKey;
      return getAllMyOrder(typeOrder);
    }
  })
  //destroy order
  const mutation = useMutation({
    mutationFn: destroyOrder,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ['myOrder']
      })
      console.log(data?.result?.message)
      toast({
        variant: 'success',
        title: data?.result?.message
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error?.response?.data?.error_message?.error_message,
      });
    },
  })

  const { isPending: isLoadingDestroyOrder } = mutation;


  //received order
  const mutationReceived = useMutation({
    mutationFn: receivedOrder,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ['myOrder']
      })
      console.log(data?.result?.message)
      toast({
        variant: 'success',
        title: data?.result?.message
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error?.response?.data?.error_message?.error_message,
      });
    },
  })

  const { isPending: isLoadingReceivedOrder } = mutationReceived;



  //format data
  const normalizeOrderData = (data: any, typeOrder: string) => {
    if (typeOrder === "getOrderByUser") {
      return data?.map((order: any) => ({
        id: order.id,
        total_amount: order.total_amount,
        order_details: order.order_details,
        status: order.status,
        created_at: order.created_at,
        receiver_name: order.receiver_name,
        receiver_phone: order.receiver_phone,
        shipping_address: order.shipping_address,
        order_code: order.order_code,
      }));
    }
    return data?.map((item: any) => ({
      id: item?.order?.id,
      total_amount: item?.order?.total_amount,
      order_details: item?.order?.order_details,
      status: item?.status,
      created_at: item?.order?.created_at,
      receiver_name: item?.order?.receiver_name,
      receiver_phone: item?.order?.receiver_phone,
      shipping_address: item?.order?.shipping_address,
      order_code: item?.order?.order_code,
    }));
  };
  const normalizedData = rawData?.result?.data
    ? normalizeOrderData(rawData.result.data, typeOrder)
    : [];

  return (
    <div className=" ">
      <h1 className="text-[20px] text-textColor font-[500] ">Đơn hàng của tôi</h1>

      <div className="flex items-center gap-[15px] mt-[15px] w-[35%] ">
        <Input value={""} onChange={() => { }} name="" placeholder="Tìm kiếm đơn hàng..." className="outline-none px-[12px] py-[8px] text-textColor " />
        <Button onClick={() => { }} className="bg-primaryColor hover:bg-primaryColor hover:opacity-80 transition-all duration-200">Tìm kiếm</Button>
      </div>
      <div className="my-[20px] border border-gray-200 rounded-[4px] overflow-hidden">
        <TabsComponent
          tabs={tabs}
          getIdTab={(tab) => setTypeOrder(tab.typeOrder)}
        />
      </div>
      {
        (loadingOrder || isLoadingReceivedOrder || isLoadingDestroyOrder) ? (
          <Loading className="my-[200px]" />
        ) : (
          <div>
            {
              normalizedData?.length === 0 ? (<div className="flex flex-col items-center justify-center  gap-[20px] mt-[20px] border border-gray-200 rounded-[4px] px-[30px] py-[40px] ">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/e-commerce-website-1/64/Out-of-stock-512.png"
                  alt="Đơn hàng rỗng"
                  className="object-cover w-[200px] mt-[20px] "
                />
                <p className="text-[16px] mt-[10px] text-gray-500 font-500 ">Đơn hàng của bạn hiện tại đang trống</p>
                <Button variant={'default'} className="  bg-primaryColor hover:bg-primaryColor hover:opacity-80 transition-all duration-300 ease-in-out ">Tiếp tục mua sắm</Button>
              </div>) : (
                <div className="">
                  {normalizedData.map((orders: any) => (
                    <div key={orders.id} className="my-[20px] border border-gray-200 rounded-[4px] overflow-hidden p-[20px]">
                      <ul className="flex flex-col gap-[15px]">
                        {orders.order_details.map((order: any) => (
                          <li key={order.id} className="flex items-center gap-[15px] border-b border-gray-200 pb-[15px]">
                            <img
                              src={order.product.thumb_image}
                              alt="Ảnh sản phẩm"
                              className="object-cover w-[60px] h-[80px] border border-gray-200"
                            />
                            <div className="flex items-center justify-between w-full">
                              <div className="flex flex-col gap-[3px]">
                                <h3 className="text-[17px] font-[400] text-[#252525]">{order.product.product_name}</h3>
                                <div className="flex items-center gap-[10px]">
                                  <span className="text-[13px] text-primaryColor font-[500]">
                                    {order.product.category.category_name}
                                  </span>
                                  <h5 className="text-textColor text-[12px]">SL: x{order.quantity}</h5>
                                </div>
                                <span className="text-gray-400 text-[14px]">Số lượng còn lại: {order.product.stock}</span>
                              </div>
                              <div className="self-start">
                                <span className="text-[16px] text-textColor">
                                  {order.product.price.toLocaleString("vi-VN")} vnđ
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-[15px] flex items-center justify-between">
                        <div className="self-end flex items-center gap-[10px]">
                          <h1 className="text-[15px] text-textColor">Tổng đơn:</h1>
                          <span className="text-[18px] font-[500] text-primaryColor">
                            {orders.total_amount.toLocaleString("vi-VN")} vnđ
                          </span>
                        </div>
                        <div className="flex items-center gap-[15px]">
                          <Button
                            variant={"outline"}
                            onClick={() => {
                              mutation.mutate(orders.id);
                            }}
                            className="border-primaryColor text-primaryColor"
                          >
                            Hủy đơn hàng
                          </Button>
                          <Button
                            className="bg-primaryColor hover:bg-primaryColor hover:opacity-80 transition-all duration-200"
                            onClick={() => {
                              mutationReceived.mutate(orders.id);
                            }}
                          >
                            Đã nhận hàng
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>)
            }

          </div>
        )
      }

    </div>
  )
}
