
import { Input } from "@/components/ui/input";
import {Tables} from "@/components/admin";






export default function ProductScreen() {



  return (
    <div className="">
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Danh sách sản phẩm</h1>
      <div className="flex">
        <Input 
          className="w-[240px] px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400] mb-[15px] "
          placeholder="tìm kiếm sản phẩm"
        />
      </div>

      <div className=" ">
        <Tables 
          className="mb-[100px] border border-gray-200 shadow-none"
        />
      </div>
    </div>
  )
}