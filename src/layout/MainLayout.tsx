import VerticalDrawer from "@/components/common/VerticalDrawer";
import { Button } from "@/components/ui/button"
import { BreadcrumbCustom, Footer, Header } from "@/components/user"
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode
}



export default function MainLayout({children}:Props) {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [hiddenScroll,setHiddenScroll]=useState(false);
  const [animateScroll,setAnimateScroll]=useState(false);
  //handle scroll
  const handleScroll=()=>{
    if (window.scrollY>400) {
      setAnimateScroll(true);
      setTimeout(()=>setHiddenScroll(true),300)
    } else {
      setAnimateScroll(false);
      setTimeout(()=>setHiddenScroll(false),300)
    }
  }
  const scrollToTop=()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
    return ()=>{
      window.removeEventListener('scroll',handleScroll);
    }
  },[])
  return (
    <div className=''>
      <Header/>
      <div className="wrapper ">
        <BreadcrumbCustom/>
        <main>
          {children}
        </main>
      </div>
      <Button size={'square'} variant={'primaryColor'} className=" fixed p-[8px]  top-[47%] right-[2%] " onClick={() => setVisibleDrawer(true)}><i className="fa-solid fa-gear text-white text-[22px] animate-[spin_5s_linear_infinite]"></i></Button>
      {
        hiddenScroll && (<Button size={'square'} variant={'primaryColor'} className={` fixed p-[8px]  top-[87%] right-[2%] ${animateScroll? 'fade-in-scroll': 'fade-out-scroll'}`} onClick={() => scrollToTop()}><i className="fa-solid fa-arrow-up text-white text-[20px]"></i></Button>)
      }
      {/* VerticalDrawer */}
      {visibleDrawer && (
        <VerticalDrawer isOpen={visibleDrawer} onClose={() => setVisibleDrawer(false)}></VerticalDrawer>
      )}
      <Footer/>
    </div>
  )
}
