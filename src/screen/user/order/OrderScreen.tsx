import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsComponent } from "@/components/user";
import { useQuery } from "@tanstack/react-query";
import { getAllMyOrder } from "./api";
import { Loading } from "@/components/common";


export default function OrderScreen() {



  const {isLoading:loadingOrder,data:dataOrder}=useQuery({
    queryKey: ['myOrder'],
    queryFn: getAllMyOrder
  })


  console.log(dataOrder)


  return (
    <div className=" ">
      <h1 className="text-[20px] text-textColor font-[500] ">Đơn hàng của tôi</h1>

      <div className="flex items-center gap-[15px] mt-[15px] w-[35%] ">
        <Input value={""} onChange={()=>{}} name="" placeholder="Tìm kiếm đơn hàng..." className="outline-none px-[12px] py-[8px] text-textColor "/>
        <Button onClick={()=>{}} className="bg-primaryColor hover:bg-primaryColor hover:opacity-80 transition-all duration-200">Tìm kiếm</Button>
      </div>
      <div className="my-[20px] border border-gray-200 rounded-[4px] overflow-hidden">
        <TabsComponent
          tabs={[{ id: 1, label: "Tất cả" }, { id: 2, label: "Đã mua" }, { id: 3, label: "Đợi xác nhận" }, { id: 4, label: "Đã hủy" }, { id: 5, label: "Đã nhận hàng" }]}
          getIdTab={() => { }}
        />
      </div>
      {
        dataOrder?.result?.data?.length === 0 ? (<div className="flex flex-col items-center justify-center  gap-[20px] mt-[20px] border border-gray-200 rounded-[4px] px-[30px] py-[40px] ">
          <img
            src="https://cdn3.iconfinder.com/data/icons/e-commerce-website-1/64/Out-of-stock-512.png"
            alt="Sản phẩm yêu thích"
            className="object-cover w-[200px] mt-[20px] "
          />

          <p className="text-[16px] mt-[10px] text-gray-500 font-500 ">Đơn hàng của bạn hiện tại đang trống</p>
          <Button variant={'default'} className="  bg-primaryColor hover:bg-primaryColor hover:opacity-80 transition-all duration-300 ease-in-out ">Tiếp tục mua sắm</Button>
        </div>) : (<div className="">
          {
            loadingOrder ? (<Loading className="my-[200px] " />) : (<div className="">
              {
                dataOrder?.result?.data?.map((orders: any) => {
                  return (
                    <div key={orders.id} className="my-[20px] border border-gray-200 rounded-[4px] overflow-hidden p-[20px]">
                      <ul className="flex flex-col gap-[15px] ">
                        {
                          orders?.order_details?.map((order: any) => {
                            return (
                              <li key={order?.id} className=" flex items-center gap-[15px] border-b border-gray-200 pb-[15px] ">
                                <img
                                  src={order?.product?.thumb_image}
                                  alt="Ảnh sản phẩm"
                                  className="object-cover w-[60px] h-[80px] border border-gray-200  "
                                />
                                <div className="flex items-center justify-between  w-full ">
                                  <div className="flex flex-col gap-[3px] ">
                                    <h3 className="text-[17px] font-[400] text-[#252525]">{order?.product?.product_name}</h3>
                                    <span className="text-[13px] text-primaryColor font-[500] ">{order?.product?.category?.category_name}</span>
                                    <span className="text-gray-400 text-[14px] ">Số lượng còn lại: {order?.product?.stock}</span>
                                  </div>
                                  <div className="self-start ">
                                    <span className="text-[16px] text-textColor ">81.000 vnđ</span>
                                  </div>
                                </div>
                              </li>
                            )
                          }
                          )
                        }
                      </ul>
                      <div className="mt-[15px] flex items-center justify-between ">
                        <div className="self-end flex items-center gap-[10px] ">
                          <h1 className="text-[15px] text-textColor ">Tổng đơn: </h1>
                          <span className="text-[18px] font-[500] text-primaryColor  ">{orders?.total_amount?.toLocaleString('vi-VN')} vnđ</span>
                        </div>
                        <div className="flex items-center gap-[15px]">
                          <Button variant={'outline'} onClick={() => { }} className="border-primaryColor text-primaryColor ">Hủy đơn hàng</Button>
                          <Button onClick={() => { }} className="bg-primaryColor hover:bg-primaryColor hover:opacity-80 transition-all duration-200">Mua lại</Button>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>)
          }
        </div>)
      }







    </div>
  )
}
