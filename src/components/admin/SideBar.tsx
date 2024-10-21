import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card";

interface Props {
  className: string;
  onToggle?: (isCollapsed: boolean) => void;
}
interface navigation {
  id: number;
  tab: string
}
const navigation: navigation[] = [
  {
    id: 1,
    tab: 'Tổng quan'
  }
]

export default function SideBar({ className }: Props) {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav
      className={cn(
        `relative transition-all duration-500 ease-in-out overflow-visible ${isCollapsed ? "w-[60px]" : "w-[300px]"
        }`,
        className
      )}
    >
      <Button
        onClick={() => setIsCollapsed(!isCollapsed)}
        variant="default"
        size="square"
        className={`${isCollapsed ? 'right-[-25%]' : 'right-[-6%]'} bg-textColor absolute top-[50%] transition-all duration-500 ease-in-out  rounded-full flex items-center justify-center px-[11px] py-[8px]`}
      >
        <i
          className={`fa-solid fa-chevron-right transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""
            }`}
        ></i>
      </Button>
      <div className="">
        <div className="w-full z-1 overflow-hidden flex items-center justify-center px-[20px] py-[15px] gap-[5px] ">
          <i className="fa-brands fa-adversal text-[35px] text-primaryColor  dark:text-white "></i>
          {
            !isCollapsed && (
              <div className={`${!isCollapsed ? '' : ''} transition-all duration-1000 ease-in-out`}>
                <h1 className="text-[25px] font-[800] text-textColor ">Brown<span className=" text-primaryColor dark:text-white ">Market</span></h1>
              </div>
            )
          }
        </div>
        <div className="w-full h-[1px] bg-gray-200 mb-[5px] dark:bg-borderDarkMode"></div>
        <NavLinkIcon isCollapsed={isCollapsed} />
      </div>
    </nav>
  );
}

interface navIcon {
  id: number;
  icon: string;
  label: string;
  navigate: string;
  isAccordion: boolean
}

const navIcon: navIcon[] = [
  {
    id: 0,
    icon: "fa-solid fa-gauge",
    label: 'Tổng quan',
    navigate: '/admin/dashboard',
    isAccordion: true
  },
  {
    id: 1,
    icon: "fa-brands fa-product-hunt",
    label: 'Sản phẩm',
    navigate: '/admin/product',
    isAccordion: true
  }
]
interface PropsNavLink {
  isCollapsed: boolean
}

const NavLinkIcon=memo(({ isCollapsed }: PropsNavLink)=> {
  const [activeNavLink, setActiveNavLink] = useState(0)
  const navigate = useNavigate()

  const handleClick = (nav: string, id: number) => {
    navigate(nav);
    setActiveNavLink(id);
  }

  return (
    <div className=" px-[4px] py-[8px] flex flex-col gap-[8px] overflow-hidden ">
      {
        navIcon.map((nav) => {
          return (
            isCollapsed ? (<div key={nav.id} className="relative flex items-center justify-center  " >
              <HoverCard >
                <HoverCardTrigger asChild >
                  <Button onClick={() => handleClick(nav.navigate, nav.id)} size={'square'} variant={'outline'} className={`${nav.id === activeNavLink ? 'bg-gray-100 dark:bg-borderDarkMode text-primaryColor' : ' text-textColor bg-transparent '} dark:text-white rounded-[6px] p-[10px] border-transparent shadow-none `}>
                    <i className={`${nav.icon} text-[22px] `}></i>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="absolute left-[35px] top-[-46px] w-[90px]  px-[10px] py-[8px] ">
                  <span className="text-[14px] text-textColor">{nav.label}</span>
                </HoverCardContent>
              </HoverCard>
            </div>) : (
              <Button onClick={() => handleClick(nav.navigate, nav.id)} size={'square'} variant={'outline'} className={`${nav.id === activeNavLink ? 'bg-gray-100 dark:bg-borderDarkMode text-primaryColor' : ' text-textColor bg-transparent '} dark:text-white hover:dark:bg-borderDarkMode flex justify-start items-center gap-[10px] rounded-[6px] p-[10px] border-transparent   shadow-none `}>
                <i className={`${nav.icon} text-[22px] `}></i>
                <span className="">{nav.label}</span>
              </Button>
            )
          )
        })
      }
    </div>
  )
})



