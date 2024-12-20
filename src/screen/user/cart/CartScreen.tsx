import { Loading } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {  removeAllCart, removeCart, updateCart } from "@/redux/action/cart";
import { resetCart, resetCartState, selectCart, selectCartSelect, selectError, selectItem, selectLoading, selectMessage, selectSuccess, selectTotalCart } from "@/redux/cartReducer";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "./modal";



export default function CartScreen() {
  const cartSelect=useSelector(selectCartSelect);
  const loading=useSelector(selectLoading);
  const success=useSelector(selectSuccess);
  const error=useSelector(selectError);
  const message=useSelector(selectMessage);
  const carts=useSelector(selectItem);
  const dispatch=useDispatch<AppDispatch>();
  const navigate=useNavigate();
  const [selectedItems, setSelectedItems] = useState<any[]>([]); 
  const [openModal, setOpenModal] = useState(false); 
  const [messageWarning, setMessageWarning] = useState(""); 
  useEffect(()=>{
    if (success) {
      toast({
        title: message,
        variant: 'success'
      })
      dispatch(resetCartState())
    }
    if (error) {
      toast({
        title: message,
        variant: 'destructive'
      })
      dispatch(resetCartState())
    }
    
  },[dispatch,success,error])




  const totalAmount = carts
    .filter((cartItem: any) => selectedItems.includes(cartItem.id)) // Lọc sản phẩm được chọn
    .reduce((sum: number, cartItem: any) => sum + cartItem.product.price * cartItem.quantity, 0);


  const handleSelectAll = () => {
    let newCartItems;

    if (selectedItems.length === carts.length) {
      newCartItems=[]; 
    } else {
      newCartItems=carts.map((cartItem: any) => cartItem.id);
    }
    setSelectedItems(newCartItems);
    const tmpCart=carts.filter((cart)=>newCartItems.includes(cart.id));
    dispatch(selectCart({
      cart: tmpCart
    }))
  };


  return (
    <div className="grid grid-cols-12 grid-rows-1 gap-6 my-[50px]">
      <Modal
        close={openModal}
        onClose={()=>setOpenModal(false)}
        message={messageWarning}
      />
      <div className="col-span-9  ">
        <div className="flex items-center justify-between border border-gray-200 rounded-[4px] overflow-hidden  px-[16px] py-[4px] ">
          <div className="flex items-center gap-[15px] py-[8px] w-[35%]">
            <Checkbox
              id="selectAll"
              className="outline-none  w-[18px]  h-[18px]"
              checked={cartSelect.length > 0 && cartSelect.length===carts.length} 
              onCheckedChange={handleSelectAll}
            />
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
            <i 
              onClick={()=>{
                if (selectedItems.length === carts.length) {
                  dispatch(removeAllCart());
                  dispatch(resetCart());
                }
              }}
              className="fa-solid fa-trash text-[18px] text-textColor cursor-pointer "
            ></i>
          </ul>
        </div>
        {
          loading ? (<Loading className="my-[200px] mb-[100px]" />) : (
          <div className="">
            {
              carts.length===0?(<div className="mb-[100px] flex flex-col items-center justify-center gap-[10px] ">
                <img
                  className="object-cover w-[200px] mt-[80px]  "
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                />
                <span className="text-textColor text-[16px] font-[500] ">Không có sản phẩm trong giỏ hàng</span>
              </div>):(
                <ul className="mt-[20px] border border-gray-200 rounded-[4px] overflow-hidden  px-[16px] py-[10px]">
              {
                carts.map((cartItem:any, index:number) => {
                  return (
                    <li key={index} className="flex items-center justify-between mt-[5px] ">
                      <div className="flex items-center gap-[10px] py-[8px] w-[35%] ">
                        <Checkbox
                          id={`checkbox-${cartItem.id}`}
                          className="outline-none  w-[18px]  h-[18px]"
                          checked={cartSelect.length > 0 && selectedItems.includes(cartItem.id)}
                          onCheckedChange={() => {
                            let newSelectedItems;
                            if (selectedItems.includes(cartItem.id)) {
                              newSelectedItems = selectedItems.filter((id) => id !== cartItem.id);
                            } else {
                              newSelectedItems = [...selectedItems, cartItem.id];
                            }
                          
                            setSelectedItems(newSelectedItems);
                            const tmpCart=carts.filter((cart)=>newSelectedItems.includes(cart.id));
                            dispatch(selectCart({
                              cart: tmpCart
                            }))
                          }}
                        />
                        <img
                          className="object-cover h-[80px] max-w-[60px] border border-gray-200 "
                          alt=""
                          src={cartItem?.product?.thumb_image}
                        />
                        <h3 className="text-[15px] text-textColor ">{cartItem?.product?.product_name}</h3>
                      </div>
                      <ul className="flex items-center justify-end gap-[70px]  w-[65%] ">
                        <li className="w-[25%] flex flex-col ">
                          <p className="text-[15px] text-red-400 font-[500] ">{cartItem?.product?.price.toLocaleString('vi-VN')} vnđ</p>
                          <span className="line-through text-[12px] text-gray-400">-40.000vnđ</span>
                        </li>
                        <li className="w-[25%] flex items-center ">
                          <Button
                            onClick={() => {
                              const newQuantity = cartItem.quantity - 1;
                              if (newQuantity > 0) {
                                dispatch(updateCart({ id: cartItem.id, dataS: { quantity:newQuantity ,product_id: cartItem.product.id} }));
                              }
                            }}
                            size="square"
                            variant="outline"
                            className="px-[10px] py-[8px]"
                          >
                            <i className="fa-solid fa-minus text-textColor"></i>
                          </Button>

                          <Input
                            value={cartItem.quantity}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const newQuantity = parseInt(e.target.value, 10);
                              if (!isNaN(newQuantity) && newQuantity > 0) {
                                dispatch(updateCart({ id: cartItem.id, dataS: { quantity:newQuantity ,product_id: cartItem.product.id} }));
                              }
                            }}
                            className="outline-none w-[57px] text-center px-[10px] py-[5px]"
                          />

                          <Button
                            onClick={() => {
                              const newQuantity = cartItem.quantity + 1;
                              dispatch(updateCart({ id: cartItem.id, dataS: { quantity:newQuantity ,product_id: cartItem.product.id} }));
                            }}
                            size="square"
                            variant="outline"
                            className="px-[10px] py-[8px]"
                          >
                            <i className="fa-solid fa-plus text-textColor"></i>
                          </Button>

                        </li>
                        <li className="w-[25%] "><span className="text-[15px] text-red-400 font-[500] ">{(cartItem?.product?.price * cartItem?.quantity).toLocaleString('vi-VN')} vnđ</span></li>
                        <i onClick={()=> dispatch(removeCart(cartItem.id ?? ""))} className="fa-solid fa-trash text-[18px] text-textColor cursor-pointer "></i>
                      </ul>
                    </li>
                  )
                })
              }
            </ul>
            )
            }
          </div>


          )
        }
      </div>
      <div className="col-span-3 self-start border border-gray-200 rounded-[4px] overflow-hidden  px-[20px] py-[20px] sticky top-[20px] ">
        <ul className="flex flex-col gap-[5px] ">
          <li className="flex items-center justify-between ">
            <h3 className="text-[14px] text-gray-400 ">Tổng tiền sản phẩm</h3>
            <span className="text-textColor text-[16px] font-[500] ">{totalAmount.toLocaleString('vi-VN')} vnđ</span>
          </li>
          <li className="flex items-center justify-between ">
            <h3 className="text-[14px] text-gray-400 ">Giảm giá</h3>
            <span className="text-green-500  text-[14px] font-[500] ">-50.000 vnđ</span>
          </li>
        </ul>
        <div className="w-full h-[0.6px] bg-gray-200 my-[15px] "></div>
        {/* <div className="mt-[20px] text-right">
          <p className="text-[18px] font-[500] text-red-400">
            Tổng tiền: {totalAmount.toLocaleString('vi-VN')} vnđ
          </p>
        </div> */}

        <div className="flex items-center justify-between ">
          <h3 className="text-[16px] text-textColor  ">Tổng tiền thanh toán</h3>
          <span className="text-red-500 text-[18px] font-[500] ">{totalAmount.toLocaleString('vi-VN').length>10? `${totalAmount.toLocaleString('vi-VN').substring(0,8)}...`:totalAmount.toLocaleString('vi-VN')} vnđ</span>
        </div>
        <div className="w-full mt-[5px] flex flex-col  justify-end">
          <span className="text-green-600 text-right   text-[14px] font-[400] ">tiết kiệm  ( 50.000 vnđ )</span>
          <span className="text-gray-400 text-right   text-[12px] font-[400] mt-[4px] ">Đã bao gồm thuế VAT</span>
        </div>
        <Button 
          onClick={()=>{
            if (cartSelect.length===0) {
              setOpenModal(true);
              setMessageWarning("Bạn vẫn chưa chọn sản phẩm nào để mua.");
            } else {
              navigate('/checkOutScreen');
            }
          }} 
          className="bg-primaryColor transition-all duration-300 ease-linear hover:bg-primaryColor text-white w-full mt-[20px] hover:opacity-80">
            Đặt hàng
        </Button>
      </div>
    </div>
  )
}
