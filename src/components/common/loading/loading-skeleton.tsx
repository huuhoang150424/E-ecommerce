interface  SkeletonListProps {
  count?: number; 
  className?: string
};
import { cn } from "@/lib/utils";

export  function LoadingSkeleton() {
  return (
    <div className='  rounded-[8px] overflow-hidden'>
      <div className='animate-pulse flex flex-col items-center justify-between w-full h-full   rounded '>
        <div className='h-[200px] w-[100%] bg-slate-300 rounded-[10px] mr-auto' />
        <div className='h-2 w-full bg-slate-300 rounded-[10px] mt-[25px]' />
        <div className='h-6 w-full bg-slate-300 rounded-[10px] mt-[10px]' />
      </div>
    </div>
  )
}

export  function SkeletonList({ count ,className}: SkeletonListProps) {
  return (
    <div className={cn(`mt-[30px] grid grid-cols-5 gap-[30px]`,className) }>
      {Array(count).fill(0).map((_, index) => (
        <LoadingSkeleton key={index} />
      ))}
    </div>
  )
}


