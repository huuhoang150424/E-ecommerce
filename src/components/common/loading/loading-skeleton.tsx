

export default function LoadingSkeleton() {
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
