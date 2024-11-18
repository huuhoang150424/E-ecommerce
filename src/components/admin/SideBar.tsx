import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area"
import { navIcon } from "@/constant/pathName";



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
    <nav className={cn(`${isCollapsed ? "w-[60px]" : "w-[250px]"}  h-[100vh] sticky top-0 left-0  transition-all duration-500 ease-in-out`,className)}>
    <ScrollArea className={`border-r-[1px] h-[100%] border-gray-300 dark:border-borderDarkMode   `}>
      <Button
        onClick={() => setIsCollapsed(!isCollapsed)}
        variant="default"
        size="square"
        className={`${isCollapsed ? 'right-[-25%]' : 'right-[-6%]'} bg-textColor absolute top-[50%] transition-all duration-500 ease-in-out z-50 rounded-full flex items-center justify-center px-[11px] py-[8px]`}
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
    </ScrollArea>
  </nav>
  );
}



interface PropsNavLink {
  isCollapsed: boolean;

}

const NavLinkIcon = memo(({ isCollapsed }: PropsNavLink) => {
  
  const [activeNavLink, setActiveNavLink] = useState(() => {
    const navLink=localStorage.getItem("navId");
    return navLink !==null ? parseFloat(navLink):0
  });

  const [openValues, setOpenValues] = useState<string[]>(() => {
    const storedValues = localStorage.getItem("accordionOpenValues");
    return storedValues ? JSON.parse(storedValues) : [];
  });

  const navigate = useNavigate();

  const handleClick = (nav: string, id: number) => {
    localStorage.setItem("navId",id.toString());
    navigate(nav);
    setActiveNavLink(id);
  };

  useEffect(() => {
    localStorage.setItem("accordionOpenValues", JSON.stringify(openValues));
  }, [openValues]);

  const renderNavItems = (navItems: navIcon[],level:number=0) => {
    return navItems.map(nav => (
      <div key={nav.id}>
        {isCollapsed ? (
          <div className="relative flex items-center justify-center">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  onClick={() => handleClick(nav.navigate, nav.id)}
                  size={'square'}
                  variant={'outline'}
                  className={`${nav.id === activeNavLink ? 'bg-gray-100 dark:bg-borderDarkMode text-primaryColor' : 'text-black bg-transparent'} dark:text-white rounded-[6px] p-[10px] border-transparent shadow-none`}
                >
                  <i className={`${nav.icon} text-[22px]`}></i>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="absolute left-[35px] top-[-46px] w-[90px] px-[10px] py-[8px] z-[100] ">
                <span className="text-[14px] text-black">{nav.label}</span>
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          nav.isAccordion ? (
            <Accordion 
              type="multiple"
              value={openValues}
              onValueChange={(values) => {
                setOpenValues(values);
              }}
            >
              <AccordionItem value={`item-${nav.id}`} className="border-transparent">
                <AccordionTrigger className={` w-full hover:bg-accent transition-all duration-300 ease-in-out dark:hover:bg-borderDarkMode flex justify-between items-center gap-[10px] rounded-[6px] p-[10px] shadow-none text-black hover:border-none dark:text-white`}>
                  <div className="flex items-center gap-[10px] ">
                    <i className={`${nav.icon} text-[20px] `}></i>
                    <span className="text-[14px]">{nav.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`mt-[5px] ml-[15px] pl-[5px] border-l-[1px] flex flex-col gap-[5px]   `}>
                  {renderNavItems(nav.children,level+1)} 
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Button
              onClick={() => handleClick(nav.navigate, nav.id)}
              size={'square'}
              variant={'outline'}
              className={`${nav.id === activeNavLink ? ' bg-gray-100 dark:bg-borderDarkMode text-primaryColor' : 'text-black bg-transparent'} w-[100%] dark:text-white hover:dark:bg-borderDarkMode flex justify-start items-center gap-[10px] rounded-[6px] p-[10px] border-transparent shadow-none`}
            >
              <i className={`${nav.icon} text-[20px]`}></i>
              <span className="text-[14px] ">{nav.label}</span>
            </Button>
          )
        )}
      </div>
    ));
  };

  return (
    <div className="px-[4px] py-[8px] flex flex-col gap-[8px] overflow-hidden ">
      {renderNavItems(navIcon)} 
    </div>
  );
});
