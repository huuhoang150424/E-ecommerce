import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardItem } from "@/components/user";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { useQuery } from "@tanstack/react-query";
import { filterProductByCats, filterProductByPrices, filterProductByRating, getCats, getProductSearch } from "@/screen/user/search/api";
import { SkeletonList } from "@/components/common";

export default function SearchScreen() {
  const [toPrice, setToPrice] = useState<number | 0>(0);
  const [fromPrice, setFromPrice] = useState<number | 100>(100);
  const [listKeyword, setListKeyword] = useState<string[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const param = useParams();
  //state filter
  const [checkedStates, setCheckedStates] = useState<{ [key: number]: boolean, categoryId: string }>({
    categoryId: '',
  });
  const [checkedRating, setCheckedRating] = useState<{ [key: number]: boolean, rating: number }>({
    rating: 0,
  });
  //filter product by category
  const handleCheckboxChangeCategory = (index: number, categoryId: string) => {
    setCheckedStates((prevState) => ({
      [index]: !prevState[index],
      categoryId: !prevState[index] ? categoryId : ''
    }));
    //xóa state rating khi lọc theo category
    setCheckedRating({ rating: 0 })
  };
  const { data: dataFilterByCat, isLoading: isLoadingFilterByCat } = useQuery({
    queryKey: ['filterProductByCategory', { categoryId: checkedStates.categoryId || '' }],
    queryFn: ({ queryKey }: { queryKey: [string, { categoryId: string }] }) => {
      const [, { categoryId }] = queryKey;
      return filterProductByCats(categoryId);
    },
    enabled: !!checkedStates.categoryId //chỉ gọi api khi categoryId thay đổi
  })

  //filter product by rating
  const handleCheckboxChangeRating = (index: number, rating: number) => {
    setCheckedRating((prevState) => ({
      [index]: !prevState[index],
      rating: !prevState[index] ? rating : 5
    }));
    //xóa state category khi lọc theo rating
    setCheckedStates({ categoryId: '' })
  };
  const { data: dataFilterByRating, isLoading: isLoadingFilterByRating } = useQuery({
    queryKey: ['filterProductByRatings', { rating: checkedRating.rating }],
    queryFn: ({ queryKey }: { queryKey: [string, { rating: number }] }) => {
      const [, { rating }] = queryKey;
      return filterProductByRating(rating);
    },
    enabled: !!checkedRating.rating //chỉ gọi api khi rating thay đổi
  })

  //data search
  const { data: dataSearch, isLoading: isLoadingSearch } = useQuery({
    queryKey: ['searchProducts', { keyword: param.keyword || '' }],
    queryFn: ({ queryKey }: { queryKey: [string, { keyword: string }] }) => {
      const [, { keyword }] = queryKey;
      return getProductSearch(keyword);
    }
  })
  useEffect(() => {
    setListKeyword(dataSearch?.result?.keyword)
  }, [dataSearch])

  //data cat
  const { data: dataCat } = useQuery({
    queryKey: ['catSearch'],
    queryFn: getCats
  })


  const { data: dataFilterByPrice, isLoading: isLoadingFilterByPrice } = useQuery({
    queryKey: ['filterProductByPrices', { minPrice: Number(toPrice), maxPrice: Number(fromPrice) }],
    queryFn: ({ queryKey }: { queryKey: [string, { minPrice: number; maxPrice: number }] }) => {
      const [_, { minPrice, maxPrice }] = queryKey;
      return filterProductByPrices(minPrice * 1000, maxPrice * 1000);
    },
    enabled: isFilterApplied
  });

  const filterProductByPrice = () => {
    setIsFilterApplied(true)
  };
  console.log(dataFilterByPrice?.result?.data)
  return (
    <div className="my-[50px]">
      <div className="grid grid-cols-12 grid-rows-1 gap-6 ">
        <div className="col-span-3  border border-gray-200 rounded-[4px] overflow-hidden  px-[20px] pb-[20px] self-start sticky top-[30px] ">
          {/* filter by category */}
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="w-full  py-[12px] border-b-[1px] border-gray-200 text-[17px] font-[600] text-textColor">Danh mục</AccordionTrigger>
              <AccordionContent className="py-[10px] ">
                {
                  dataCat?.result?.data.map((item: any, index: number) => {
                    return (
                      <div key={index} className="flex items-center gap-[15px] py-[8px] ">
                        <Checkbox
                          id={`checkbox-category-${index}`}
                          className="outline-none w-[18px] h-[18px]"
                          checked={!!checkedStates[index]}
                          onCheckedChange={() => handleCheckboxChangeCategory(index, item.id)}
                        />
                        <label
                          htmlFor={`checkbox-category-${index}`}
                          className="text-[15px] text-textColor font-[400] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item?.category_name}
                        </label>
                      </div>
                    )
                  })
                }
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* filter by rating */}
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="w-full  py-[12px] border-b-[1px] border-gray-200 text-[17px] font-[600] text-textColor">Số sao đánh giá</AccordionTrigger>
              <AccordionContent className="py-[10px] ">
                {
                  Array(5).fill(0).map((_, index) => {
                    return (
                      <div key={index} className="flex items-center gap-[15px] py-[8px] ">
                        <Checkbox
                          id={`terms-rating-${index}`}
                          className="outline-none  w-[18px]  h-[18px] "
                          checked={!!checkedRating[index]}
                          onCheckedChange={() => handleCheckboxChangeRating(index, index + 1)}
                        />
                        <label
                          htmlFor={`terms-rating-${index}`}
                          className="text-[15px] text-textColor font-[400] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {index + 1} sao  <i className="fa-solid fa-star text-[12px] text-yellow-300 "></i>
                        </label>
                      </div>
                    )
                  })
                }
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* filter by price */}
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="w-full  py-[12px] border-b-[1px] border-gray-200 text-[17px] font-[600] text-textColor">Giá cả</AccordionTrigger>
              <AccordionContent className="py-[10px] ">
                <div className="w-full flex justify-center items-center gap-[10px]  bg-gray-100 py-[10px] rounded-[4px] mb-[20px] ">
                  <div className="flex flex-col gap-[5px] justify-center items-center">
                    <span className="text-[14px] font-[400] text-gray-400 ">Từ (k)</span>
                    <Input
                      value={toPrice}
                      onChange={(e: any) => {
                        setToPrice(e.target.value);
                        setIsFilterApplied(false);
                      }
                      }
                      className=" outline-none  w-[50px]  text-center bg-white px-[0px] py-[4px] "
                    />
                  </div>
                  <div className="w-[10px] h-[1px] bg-gray-400"></div>
                  <div className="flex flex-col gap-[5px] justify-center items-center">
                    <span className="text-[14px] font-[400] text-gray-400 ">Đến (k)</span>
                    <Input
                      value={fromPrice}
                      onChange={(e: any) => {
                        setFromPrice(e.target.value)
                        setIsFilterApplied(false);
                      }}
                      className=" outline-none  w-[50px]  text-center bg-white px-[0px] py-[4px] "
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="">
            <Button onClick={filterProductByPrice} className=" w-full bg-primaryColor hover:bg-primaryColor hover:opacity-80 transition-all duration-300 ease-linear ">Lọc</Button>
            <Button
              onClick={() => {
                setToPrice(0);
                setFromPrice(100);
                setIsFilterApplied(false);
              }}
              variant={'outline'}
              className="mt-[15px] w-full hover:opacity-80 transition-all duration-300 ease-linear text-textColor">
              Xóa bộ lọc
            </Button>
          </div>
        </div>
        <div className="col-span-9   ">
          <div className="border border-gray-200 rounded-[4px] pl-[20px] py-[6px] flex items-center justify-between ">
            <div className="flex items-center gap-[10px] ">
              <h2 className="text-[15px] font-[500] text-textColor ">Kết quả tìm kiếm cho từ khóa: </h2>
              <span className="text-[15px] text-primaryColor font-[500] ">{param.keyword}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'outline'} className=" outline-none border-none shadow-none hover:bg-transparent mr-[5px] flex items-center gap-[20px]   ">
                  <span className="text-[16px] text-textColor">Lọc</span>
                  <i className="fa-solid fa-chevron-down text-[16px] text-textColor"></i>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="" align='end'>
                <ScrollArea className=" rounded-md h-[120px] ">
                  <ul className="p-[5px] flex flex-col gap-[4px] ">
                    <li className=" px-[8px] py-[4px] flex items-center justify-center cursor-pointer bg-gray-100 rounded-[4px] transition-all duration-300 ease-in-out ">
                      <span className="text-[15px] font-[400] text-textColor ">Thời gian</span>
                    </li>
                    <li className=" px-[8px] py-[4px] flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-[4px] transition-all duration-300 ease-in-out ">
                      <span className="text-[15px] font-[400] text-textColor ">Đã ra mắt</span>
                    </li>
                    <li className=" px-[8px] py-[4px] flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-[4px] transition-all duration-300 ease-in-out ">
                      <span className="text-[15px] font-[400] text-textColor ">Đã ra mắt</span>
                    </li>
                    <li className=" px-[8px] py-[4px] flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-[4px] transition-all duration-300 ease-in-out ">
                      <span className="text-[15px] font-[400] text-textColor ">Đã ra mắt</span>
                    </li>
                  </ul>
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="my-[15px] flex items-center justify-between ">
            <h2 className="text-[15px] text-textColor">Các từ khóa liên quan</h2>
            <ul className="flex items-center gap-[15px] ">
              {
                listKeyword?.slice(0, 4)?.map((keyword: string, index: number) => {
                  return (
                    <li key={index} className="flex items-center gap-[5px] border border-gray-200 rounded-[4px] px-[12px] py-[2px] cursor-pointer">
                      <span className="text-[14px] text-textColor">{keyword}</span>
                      <i className="fa-solid fa-xmark text-[12px] text-red-400"></i>
                    </li>
                  )
                })
              }

              <li className="flex items-center gap-[5px]  border border-gray-200 rounded-[4px] px-[12px] py-[2px] bg-primaryColor cursor-pointer ">
                <span className="text-[14px] text-white ">Xóa tất cả</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[20px] justify-between items-center  ">
            {
              (isLoadingSearch || isLoadingFilterByCat || isLoadingFilterByRating || isLoadingFilterByPrice) ? (
                <SkeletonList className="mt-[40px]" count={10} />
              ) : (
                <>
                  {
                    (checkedStates.categoryId && dataFilterByCat?.result?.data?.length === 0) ||
                      (checkedRating.rating && dataFilterByRating?.result?.data?.length === 0) ||
                      (dataFilterByPrice?.result?.data?.length === 0 && isFilterApplied)
                      ? (
                        <>
                          <img
                            src="https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-illustration-download-in-svg-png-gif-file-formats--no-records-list-record-emply-data-user-interface-pack-design-development-illustrations-6430781.png?f=webp"
                            alt="empty"
                            className="object-cover w-[300px] h-[300px] mt-[100px]"
                          />
                          <span className="text-gray-500 text-[20px] font-[500]">Không tìm thấy kết quả lọc</span>
                        </>
                      ) : (
                        <div className="grid grid-cols-4 gap-4 mt-[20px]">
                          {
                            checkedStates.categoryId
                              ? dataFilterByCat?.result?.data?.map((item: any, index: number) => (
                                <CardItem key={index} product={item} />
                              ))
                              : checkedRating.rating
                                ? dataFilterByRating?.result?.data?.map((item: any, index: number) => (
                                  <CardItem key={index} product={item} />
                                ))
                                : isFilterApplied ? dataFilterByPrice?.result?.data?.map((item: any, index: number) => (
                                  <CardItem key={index} product={item} />
                                )) : dataSearch?.result?.data?.map((item: any, index: number) => (
                                  <CardItem key={index} product={item} />
                                ))
                          }
                        </div>
                      )
                  }
                </>
              )
            }


          </div>
        </div>
      </div>
      <div className="my-[50px] ">
        <div className="flex justify-center ">
          <Button className="min-w-9 rounded-full border border-gray-200 bg-white text-textColor  py-2 px-3.5 text-center text-sm transition-all duration-300 ease-linear  hover:shadow-lg focus:bg-primaryColor focus:shadow-none active:bg-primaryColor active:text-white focus:text-white hover:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
            Prev
          </Button>
          <Button className="min-w-9 rounded-full border border-gray-200 bg-white text-textColor  py-2 px-3.5 text-center text-sm transition-all duration-300 ease-linear  hover:shadow-lg focus:bg-primaryColor focus:shadow-none active:bg-primaryColor active:text-white focus:text-white hover:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
            1
          </Button>
          <Button className="min-w-9 rounded-full border border-gray-200 bg-white text-textColor  py-2 px-3.5 text-center text-sm transition-all duration-300 ease-linear  hover:shadow-lg focus:bg-primaryColor focus:shadow-none active:bg-primaryColor active:text-white focus:text-white hover:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
            2
          </Button>
          <Button className="min-w-9 rounded-full border border-gray-200 bg-white text-textColor  py-2 px-3.5 text-center text-sm transition-all duration-300 ease-linear  hover:shadow-lg focus:bg-primaryColor focus:shadow-none active:bg-primaryColor active:text-white focus:text-white hover:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
