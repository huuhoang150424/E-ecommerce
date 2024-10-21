import { themes } from '@/constant/theme';
import { useState, useEffect } from 'react';

interface Props {
  onClose?: () => void;
  children?: React.ReactNode;
  isOpen: boolean; 
}
function VerticalDrawer({ onClose, isOpen }: Props) {
  const [primaryColor,setPrimaryColor]=useState(localStorage.getItem("themColor") || "#6c7de2");
  const [mounted, setMounted] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setOverlayVisible(true); 
    } else {
      setOverlayVisible(false); 
    }
  }, [isOpen]);

  const handleClose = () => {
    setOverlayVisible(false);
    setMounted(false);
    setTimeout(() => {
      if (onClose) onClose(); // Sau khi kết thúc animation, gọi hàm onClose
    }, 500); // Đồng bộ thời gian với CSS transition
  };
  //set global color
  const handleChangeColor=(e:string)=>{
    localStorage.setItem("themColor",e);
    setPrimaryColor(e);
    document.documentElement.style.setProperty("--primary-color", e);
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-end">
      {/* Overlay */}
      <div
          className={`absolute w-full h-full top-0 left-0 bg-black z-10 transition-opacity duration-500 ${
            overlayVisible ? 'fade-in' : 'fade-out'
          }`}
          onClick={handleClose}
        ></div>
      {/* Drawer */}
      <div
        className={`z-20 bg-white relative h-full w-[300px] transform transition-all duration-500 px-[20px] py-[20px] ${
          mounted ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4 rounded-full w-[30px] h-[30px] bg-slate-200 flex items-center justify-center"
          onClick={handleClose}
        >
          <i className="fa-solid fa-xmark text-iconColorAmin text-[16px]"></i>
        </button>
        <h1 className='text-[18px] font-[700] text-textColor'>Công cụ</h1>
        <div className="w-full h-[1px] my-[20px] bg-lineColor opacity-50"></div>
        <div className=''>
          <h2 className='text-[16px] font-[400] text-textColor mb-[15px] '>Chọn màu</h2>
          <ul className='grid grid-cols-4 grid-rows-2 gap-4'>
            {
              themes.map((them)=>{
                return (
                  <li onClick={()=>handleChangeColor(them.color)} style={{backgroundColor: them.color}} key={them.id} className={`flex items-center justify-center w-[50px] h-[50px] rounded-[8px] cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out`}>
                    {
                      primaryColor===them.color?<i className="fa-solid fa-check text-[18px] text-white"></i>:null
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>  
        <div className='mt-[20px]'>
          <h2 className='text-[16px] font-[400] text-textColor mb-[15px] '>Sáng tối</h2>
          {/* <ul className='grid grid-cols-4 grid-rows-2 gap-4'>
            {
              Array(8).fill(0).map((_,index)=>{
                return (
                  <li key={index} className='w-[50px] h-[50px] bg-primaryColor rounded-[8px] cursor-pointer'></li>
                )
              })
            }
          </ul> */}
        </div>
        <div className='mt-[20px]'>
          <h2 className='text-[16px] font-[400] text-textColor mb-[15px] '>Background</h2>
          {/* <ul className='grid grid-cols-4 grid-rows-2 gap-4'>
            {
              Array(8).fill(0).map((_,index)=>{
                return (
                  <li key={index} className='w-[50px] h-[50px] bg-primaryColor rounded-[8px] cursor-pointer'></li>
                )
              })
            }
          </ul> */}
        </div>
      </div>
    </div>
  );
}
VerticalDrawer.displayNam='VerticalDrawer';

export default VerticalDrawer;