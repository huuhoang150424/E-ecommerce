import { selectUser } from "@/redux/authReducer"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


interface Props {
  children: React.ReactNode
}
interface navProfile {
  id: number;
  name: string;
  navigate: string;
  icon: string
}

const navProfile : navProfile[] =[
  {
    id:1,
    name: "Thông tin cá nhân",
    navigate: "/profile",
    icon: "fa-regular fa-user "
  },
  {
    id:2,
    name: "Sản phẩm yêu thích",
    navigate: "/profile/favoriteScreen",
    icon: "fa-regular fa-heart "
  },
  {
    id:3,
    name: "Đơn hàng của tôi",
    navigate: "/profile/orderScreen",
    icon: "fa-solid fa-truck "
  },
]

export default function ProfileScreen({children}: Props) {
  const navigate=useNavigate();
  const user=useSelector(selectUser);
  const [navActivate, setNavActivate] = useState<number | null>(null);


  useEffect(() => {
    const storedNav = localStorage.getItem("navProfile");
    if (storedNav) {
      setNavActivate(parseInt(storedNav, 10));
    }
  }, []);



  return (
    <div className="my-[30px]">
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
            {
              navProfile.map((nav: any) => {
                return (
                  <li 
                    key={nav.id} 
                    onClick={() => {
                      navigate(`${nav.navigate}`);
                      setNavActivate(nav.id)
                      localStorage.setItem("navProfile",nav.id)
                    }}
                    className={` flex items-center gap-[15px] ${nav.id===navActivate ? "bg-gray-100 ":""} hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-[4px] cursor-pointer  px-[12px] py-[6px]  `}
                  >
                    <i className={`${nav.icon} text-[18px] text-textColor `}></i>
                    <span className="text-[16px] leading-[24px] font-[400] text-textColor ">{nav.name} </span>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="col-span-9 ">
          { children }
        </div>
      </div>
    </div>
  )
}
