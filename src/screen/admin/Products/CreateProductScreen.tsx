import { Ckeditor } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function CreateProductScreen() {
  const [date, setDate] = useState<Date>()
  const [countImage, setCountImage] = useState(1)


  return (
    <div className=" ">
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Thêm mới sản phẩm</h1>
      <form onSubmit={() => { }} action="POST" >
        <div className="border border-gray-200 p-[20px] rounded-[6px]">
          <div className="grid grid-cols-12 gap-[30px] ">
            <div className=" col-span-6 flex flex-col gap-[20px] ">
              <div className="flex flex-col gap-3 w-full ">
                <div className="">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Tên sản phẩm :
                  </Label>
                  {/* <span className="text-red-500 text-[12px] font-[500] ml-[5px] ">Tên sản phẩm không được để trống</span> */}
                </div>
                <Input
                  id="categories_name"
                  className=" px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                  placeholder="tên sản phẩm"
                //{...register('category_name')}
                />
              </div>
              <div className="flex flex-col gap-3 w-full ">
                <div className="">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Tên sản phẩm :
                  </Label>
                  {/* <span className="text-red-500 text-[12px] font-[500] ml-[5px] ">Giá sản phẩm</span> */}
                </div>
                <Input
                  id="categories_name"
                  className=" px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                  placeholder="giá sản phẩm "
                //{...register('category_name')}
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <div className="">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Ảnh đại diện sản phẩm :
                  </Label>
                  {/* <span className="text-red-500 text-[12px] font-[500] ml-[5px] ">Tên sản phẩm không được để trống</span> */}
                </div>
                <div className="rounded-[4px] border-[2px] border-gray-200 border-dashed p-[20px] w-[40%] flex flex-col items-center  justify-center cursor-pointer">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT67r9f-NOwnjJU-lWuGdP4DYtj_2mV2VK6_g&s"
                    alt="Ảnh đại diện sản phẩm"
                    className="object-cover max-w-[210px] h-[200px]"
                  />
                  <input
                    className="hidden "
                    type="file"
                  />
                  {/* <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                      <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" data-original="#000000" />
                      <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" data-original="#000000" />
                    </svg>
                    <span className="text-[16px]  text-gray-400">image</span>
                  </div> */}
                </div>
              </div>
            </div>
            <div className=" col-span-6 flex flex-col gap-[20px] ">
              <div className="flex flex-col gap-3 w-full ">
                <div className="">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Số lượng sản phẩm :
                  </Label>
                  {/* <span className="text-red-500 text-[12px] font-[500] ml-[5px] ">Tên sản phẩm không được để trống</span> */}
                </div>
                <Input
                  id="categories_name"
                  className=" px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                  placeholder="số lượng sản phẩm"
                //{...register('category_name')}
                />
              </div>
              <div className="flex flex-col gap-3 w-full ">
                <div className="">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Ngày ra mắt sản phẩm :
                  </Label>
                  {/* <span className="text-red-500 text-[12px] font-[500] ml-[5px] ">Tên sản phẩm không được để trống</span> */}
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "max-w-[280px] justify-start text-left font-normal text-textColor",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span className=" ">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className=" flex flex-col gap-3 w-full ">
                <div className="">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Ảnh mô tả sản phẩm :
                  </Label>
                  {/* <span className="text-red-500 text-[12px] font-[500] ml-[5px] ">Tên sản phẩm không được để trống</span> */}
                </div>
                <ul className="flex items-center gap-[15px] ">
                  {
                    Array(countImage).fill(0).map((_, index) => {
                      return (
                        <li key={index} className="rounded-[4px] border-[2px] border-gray-200 border-dashed py-[15px] px-[20px] flex flex-col items-center  justify-center cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                            <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" data-original="#000000" />
                            <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" data-original="#000000" />
                          </svg>
                          <span className="text-[16px]  text-gray-400">image</span>
                        </li>
                      )
                    })
                  }
                  <li onClick={() => setCountImage(countImage > 4 ? 5 : countImage + 1)} className="rounded-[4px] border-[2px] border-gray-200 border-dashed py-[10px] px-[15px] flex flex-col items-center  justify-center cursor-pointer">
                    <i className="fa-solid fa-plus text-[30px] text-gray-400  "></i>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-3 w-full ">
                <div className="">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Lựa chọn danh mục sản phẩm :
                  </Label>
                  {/* <span className="text-red-500 text-[12px] font-[500] ml-[5px] ">Tên sản phẩm không được để trống</span> */}
                </div>

                <Select>
                  <SelectTrigger className="max-w-[300px] text-textColor">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <ScrollArea className="h-[100px] ">
                        <SelectLabel className="text-textColor ">Danh mục</SelectLabel>
                        <SelectItem className="text-textColor " value="apple">Apple</SelectItem>
                        <SelectItem className="text-textColor " value="banana">Banana</SelectItem>
                        <SelectItem className="text-textColor " value="blueberry">Blueberry</SelectItem>
                        <SelectItem className="text-textColor " value="grapes">Grapes</SelectItem>
                        <SelectItem className="text-textColor " value="pineapple">Pineapple</SelectItem>
                      </ScrollArea>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full mt-[15px] ">
            <div className="">
              <Label htmlFor="categories_name" className="text-textColor ">
                Mô tả sản phẩm :
              </Label>
              {/* <span className="text-red-500 text-[12px] font-[500] ml-[5px] ">Tên sản phẩm không được để trống</span> */}
            </div>
            <Ckeditor />
          </div>
        </div>
        <div className="mt-[30px] w-full flex justify-end "><Button variant={'outline'} className="mb-[30px] text-textColor " onClick={(e: any) => { e.preventDefault() }}>Thêm mới sản phẩm</Button></div>
      </form>
    </div>
  )
}
