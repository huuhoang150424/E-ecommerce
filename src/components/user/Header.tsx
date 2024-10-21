import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuthenticated } from "@/redux/authSlice";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card";
import ShinyButton from "@/components/ui/shiny-button";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";


interface Props {
  className?: string
};
interface Cats {
  name?: string;
  id: number
};
const allCat: Cats[] = [
  {
    id: 0,
    name: 'Rau củ và hoa quả'
  },
  {
    id: 1,
    name: 'Thời trang nam nữ'
  },
  {
    id: 2,
    name: 'Mẹ và bé'
  }

];
const allCatDetail: Cats[] = [
  {
    id: 0,
    name: 'Rau cải'
  },
  {
    id: 1,
    name: 'Rau dền'
  },
  {
    id: 2,
    name: 'Củ cải đường'
  }

];

function Header({ className }: Props) {
  const [catActive, setCatActive] = useState<number>(0);
  const [visibleCategory, setVisibleCategory] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropRef.current &&
      categoryRef.current &&
      !dropRef.current.contains(e.target as Node) && // Click ngoài dropdown
      !categoryRef.current.contains(e.target as Node) // Click ngoài button
    ) {
      setIsAnimating(true);
      setTimeout(() => {
        setVisibleCategory(false);
        setIsAnimating(false);
      }, 300);
    }
  };
  useEffect(() => {

  }, [])
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])
  const toggleDropdown = () => {
    if (visibleCategory) {
      setIsAnimating(true);
      setTimeout(() => setVisibleCategory(false), 300);
    } else {
      setIsAnimating(false);
      setVisibleCategory(true);
    }
  };
  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện click truyền ra ngoài
  };

  return (
    <div className={`${cn('w-full   sticky  ', className)}`}>
      <div className="bg-[#dedee0] wrapper w-full py-[4px] flex justify-between items-center">
        <div className="flex items-center">
          <i className="fa-solid fa-phone text-textColor"></i>
          <span className="text-[13px] text-textColor font-[400] ">+ 0349938737</span>
          <i className="fa-regular fa-message text-textColor ml-[20px] text-[14px] "></i>
          <span className="text-[13px] text-textColor font-[400] ">+ 0349938737</span>
        </div>
        <div className=" px-[200px] overflow-hidden">
          <span className="text-[13px] text-textColor font-[400] marquee-content">This is a shopping website favored by users</span>
        </div>
        <div className="flex items-center">
          <i className="fa-solid fa-question text-textColor text-[12px] mr-[10px] "></i>
          <span className="text-[13px] text-textColor font-[400] ">Trợ giúp</span>
        </div>
      </div>
      <div className="grid grid-cols-12 grid-rows-1 gap-4 items-center  py-[14px] w-full wrapper border-b-[1px] border-gray-200">
        <Link to={"/home"} className="flex items-center gap-[8px] col-span-3 ">
          <i className="fa-brands fa-adversal text-[40px] text-primaryColor "></i>
          <h1 className="text-[30px] font-[800] text-textColor ">Brown<span className="text-primaryColor">Market</span></h1>
        </Link>
        <div className="col-span-6 ">
          <form action="" method="POST" className="border border-primaryColor rounded-[8px] overflow-hidden w-[95%] flex items-center">
            <Input className="outline-none text-textColor px-[16px] py-[8px] border-none" placeholder="Search..." />
            <div className="px-[20px] py-[11px] cursor-pointer bg-primaryColor hover:opacity-85 transition-all duration-300 ease-in-out flex items-center justify-center">
              <i className="fa-solid fa-magnifying-glass text-white text-[16px] "></i>
            </div>
          </form>
        </div>
        <div className="col-span-3 ">
          {
            isAuthenticated ? (
              <div className="flex items-center gap-[15px] ">
                <HoverCard openDelay={100} closeDelay={100}>
                  <HoverCardTrigger className="flex items-center gap-[5px] text-textColor cursor-pointer ">
                    <i className="fa-regular fa-user text-[16px] "></i>
                    <span>Hữu Hoàng</span>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex flex-col px-0 py-[5px] ">
                    <ShinyButton className="border-none" onClick={() => { dispatch(logout()); navigate("/") }}>Đăng xuất</ShinyButton>
                    <ShinyButton className="border-none">Trang cá nhân</ShinyButton>
                    <ShinyButton onClick={()=>navigate("admin/dashboard")} className="border-none">Quản trị</ShinyButton>
                  </HoverCardContent>
                </HoverCard>
                <div className="flex items-center gap-[5px] text-textColor cursor-pointer ">
                  <i className="fa-regular fa-heart text-[16px] "></i>
                  <span>Yêu thích</span>
                </div>
                <div className="relative flex items-center gap-[5px] text-textColor cursor-pointer ">
                  <i className="fa-solid fa-cart-shopping text-[16px] "></i>
                  <span>Giỏ hàng</span>
                  <div className="absolute top-[-54%] right-[64%] w-[20px] h-[20px] rounded-[50%] bg-redColor flex items-center justify-center ">
                    <span className="text-[12px] font-[600] text-white">10</span>
                  </div>
                </div>
              </div>
            ) : (<span className="text-[14px] text-textColor font-[500] cursor-pointer hover:text-gray-500 transition-all duration-300 ease-in-out ">Đăng nhập / Đăng ký</span>)
          }
        </div>
      </div>
      <div className="w-full  border-b-[1px] border-gray-200 py-[5px] wrapper">
        <div ref={dropRef} onClick={toggleDropdown} className="relative ">
          <Button size={'square'} variant={'outline'} className="flex items-center gap-[5px] px-[14px] py-[10px] hover:bg-primaryColor hover:opacity-85 transition-all duration-300 ease-in-out cursor-pointer bg-primaryColor rounded-[4px]  ">
            <i className="fa-solid fa-table-list text-[26px] text-white "></i>
            <span className=" text-white text-[16px] font-[500] ">Danh mục sản phẩm</span>
            <i className="fa-solid fa-chevron-down text-white ml-[10px] "></i>
          </Button>
          {
            visibleCategory && (
              <div style={{ pointerEvents: 'auto' }} onClick={preventPropagation} ref={categoryRef} className={`${isAnimating ? 'slide-top' : 'slide-bottom'} bg-white hover:bg-white  flex gap-[20px] absolute top-[116%] left-0 border border-gray-300 p-[15px] rounded-[6px] shadow-lg`}>
                <div className="p-[15px] bg-[#f3f3f4] rounded-[6px] flex flex-col gap-[5px] ">
                  {
                    allCat.map((cat) => {
                      return (
                        <Button onClick={() => { setCatActive(cat.id) }} key={cat.id} variant={'outline'} className={` ${cat.id === catActive ? 'border-primaryColor text-primaryColor' : 'border-gray-300 text-textColor'} px-[40px] border   hover:text-primaryColor`} ><span>{cat.name}</span></Button>
                      )
                    })
                  }
                </div>
                <div className="px-[10px] flex gap-[20px]">
                  <div className="flex flex-col items-center">
                    <h1 className="text-[16px] font-[500] text-primaryColor">Rau củ</h1>
                    <div className="w-full h-[1px] bg-gray-200 my-[5px] "></div>
                    <ul className="flex flex-col justify-center items-center gap-[15px]">
                      {
                        allCatDetail.map((cat) => {
                          return (
                            <li key={cat.id} className=""><span className="text-[14px] text-gray-400 font-[500] ">{cat.name}</span></li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-[16px] font-[500] text-primaryColor">Rau củ</h1>
                    <div className="w-full h-[1px] bg-gray-200 my-[5px] "></div>
                    <ul className="flex flex-col justify-center items-center gap-[15px]">
                      {
                        allCatDetail.map((cat) => {
                          return (
                            <li key={cat.id} className=""><span className="text-[14px] text-gray-400 font-[500] ">{cat.name}</span></li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

Header.displayName = 'Header';

export default Header