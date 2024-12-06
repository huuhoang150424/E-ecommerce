import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Rating } from "@/components/user"
import { useState } from "react"
import { Card, CardContent, CardHeader, } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useScrollToTopOnMount from "@/hooks/useScrollToTopOnMount";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "./api";
import { ImageMagnifier, Loading } from "@/components/common";






export default function ProductDetailScreen() {
  useScrollToTopOnMount();
  const [counter, setCounter] = useState(0);
  const [favourite, setFavourite] = useState(false);
  const param = useParams()


  const { isLoading: isLoadingProduct, data: productDetail } = useQuery({
    queryKey: ['productDetail'],
    queryFn: () => getProduct(param.id ?? "")
  })


  return (
    <div className="my-[50px]">
      {
        isLoadingProduct ? (<Loading className="my-[100px] " />) : (<div className="">
          <div className=' grid grid-cols-12 gap-6  '>
            <div className="col-span-9 flex flex-col ">
              <div className="w-full flex gap-6 ">
                <div className="w-[40%] flex flex-col gap-[20px] border border-gray-200 rounded-[4px] overflow-hidden  p-[20px] ">
                  <div className="">
                    <Dialog>
                      <DialogTrigger asChild>
                        <img
                          className="object-cover h-[400px] cursor-pointer "
                          alt=""
                          src={productDetail?.thumb_image}
                        />
                      </DialogTrigger>
                      <DialogContent className="w-[500px] ">
                        <div className="mt-[10px] ">
                          
                          <ImageMagnifier
                            src={productDetail?.thumb_image}
                            width={500}
                            height={400}
                            magnifierHeight={150}
                            magnifierWidth={150}
                            zoomLevel={4}
                            alt="Sample Image"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>

                  </div>
                  <ul className="grid grid-cols-4 gap-4">

                    <li className=" rounded-[4px] border border-primaryColor cursor-pointer overflow-hidden">
                      <img
                        className="object-cover h-[80px] "
                        alt=""
                        src="https://maraviyainfotech.com/projects/grabit-tailwind/grabit-tailwind/assets/img/product-images/4_1.jpg"
                      />
                    </li>
                    {
                      productDetail?.image_urls?.map((img_url:string, index:number) => {
                        return (
                          <li key={index} className=" rounded-[4px] cursor-pointer overflow-hidden">
                            <img
                              className="object-cover h-[80px] "
                              alt=""
                              src={img_url}
                            />
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <div className="w-[60%]  border border-gray-200 rounded-[4px] overflow-hidden p-[20px]  self-start ">
                  <h1 className="text-[26px] font-[600] text-textColor ">{productDetail?.product_name}</h1>
                  <Rating
                    countStar={0}
                    classList="gap-[4px] items-center  mt-[10px]"
                    styleStar="text-[12px] "
                    styleLine="w-[2px] bg-slate-400 h-[18px] mx-[4px] "
                    text="(Đã bán 1k)"
                    styleText="text-[12px] font-[500] text-gray-400 "
                  />
                  <div className="mt-[15px] flex items-center gap-[10px] ">
                    <h1 className="text-[22px] font-[700] text-primaryColor ">{productDetail?.price.toLocaleString('vi-VN')} vnđ</h1>
                    <span className="line-through text-[14px] text-gray-400">20.000 vnđ </span>
                    <div className="px-[4px] py-[1px] rounded-[4px] bg-gray-200 flex items-center justify-center ">
                      <span className="text-[12px] font-[500] text-gray-400 ">-50%</span>
                    </div>
                    <Button onClick={() => setFavourite(!favourite)} size={'square'} variant={'outline'} className="px-[12px] py-[11px] ml-[5px]"><i className={` ${favourite ? 'fa-solid fa-heart text-red-600' : 'fa-regular fa-heart  text-textColor '} transition-all duration-300 ease-linear text-[16px] `}></i></Button>
                  </div>
                  <div className="mt-[10px] ">
                    <ul className="mt-[15px] ml-[0px] flex flex-col gap-1">
                      {
                        productDetail?.product_attributes?.map((item:any)=>{
                          return (
                            <li key={item.id} className=""><strong className="text-[15px] text-textColor">{item?.attribute_name} :   </strong><span className="text-[16px] ml-[4px] text-gray-400"> {item?.value}</span></li>
                          )
                        })
                      }
                    </ul>
                    <div className="product-description mt-[10px] ">
                      {productDetail?.description ? (
                        <div dangerouslySetInnerHTML={{ __html: productDetail.description  }} />
                      ) : (
                        <p>No description available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[40px] border border-gray-200 rounded-[4px] p-[20px] ">
                <h4 className="text-[18px] font-[600] text-textColor">Đánh giá của khách hàng</h4>
                <div className="mt-[15px] flex gap-[15px]  ">
                  <div className="">
                    <h5 className="text-[15px] font-[400] text-textColor">Tổng quan</h5>
                    <div className="flex items-center gap-[15px] ">
                      <h1 className="text-textColor text-[30px] font-[600] ">5.8</h1>
                      <Rating
                        countStar={5}
                        classList="flex gap-[4px] "
                      />
                    </div>
                    <span className="text-[15px] font-[400] text-lineColor">(450 đánh giá) </span>
                    <ul className="flex flex-col gap-[0px] mt-[10px] ">
                      {
                        Array(5).fill(0).map((_, index) => {
                          return (
                            <li key={index} className="flex items-center gap-[10px] ">
                              <Rating
                                countStar={5}
                                classList="flex gap-[2px] "
                                styleStar="text-[12px] "
                              />
                              <div className="w-[150px] h-[6px] relative rounded-[12px] bg-gray-300 overflow-hidden">
                                <div className="absolute w-[50%] h-full bg-primaryColor rounded-[12px]"></div>
                              </div>
                              <span className="text-[12px] text-gray-400">5</span>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <div className="w-[0.6px] bg-gray-200 ml-[50px] "></div>
                  <div className="">
                    <h5 className="text-[15px] font-[400] text-textColor">Bình luận của bạn</h5>
                    <form className="mt-[15px] flex items-center gap-[15px] " onSubmit={(e: any) => { e.preventDefault() }} method="POST">
                      <Input className="outline-none px-[14px] py-[8px] text-[14px]  min-w-[500px] " placeholder="Nhập bình luận của bạn..." />
                      <Button className="font-[500] hover:bg-primaryColor transition-all duration-300 ease-linear text-white bg-primaryColor" variant={'default'}>Gửi</Button>
                    </form>
                  </div>
                </div>
                <div className="w-full h-[0.5px] bg-gray-200 mb-[20px] mt-[30px] "></div>
                <h5 className="text-[14px] font-[500] text-textColor">Lọc theo</h5>
                <div className="mt-[15px] flex items-center gap-[10px] ">
                  <Button className="font-[400] text-textColor rounded-[24px] " variant={'outline'}>Mới nhất</Button>
                  <Button className="font-[400] text-textColor rounded-[24px] " variant={'outline'}>Có hình ảnh</Button>
                  <Button className="font-[400] text-textColor rounded-[24px] " variant={'outline'}>Đã mua hàng</Button>
                  <Button className="font-[400] text-textColor rounded-[24px] " variant={'outline'}>5 sao</Button>
                </div>
                <div className="w-full h-[0.5px] bg-gray-200 mb-[30px] my-[15px] "></div>
                {/* comment */}
                <div className="">

                </div>
              </div>
            </div>
            <div className="col-span-3 sticky top-[30px] border border-gray-200 rounded-[4px] self-start overflow-hidden p-[20px] ">
              <div className="">
                <h3 className="text-[18px] font-[600] text-textColor ">Loại</h3>
                <ul className="flex gap-[10px] mt-[10px] ">
                  <li className="rounded-[4px] px-[5px] py-[2px] font-[500] bg-primaryColor  text-[12px] text-white "><span>500 kg</span></li>
                  <li className="rounded-[4px] px-[5px] py-[2px] font-[500] border border-gray-200  text-[12px] text-textColor "><span>500 kg</span></li>
                  <li className="rounded-[4px] px-[5px] py-[2px] font-[500] border border-gray-200  text-[12px] text-textColor "><span>500 kg</span></li>
                  <li className="rounded-[4px] px-[5px] py-[2px] font-[500] border border-gray-200  text-[12px] text-textColor "><span>500 kg</span></li>
                </ul>
                <h3 className="text-[16px] font-[600] text-textColor mt-[20px] ">Số lượng</h3>
                <div className="flex items-center gap-[6px] w-auto mt-[15px] ">
                  <Button onClick={() => setCounter(counter < 2 ? 1 : counter - 1)} size={'square'} variant={'outline'} className="px-[12px] py-[11px] "><i className="fa-solid fa-minus text-textColor"></i></Button>
                  <Input
                    value={counter}
                    onChange={(e: any) => setCounter(e.target.value)}
                    className=" outline-none  w-[57px]  text-center  px-[10px] py-[8px] "
                  />
                  <Button onClick={() => setCounter(counter > 98 ? 99 : counter + 1)} size={'square'} variant={'outline'} className="px-[12px] py-[11px] "><i className="fa-solid fa-plus text-textColor"></i></Button>
                </div>
                <h3 className="text-[16px] font-[600] text-textColor mt-[15px] ">Tạm tính</h3>
                <h1 className="text-[26px] font-[600] text-textColor mt-[10px] ">150.000 vnđ</h1>
                <Button className="w-full mt-[10px] bg-primaryColor hover:bg-primaryColor hover:opacity-80 transition-all duration-300 ease-linear">Mua ngay</Button>
                <Button variant={'outline'} className="w-full mt-[10px]  ">Thêm vào giỏ hàng</Button>

              </div>
            </div>
          </div>
          <h1 className="my-[30px] text-[22px] font-[500] text-textColor ">Sản phẩm tương tự</h1>
          <div className="mt-[30px] grid grid-cols-5 grid-rows-1 gap-5">
            {
              Array(5).fill(0).map((_, index) => {
                return (
                  <Link key={index} to={`/productDetail/233231`}>
                    <Card className="max-w-[240px] border rounded-[6px] border-gray-200 cursor-pointer p-0 overflow-hidden">
                      <CardHeader className="p-0 bg-white h-[260px]  overflow-hidden relative">
                        <div className="absolute top-[4%] right-[4%] z-10 px-[4px] py-[1px] rounded-[4px] bg-red-400 flex items-center justify-center ">
                          <span className="text-[12px] font-[500] text-white ">-50%</span>
                        </div>
                        <img
                          className=" h-full object-cover hover:scale-110 transition-all duration-300 ease-in-out "
                          src="https://culacstudio.com/wp-content/uploads/Product-DECAAR_12862.jpg"
                          alt="product"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <span className="text-[14px] text-gray-500">
                          {/* substring(0, 50) */}
                          Balo Ulzzang Học Sinh Chống Nước Hàn Quốc MARSOCI...</span>
                        <div className="mt-[10px] ">
                          <Rating
                            countStar={4}
                            classList="gap-[4px] "
                            styleStar="text-[12px] "
                          />
                        </div>
                        <div className="flex items-center justify-between ">
                          <div className="mt-[6px] flex items-center gap-[5px] ">
                            <h3 className="text-[15px]  text-textColor font-[500] ">200.000 vnđ</h3>
                            <span className="line-through text-[12px] text-gray-400">20.000 vnđ </span>
                          </div>
                          <div className="px-[4px] py-[1px] rounded-[4px] bg-gray-200 flex items-center justify-center ">
                            <span className="text-[12px] font-[500] text-gray-400 ">-50%</span>
                          </div>
                        </div>
                      </CardContent>
                      {/* <CardFooter className="">
                      </CardFooter> */}
                    </Card>
                  </Link>
                )
              })
            }
          </div>
        </div>)
      }
    </div>


  )
}
