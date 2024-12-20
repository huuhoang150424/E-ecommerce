import { Rating } from "@/components/user";
import { cn } from "@/lib/utils";


interface Props {
  product?: any;
  className?: string
}


export default function RelateProduct({product,className}:Props) {
  return (
    <div className={cn("relative flex items-center gap-[15px]  pl-[15px] pr-[50px] py-[15px] border border-gray-200 bg-[#f8f8fb] rounded-[4px] group ",className)} >
      <img 
        src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/product-images/9_1.jpg" 
        alt="Sản phẩm liên quan" 
        className="object-cover w-[90px] h-[75px] border border-gray-200 rounded-[4px] " 
      />
      <div className="flex flex-col ">
        <h3 className="text-[15px] text-textColor font-[500] ">Tên sản phẩm</h3>
        <Rating
          countStar={4}
          styleStar="text-[10px] "
          classList="flex items-center gap-[4px] "
        />
        <div className="">
          <h4 className="text-[14px] text-gray-400 font-[500] ">100.000 vnđ</h4>
          <span className=""></span>
        </div>
      </div>
      <div className="absolute opacity-0 group-hover:opacity-100 flex items-center right-[10px] top-[10px] justify-center px-[8px] py-[7px]  bg-primaryColor rounded-[4px]  transition-all duration-500 ease-in-out cursor-pointer " >
        <i className="fa-solid fa-plus text-white "></i>
      </div>
    </div>
  )
}
