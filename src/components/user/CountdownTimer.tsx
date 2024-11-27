import { cn } from "@/lib/utils"
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  time?: number
}

export default function CountdownTimer({ className, time }: Props) {
  const [timeDown, setTimeDown] = useState<number | 0>(time ?? 0);

  useEffect(() => {
    if (timeDown <= 0) {
      return;
    }
    const timmer = setInterval(() => {
      setTimeDown((prev) => prev - 1)
    }, 1000)
    return () => {
      clearInterval(timmer)
    }
  }, [timeDown])
  // console.log(timeDown)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  return (
    <div className={cn('flex w-[20%] mx-auto mb-[30px] gap-[5px] items-center justify-center rounded-[10px] px-[4px] py-[4px] bg-gray-100 border border-gray-200', className)}>
      <span className='text-[14px] font-[500] text-gray-500 '>{formatTime(timeDown)}</span>
      <i className="fa-regular fa-clock text-gray-500"></i>
    </div>
  )
}
