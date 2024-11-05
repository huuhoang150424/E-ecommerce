import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartScreen() {
  const navigate=useNavigate()
  const [counter, setCounter] = useState(0);

  return (
    <div className="grid grid-cols-12 grid-rows-1 gap-6 my-[50px]">
      <div className="col-span-9  ">
        <div className="flex items-center justify-between border border-gray-200 rounded-[4px] overflow-hidden  px-[16px] py-[4px] ">
          <div className="flex items-center gap-[15px] py-[8px] w-[35%]">
            <Checkbox id="terms" className="outline-none  w-[18px]  h-[18px] " />
            <label
              htmlFor="terms"
              className="text-[15px]  text-textColor font-[500] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Chọn tất cả
            </label>
          </div>
          <ul className="flex items-center justify-end  w-[65%] gap-[70px] ">
            <li className="w-[25%] "><span className="text-[15px] text-textColor  ">đơn giá</span></li>
            <li className="w-[25%] "><span className="text-[15px] text-textColor  ">số lượng</span></li>
            <li className="w-[25%] "><span className="text-[15px] text-textColor  ">thành tiền</span></li>
            <i className="fa-solid fa-trash text-[18px] text-textColor cursor-pointer "></i>
          </ul>
        </div>
        <ul className="mt-[20px] border border-gray-200 rounded-[4px] overflow-hidden  px-[16px] py-[10px]">
          {
            Array(4).fill(0).map((_, index) => {
              return (
                <li key={index} className="flex items-center justify-between mt-[5px] ">
                  <div className="flex items-center gap-[10px] py-[8px] w-[35%] ">
                    <Checkbox id="terms" className="outline-none  w-[18px]  h-[18px] " />
                    <img
                      className="object-cover h-[60px] "
                      alt=""
                      src="https://salt.tikicdn.com/cache/100x100/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg.webp"
                    />
                    <h3 className="text-[15px] text-textColor ">Cây Cam Ngọt Của Tôi</h3>
                  </div>
                  <ul className="flex items-center justify-end gap-[70px]  w-[65%] ">
                    <li className="w-[25%] flex flex-col ">
                      <p className="text-[15px] text-red-400 font-[500] ">147.000 vnđ</p>
                      <span className="line-through text-[12px] text-gray-400">-40.000vnđ</span>
                    </li>
                    <li className="w-[25%] flex items-center ">
                      <Button onClick={() => setCounter(counter < 2 ? 1 : counter - 1)} size={'square'} variant={'outline'} className="px-[10px] py-[8px] "><i className="fa-solid fa-minus text-textColor"></i></Button>
                      <Input
                        value={counter}
                        onChange={(e: any) => setCounter(e.target.value)}
                        className=" outline-none  w-[57px]  text-center  px-[10px] py-[5px] "
                      />
                      <Button onClick={() => setCounter(counter > 98 ? 99 : counter + 1)} size={'square'} variant={'outline'} className="px-[10px] py-[8px] "><i className="fa-solid fa-plus text-textColor"></i></Button>
                    </li>
                    <li className="w-[25%] "><span className="text-[15px] text-red-400 font-[500] ">147.000 vnđ</span></li>
                    <i className="fa-solid fa-trash text-[18px] text-textColor cursor-pointer "></i>
                  </ul>
                </li>
              )
            })
          }


        </ul>
      </div>
      <div className="col-span-3 h-[250px] border border-gray-200 rounded-[4px] overflow-hidden  px-[20px] py-[20px] sticky top-[20px] ">
        <ul className="flex flex-col gap-[5px] ">
          <li className="flex items-center justify-between ">
            <h3 className="text-[14px] text-gray-400 ">Tổng tiền sản phẩm</h3>
            <span className="text-textColor text-[16px] font-[500] ">150.000 vnđ</span>
          </li>
          <li className="flex items-center justify-between ">
            <h3 className="text-[14px] text-gray-400 ">Giảm giá</h3>
            <span className="text-green-500  text-[14px] font-[500] ">-50.000 vnđ</span>
          </li>
        </ul>
        <div className="w-full h-[0.6px] bg-gray-200 my-[15px] "></div>
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] text-textColor  ">Tổng tiền sản phẩm</h3>
          <span className="text-red-500 text-[20px] font-[500] ">150.000 vnđ</span>
        </div>
        <div className="w-full mt-[5px] flex flex-col  justify-end">
          <span className="text-green-600 text-right   text-[14px] font-[400] ">tiết kiệm  ( 50.000 vnđ )</span>
          <span className="text-gray-400 text-right   text-[12px] font-[400] mt-[4px] ">Đã bao gồm thuế VAT</span>
        </div>
        <Button onClick={()=>navigate('/checkOutScreen')} className="bg-primaryColor transition-all duration-300 ease-linear hover:bg-primaryColor text-white w-full mt-[20px] hover:opacity-80">Đặt hàng</Button>
      </div>
    </div>
  )
}
