import VerticalDrawer from "@/components/common/VerticalDrawer";
import { Button } from "@/components/ui/button"
import { BreadcrumbCustom, Footer, Header } from "@/components/user"
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode
}



export default function MainLayout({ children }: Props) {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [hiddenScroll, setHiddenScroll] = useState(false);
  const [animateScroll, setAnimateScroll] = useState(false);
  //handle scroll
  const handleScroll = () => {
    if (window.scrollY > 400) {
      setAnimateScroll(true);
      setTimeout(() => setHiddenScroll(true), 300);
    } else {
      setAnimateScroll(false);
      setTimeout(() => setHiddenScroll(false), 300);
    }
  };
  const scrollToTop = (duration = 2000) => {
    const start = window.scrollY;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutCubic(progress);
      window.scrollTo(0, start * (1 - easeProgress));
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className=''>
      <Header />
      <div className="wrapper ">
        {/* <BreadcrumbCustom /> */}
        <main>
          {children}
        </main>
      </div>
      <Button size={'square'} variant={'primaryColor'} className=" fixed p-[8px]  top-[47%] right-[2%] z-[30] " onClick={() => setVisibleDrawer(true)}><i className="fa-solid fa-gear text-white text-[22px] animate-[spin_5s_linear_infinite]"></i></Button>
      {
        hiddenScroll && (<Button size={'square'} variant={'primaryColor'} className={` fixed p-[8px]  top-[87%] right-[2%] ${animateScroll ? 'fade-in-scroll' : 'fade-out-scroll'}`} onClick={() => scrollToTop(2000)}><i className="fa-solid fa-arrow-up text-white text-[20px]"></i></Button>)
      }
      {/* VerticalDrawer */}
      {visibleDrawer && (
        <VerticalDrawer isOpen={visibleDrawer} onClose={() => setVisibleDrawer(false)}></VerticalDrawer>
      )}
      <Footer />
    </div>
  )
}
