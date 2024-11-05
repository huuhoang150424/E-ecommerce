import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";


export default function SearchScreen() {
  const [toPrice, setToPrice] = useState(0);
  const [fromPrice, setFromPrice] = useState(100);


  return (
    <div className="my-[50px]">
      <div className="grid grid-cols-12 grid-rows-1 gap-6 ">
        <div className="col-span-3  border border-gray-200 rounded-[4px] overflow-hidden  px-[20px] pb-[20px] ">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="w-full  py-[12px] border-b-[1px] border-gray-200 text-[17px] font-[600] text-textColor">Danh mục</AccordionTrigger>
              <AccordionContent className="py-[10px] ">
                {
                  Array(4).fill(0).map((_, index) => {
                    return (
                      <div key={index} className="flex items-center gap-[15px] py-[8px] ">
                        <Checkbox id="terms" className="outline-none  w-[18px]  h-[18px] " />
                        <label
                          htmlFor="terms"
                          className="text-[15px] text-textColor font-[400] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Đồ ăn truyền thống
                        </label>
                      </div>
                    )
                  })
                }
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="w-full  py-[12px] border-b-[1px] border-gray-200 text-[17px] font-[600] text-textColor">Kích thước</AccordionTrigger>
              <AccordionContent className="py-[10px] ">
                {
                  Array(4).fill(0).map((_, index) => {
                    return (
                      <div key={index} className="flex items-center gap-[15px] py-[8px] ">
                        <Checkbox id="terms" className="outline-none  w-[18px]  h-[18px] " />
                        <label
                          htmlFor="terms"
                          className="text-[15px] text-textColor font-[400] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          500 kg
                        </label>
                      </div>
                    )
                  })
                }
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="w-full  py-[12px] border-b-[1px] border-gray-200 text-[17px] font-[600] text-textColor">Giá cả</AccordionTrigger>
              <AccordionContent className="py-[10px] ">
                <div className="w-full flex justify-center items-center gap-[10px]  bg-gray-100 py-[10px] rounded-[4px] mb-[20px] ">
                  <div className="flex flex-col gap-[3px] justify-center items-center">
                    <span className="text-[14px] font-[400] text-gray-400 ">Từ</span>
                    <Input
                      value={toPrice}
                      onChange={(e: any) => setToPrice(e.target.value)}
                      className=" outline-none  w-[40px]  text-center bg-white px-[0px] py-[4px] "
                    />
                  </div>
                  <div className="w-[10px] h-[1px] bg-gray-400"></div>
                  <div className="flex flex-col gap-[3px] justify-center items-center">
                    <span className="text-[14px] font-[400] text-gray-400 ">Đến</span>
                    <Input
                      value={fromPrice}
                      onChange={(e: any) => setFromPrice(e.target.value)}
                      className=" outline-none  w-[40px]  text-center bg-white px-[0px] py-[4px] "
                    />
                  </div>
                </div>
                <Slider className=" rounded-[20px] " defaultValue={[0]} max={100} step={1} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="">
            <Button className="mt-[20px] w-full bg-primaryColor hover:bg-primaryColor hover:opacity-80 transition-all duration-300 ease-linear ">Xóa bộ lọc</Button>
          </div>
        </div>
        <div className="col-span-9   ">
          <div className="border border-gray-200 rounded-[4px] overflow-hidden ">

          </div>
        </div>
      </div>
    </div>
  )
}
