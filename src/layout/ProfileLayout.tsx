import { selectUser } from "@/redux/authReducer"
import { useSelector } from "react-redux"


interface Props {
  children: React.ReactNode
}

export default function ProfileScreen({children}: Props) {
  const user=useSelector(selectUser)
  return (
    <div className="my-[50px]">
      <div className="grid grid-cols-12 grid-rows-1 gap-6">
        <div className="col-span-3  self-start  sticky top-[30px]    ">
          <div className="flex items-center gap-[15px] ">
            <img
              className="object-cover rounded-[50%] w-[50px] h-[50px] border border-gray-200 "
              alt=""
              src={user?.avatar}
            />
            <div className="flex flex-col gap-0">
              <span className="text-[13px] leading-[22px] text-gray-400">Tài khoản của bạn</span>
              <h2 className="text-[16px] leading-[24px] font-[500] text-textColor ">{user?.name}</h2>
            </div>
          </div>
          <ul className="mt-[15px] flex flex-col gap-[5px]  border border-gray-200 rounded-[4px] overflow-hidden p-[10px]">
            <li className="flex items-center gap-[15px] bg-gray-100 rounded-[4px] cursor-pointer  px-[12px] py-[6px]  ">
              <i className="fa-regular fa-user text-[18px] text-textColor "></i>
              <span className="text-[16px] leading-[24px] font-[400] text-textColor ">Thông tin cá nhân </span>
            </li>
            <li className="flex items-center gap-[15px]  rounded-[4px] cursor-pointer  px-[12px] py-[6px] hover:bg-gray-100 transition-all duration-300 ease-linear ">
              <i className="fa-regular fa-heart text-[18px] text-textColor "></i>
              <span className="text-[16px] leading-[24px] font-[400] text-textColor ">Sản phẩm yêu thích</span>
            </li>
            <li className="flex items-center gap-[15px]  rounded-[4px] cursor-pointer  px-[12px] py-[6px] hover:bg-gray-100 transition-all duration-300 ease-linear ">
              <i className="fa-regular fa-bell text-[18px] text-textColor "></i>
              <span className="text-[16px] leading-[24px] font-[400] text-textColor ">Thông báo của tôi</span>
            </li>
            <li className="flex items-center gap-[15px]  rounded-[4px] cursor-pointer  px-[12px] py-[6px] hover:bg-gray-100 transition-all duration-300 ease-linear ">
              <i className="fa-solid fa-truck text-[18px] text-textColor "></i>
              <span className="text-[16px] leading-[24px] font-[400] text-textColor ">Đơn hàng của tôi</span>
            </li>
          </ul>
        </div>
        <div className="col-span-9 border border-gray-200 rounded-[4px] overflow-hidden p-[20px]">
          { children }
        </div>
      </div>
      <div className="">
        
      </div>
    </div>
  )
}
