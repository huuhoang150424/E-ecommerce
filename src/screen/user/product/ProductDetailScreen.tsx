import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@/components/user";
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useScrollToTopOnMount from "@/hooks/useScrollToTopOnMount";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavoriteProduct, deleteComments, FormDataComment, getComments, getProduct, postComment, removeFavoriteProduct, upLoadComment } from "./api";
import { ImageMagnifier, Loading, LoadingSpinner } from "@/components/common";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import { toast } from "@/hooks/use-toast";





export default function ProductDetailScreen() {
  //useScrollToTopOnMount();
  const [counter, setCounter] = useState(0);
  const [favourite, setFavourite] = useState(false);
  const param = useParams();
  const [imageActivate, setImageActivate] = useState<string | undefined>(undefined);
  const queryClient=useQueryClient()
  const { isLoading:isLoadingProduct, data: productDetail } = useQuery({
    queryKey: ['productDetail', param.id],
    queryFn: () => getProduct(param.id ?? ""),

  });
  //post comment
  const {register,handleSubmit,setValue}=useForm<FormDataComment>({
    resolver: zodResolver(upLoadComment)
  })

  const mutation=useMutation({
    mutationFn: postComment,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['comments']})
      setValue("comment","")
    },
    onError:()=>{

    }
  })
  const onSubmit=(data:FormDataComment)=>{
    mutation.mutate({id:productDetail?.id,...data})
  }
  const {isPending:loadingPostComment}=mutation;

  //get comment
  const {
    data: comments,
    isLoading: loadingComment,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['comments', param.id],
    queryFn: ({ pageParam = 0 }) => getComments({ productId: param.id, offset: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage?.result?.has_next ? lastPage?.result?.next_offset : null;
    },      
    initialPageParam: 0 //khởi tạo là 0
  });

  const allComments = comments?.pages.flatMap(page => page.result.results) || [];
  
  //delete comment
  const deleteMutation=useMutation({
    mutationFn: deleteComments,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['comments']})
    },
    onError:()=>{
      
    }
  })

  const {isPending:loadingDeleteComment,data:deleteCommentData,isSuccess:isDeleteCommentSuccess,isError:isDeleteCommentFail,error:deleteCommentError}=deleteMutation as any;

  useEffect(() => {
    if (isDeleteCommentSuccess) {
      toast({
        title: deleteCommentData?.result?.message,
        variant: "success",
      });
    }
  
    if (isDeleteCommentFail) {
      toast({
        title: deleteCommentError?.response?.data?.error_message?.message,
        variant: "destructive",
      });
    }
  }, [isDeleteCommentSuccess, isDeleteCommentFail]);
  
  
  //delete and update
  const handleValueChange = (value: string) => {
    const parsedValue = JSON.parse(value); 
    if (parsedValue.action === "edit") {
      console.log(`ID: ${parsedValue.commentId}`);
    }
    if (parsedValue.action === "delete") {
      deleteMutation.mutate(parsedValue.commentId ?? "")
    }
  };

  //favorite product
  useEffect(() => {
    if (productDetail?.is_favorite !== undefined) {
        setFavourite(productDetail.is_favorite);
    }
  }, [productDetail]);


  const toggleFavorite = async () => {
      const newFavouriteStatus = !favourite;
      setFavourite(newFavouriteStatus);
      try {
          if (newFavouriteStatus) {
              await addFavoriteProduct(productDetail?.id);
          } else {
              await removeFavoriteProduct(productDetail?.id);
          }
      } catch (error) {
          setFavourite(favourite);
          console.error("Lỗi khi cập nhật trạng thái yêu thích:", error);
      }
  };





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
                          src={imageActivate || productDetail?.thumb_image}
                        />
                      </DialogTrigger>
                      <DialogContent className="w-[500px] ">
                        <div className="mt-[10px] ">
                          <ImageMagnifier
                            src={imageActivate || productDetail?.thumb_image}
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
                    {
                      productDetail?.image_urls?.map((img_url:string, index:number) => {
                        return (
                          <li onClick={()=>setImageActivate(img_url)} key={index} className={` ${img_url===imageActivate?'border-[2px] border-primaryColor ':''} rounded-[4px] cursor-pointer overflow-hidden`}>
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
                    <Button
                      onClick={toggleFavorite}
                      size="square"
                      variant="outline"
                      className="px-[12px] py-[11px] ml-[5px]"
                    >
                      <i
                        className={`${favourite
                            ? "fa-solid fa-heart text-red-600"
                            : "fa-regular fa-heart text-textColor"
                          } transition-all duration-300 ease-linear text-[16px]`}
                      ></i>
                    </Button>

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
                  <div className="w-full  ">
                    <h5 className="text-[15px] font-[400] text-textColor">Bình luận của bạn</h5>

                    {
                      loadingPostComment ? (<LoadingSpinner className="mx-auto mt-[50px] "/>) : (
                      <form className="mt-[15px] flex items-center gap-[15px] " onSubmit={handleSubmit(onSubmit)} method="POST">
                        <Input {...register('comment')} className="outline-none px-[14px] py-[8px] text-[14px]  min-w-[500px] " placeholder="Nhập bình luận của bạn..." />
                        <Button className="font-[500] hover:bg-primaryColor transition-all duration-300 ease-linear text-white bg-primaryColor" variant={'default'}>Gửi</Button>
                      </form>)
                    }

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

                {
                  loadingComment ? (<Loading className="mt-[70px] mb-[50px] " />) : (
                    <div className="w-full flex flex-col   ">
                      {
                        allComments.length === 0 ? (<div className="w-full flex flex-col gap-[20px] items-center justify-center py-[30px]">
                          <img src="https://i.pinimg.com/736x/ff/f5/74/fff574ca85dfea25faf5128678fdb334.jpg" alt="" className="w-[100px] h-[100px]  " />
                          <span className="text-[18px] font-[500] text-gray-500 ">Không có bình luận</span>
                        </div>) : (<ul className="flex flex-col gap-[15px] ">
                          {
                            allComments.map((comment: any) => {
                              return (

                                <li key={comment?.id} className=" ">
                                  {
                                    loadingDeleteComment ? (<LoadingSpinner className="ml-[20px] " />) : (<div className="flex gap-[10px]">
                                      <img
                                        src={comment?.user_info?.avatar}
                                        alt="user"
                                        className="w-[40px] h-[40px] rounded-[50%] border border-gray-200"
                                      />
                                      <div className=" flex flex-col gap-[6px] bg-[#efeff1] px-[16px] pt-[6px] pb-[10px]  rounded-[18px] ">
                                        <div className="flex flex-col">
                                          <h4 className="text-[16px] font-[500] text-textColor ">{comment?.user_info?.name}</h4>
                                          <span className="text-[12px] font-[400] text-gray-400  ">2 giờ trước</span>
                                        </div>
                                        <div className="  ">
                                          <p className="text-[16px] text-textColor ">{comment?.comment}</p>
                                        </div>
                                      </div>
                                      <Select onValueChange={handleValueChange}>
                                        <SelectTrigger
                                          isShowIcon={false}
                                          className="w-0 p-0 shadow-none cursor-pointer outline-none border-none hover:opacity-85"
                                        >
                                          <i className="fa-solid fa-ellipsis text-textColor mr-[10px]"></i>
                                        </SelectTrigger>
                                        <SelectContent side="top">
                                          <SelectItem
                                            className="no-checkmark text-textColor text-[15px]"
                                            value={JSON.stringify({ action: "edit", commentId: comment?.id })}
                                          >
                                            Sửa
                                          </SelectItem>
                                          <SelectItem
                                            className="no-checkmark text-textColor text-[15px]"
                                            value={JSON.stringify({ action: "delete", commentId: comment?.id })}
                                          >
                                            Xóa
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>)
                                  }

                                </li>
                              )
                            })
                          }
                        </ul>)
                      }

                      {hasNextPage && <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetching}
                        variant={'outline'}
                        size={'square'}
                        className="self-center text-[14px] text-white bg-primaryColor mt-[30px] hover:bg-primaryColor hover:opacity-80 px-[12px] py-[6px] "
                      >
                        {
                          isFetching ? ("Loading.....") : ("Xem thêm")
                        }
                      </Button>}
                    </div>)
                }
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
