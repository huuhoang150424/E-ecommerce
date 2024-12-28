import { useEffect, useRef, useState } from 'react';
import Router from './router/Router';
import { Toaster } from './components/ui/toaster';

function App() {
  const cursorMouse = useRef<HTMLDivElement | null>(null);
  const smallDot = useRef<HTMLDivElement | null>(null); 
  const mousePosition = useRef({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  //update Color
  useEffect(()=>{
    document.documentElement.style.setProperty("--primary-color", localStorage.getItem("themColor") || "#6c7de2");
  },[])
  const updateCursorPosition = () => {
    const { x, y } = mousePosition.current;
    if (x !== lastMousePosition.current.x || y !== lastMousePosition.current.y) {
      if (cursorMouse.current) {
        cursorMouse.current.style.transform = `translate(${x + window.scrollX}px, ${y + window.scrollY}px)`;
      }
      if (smallDot.current) {
        smallDot.current.style.transform = `translate(${x + window.scrollX}px, ${y + window.scrollY}px)`;
      }
      lastMousePosition.current = { x, y };
    }
    requestAnimationFrame(updateCursorPosition);
  };

  const handleMouseMove = (e: MouseEvent) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(updateCursorPosition);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className=''>
      <Toaster/>
      <div
        ref={cursorMouse}
        className='w-[40px] h-[40px] rounded-full bg-transparent border-[2px] border-primaryColor absolute left-0 top-0 z-[999998] transition-transform duration-1000 ease-out pointer-events-none'
      ></div>
      <div
        ref={smallDot}
        className='w-2 h-2 rounded-full bg-primaryColor absolute left-[17px] top-[17px] z-[999999] transition-transform duration-500 ease-out pointer-events-none'
      ></div>
      <Router />
    </div>
  );
}

export default App;
