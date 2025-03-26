import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { resetCartSelect, selectCartSelect, selectItem } from "@/redux/cartReducer";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyCod, buyCodForm, FormBuyCod } from "./api";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "@/components/common";
import { toast } from "@/hooks/use-toast";
import { getCart } from "@/redux/action/cart";
import { selectUser } from "@/redux/authReducer";

export default function CheckOutScreen() {
  const user = useSelector(selectUser);
  const [openModal, setOpenModal] = useState(false);
  const [selectedValueTypePayment, setSelectedValueTypePayment] = useState("cod");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const carts = useSelector(selectCartSelect);

  const { reset } = useForm<FormBuyCod>({
    resolver: zodResolver(buyCodForm)
  });

  const mutation = useMutation({
    mutationFn: buyCod,
    onSuccess: (data) => {
      toast({
        variant: 'success',
        title: data?.result.message
      })
      dispatch(resetCartSelect())
      dispatch(getCart())
      reset();
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error?.response?.data?.error_message?.message
      });
    },
  })
  const { isPending } = mutation;
  const onSubmit = (dataS: FormBuyCod) => {
    mutation.mutate(dataS);
  }
  const totalItem = carts.reduce((total, cartItem) => total + cartItem.product.price, 0)
  console.log(totalItem)

  return (
    <div className="grid grid-cols-12 grid-rows-1 gap-6 my-[50px]">
      <Modal
        close={openModal}
        onClose={() => setOpenModal(false)}
        message={""}
      />


      <div className="col-span-9 flex flex-col">
        {
          carts.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center gap-[10px]  border self-start border-gray-200 rounded-[4px] px-[20px] py-[20px]">
              <img
                className="object-cover w-[200px] mt-[20px]  "
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              />
              <span className="text-textColor text-[16px] font-[500] ">Vui lòng chọn sản phẩm để tiếp tục</span>
              <Button onClick={() => navigate('/cartScreen')} className="bg-primaryColor transition-all duration-300 ease-linear hover:bg-primaryColor text-white  my-[20px] hover:opacity-80">Quay lại giỏ hàng</Button>
            </div>) : (
            <div className=" flex flex-col gap-[15px] ">
              {
                isPending ? (<Loading className="my-[110px] " />) : (<div className="border border-gray-200 rounded-[4px] overflow-hidden  px-[20px] py-[20px]">
                  <h1 className="text-[16px] text-textColor font-[500] ">Giao hàng nhanh chóng</h1>
                  <div className="border border-primaryColor w-[40%] mt-[15px] rounded-[6px] px-[20px] py-[18px]">
                    <RadioGroup defaultValue="comfortable" className="flex flex-col gap-[20px] ">
                      <div className="flex items-center gap-[15px] ">
                        <RadioGroupItem value="comfortable" id="r2" className="text-primaryColor" />
                        <Label className="text-[15px] text-textColor cursor-pointer " htmlFor="r2">Siêu tốc</Label>
                      </div>
                      <div className="flex items-center gap-[15px]">
                        <RadioGroupItem value="compact" id="r3" className="text-primaryColor" />
                        <Label className="text-[15px] text-textColor cursor-pointer " htmlFor="r3">Bình thường</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="relative flex justify-between  mt-[30px] px-[20px] py-[18px] border border-gray-200 rounded-[12px]">
                    <div className="absolute flex items-center gap-[10px] top-[-14px] left-[2%] bg-white px-[10px] py-[2px] ">
                      <i className="fa-solid fa-cart-flatbed text-green-600  text-[14px] "></i>
                      <span className="text-[14px] text-green-500 font-[500] ">Gói: Giao đúng sáng mai, 8h - 12h, 14/12</span>
                    </div>
                    <div className="w-[60%]">
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] text-gray-500  ">Giao tiết kiệm</span>
                        <h4 className="text-[15px]">19.600 ₫</h4>
                      </div>
                      <ul className="flex flex-col gap-[10px] mt-[20px] ">
                        {
                          carts.map((cart: any) => {
                            return (
                              <li key={cart.id} className="flex items-center gap-[15px] ">
                                <img
                                  src={cart.product.thumb_image}
                                  alt="Ảnh sản phẩm"
                                  className="object-cover w-[35px] h-[50px] border border-gray-200 "
                                />
                                <div className="flex items-center justify-between w-full ">
                                  <div className="flex flex-col gap-[8px]">
                                    <h4 className="text-textColor text-[16px]">{cart.product.product_name}</h4>
                                    <span className="text-[13px] text-textColor ">SL: {cart.quantity}</span>
                                  </div>
                                  <div className="flex self-end">
                                    <h3 className="text-[15px] font-[500] text-red-500">{(cart.product.price * cart.quantity).toLocaleString('vi-VN')} vnđ</h3>
                                  </div>
                                </div>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                    <div className="w-[30%] flex self-start  items-center gap-[20px] px-[20px] py-[10px] bg-gray-100 rounded-[12px] ">
                      <i className="fa-solid self-start fa-caravan text-textColor mt-[4px] "></i>
                      <p className="text-[14px] text-gray-500 ">Do công ty trách nhiệm hữu hạn 1 thành viên phụ trách vận chuyển</p>
                    </div>
                  </div>
                </div>)
              }

              <div className="border border-gray-200 rounded-[4px] overflow-hidden  px-[20px] py-[20px]">
                <h1 className="text-[16px] text-textColor font-[500] ">Lựa chọn hình thức thanh toán </h1>
                <RadioGroup
                  onValueChange={(value: string) => {
                    setSelectedValueTypePayment(value);
                  }}
                  defaultValue="cod"
                  className="flex flex-col gap-[20px] mt-[20px] ">
                  <div className="flex items-center gap-[15px]">
                    <RadioGroupItem value="cod" id="r4" className="text-primaryColor" />
                    <div className="flex items-center gap-[10px] ">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                        alt=""
                        className="object-cover w-[30px] h-[30px] "
                      />
                      <Label className="text-[15px] text-textColor cursor-pointer font-[400] " htmlFor="r4">Thanh toán bằng tiền mặt </Label>
                    </div>
                  </div>
                  <div className="flex items-center gap-[15px]">
                    <RadioGroupItem value="zalo-pay" id="r5" className="text-primaryColor" />
                    <div className="flex items-center gap-[10px] ">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/2f/43/da/dd7ded6d3659036f15f95fe81ac76d93.png"
                        alt=""
                        className="object-cover w-[30px] h-[30px] "
                      />
                      <Label className="text-[15px] text-textColor cursor-pointer font-[400] " htmlFor="r5">Thanh toán online Zalopay</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )
        }
      </div>

      <div className="col-span-3 self-start flex flex-col gap-[15px]  sticky top-[20px]  ">
        <div className="border border-gray-200 rounded-[4px] overflow-hidden  px-[20px] py-[20px] ">
          <div className="flex items-center justify-between ">
            <h1 className="text-[16px] text-gray-400 font-[400] ">Giao tới</h1>
            <span className="text-[15px] text-primaryColor font-[500] ">Thay đổi</span>
          </div>
          <div className="flex items-center gap-[10px] mt-[10px]">
            <h3 className="text-[15px] font-[500] text-textColor ">{user?.name}</h3>
            <div className="w-[2px] h-[20px] bg-gray-300"></div>
            <h3 className="text-[15px] font-[500] text-textColor ">{user?.phone}</h3>
          </div>
          <div className="mt-[15px]  flex items-center gap-[10px]">
            <div className="px-[6px] self-start flex items-center justify-center  py-[2px] rounded-[4px] bg-green-100 ">
              <span className="text-[14px] text-green-600 font-[500] ">Nhà</span>
            </div>
            <span className="text-[14px] text-gray-500 font-[500] " >{user?.address[0]}</span>
          </div>
        </div>
        <div className="border border-gray-200 rounded-[4px] overflow-hidden  px-[20px] py-[20px] ">
          <div className="flex items-center justify-between ">
            <h1 className="text-[17px] text-gray-700 font-[400] ">Đơn hàng</h1>
            <Link to={'/cartScreen'} className="text-[15px] text-primaryColor font-[500] ">Thay đổi</Link>
          </div>
          <span className="text-[14px] mt-[10px] text-gray-500 ">4 sản phẩm</span>
          <div className="h-[0.5px] w-full bg-gray-200 my-[15px] "></div>
          <ul className="flex flex-col gap-[8px]">
            <li className="flex justify-between items-center">
              <h3 className="text-textColor ">Tổng tiền hàng</h3>
              <span className="text-[14px] text-gray-700 font-[400] ">11.000đ</span>
            </li>
            <li className="flex justify-between items-center">
              <h3 className="text-textColor ">Phí vận chuyển</h3>
              <span className="text-[14px] text-gray-700 font-[400] ">11.000đ</span>
            </li>
            <li className="flex justify-between items-center">
              <h3 className="text-textColor ">Giảm giá trực tiếp</h3>
              <span className="text-[14px] text-gray-700 font-[400] ">11.000đ</span>
            </li>
          </ul>
          <div className="h-[0.5px] w-full bg-gray-200 my-[15px] "></div>
          <div className="flex items-center justify-between ">
            <h3 className="text-[16px] text-textColor  ">Tổng tiền thanh toán</h3>
            <span className="text-red-500 text-[18px] font-[500] "> {totalItem.toLocaleString('vi-VN')} vnđ</span>
          </div>
          <div className="w-full mt-[5px] flex flex-col  justify-end">
            <span className="text-green-600 text-right   text-[14px] font-[400] ">tiết kiệm  ( 30.000 vnđ )</span>
            <span className="text-gray-400 text-right   text-[12px] font-[400] mt-[4px] ">Đã bao gồm thuế VAT</span>
          </div>
          <Button
            onClick={() => {
              if (selectedValueTypePayment === "cod") {
                onSubmit({
                  carts: carts,
                  shipping_address: user?.address[0] ?? "",
                  receiver_name: user?.name ?? "",
                  receiver_phone: user?.phone ?? 1234567890,
                })
              }
            }}
            className="bg-primaryColor transition-all duration-300 ease-linear hover:bg-primaryColor text-white w-full mt-[20px] hover:opacity-80"
          >Mua hàng</Button>
        </div>
      </div>
    </div>
  )
}
