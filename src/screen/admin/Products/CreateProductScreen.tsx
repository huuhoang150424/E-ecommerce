import { Ckeditor } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCat } from "../Category/api";
import { getAllAttributes } from "../Attributes/api";
import { handleUpload } from "@/utils/upLoadImage";
import { LoadingSpinner } from "@/components/common";
import { useForm } from "react-hook-form";
import { createProduct, FormData, uploadProduct } from "./api";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

interface uploadImages {
  index?: number;
  imgUrl?: string;
  isLoading?: boolean
}
interface attributes {
  attribute_name: string;
  value: string
}

export default function CreateProductScreen() {
  const [images, setImages] = useState<uploadImages[]>([{ index: 0, imgUrl: '', isLoading: false }]);
  const [attributes, setAttributes] = useState<attributes[]>([]);
  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbImages, setThumbImages] = useState("");
  const queryClient = useQueryClient()

  const page=1
  const size=20

  const { data: allCat } = useQuery({
    queryKey: ['category',{ page: page, pageSize: size }],
    queryFn: ({ queryKey }: { queryKey: [string, { page: number; pageSize: number }] }) => {
      const [, { page, pageSize }] = queryKey;
      return getAllCat(page, pageSize);
    },
  });
  const { data: attribute } = useQuery({
    queryKey: ['attribute'],
    queryFn: () => {
      return getAllAttributes(1,20);
    }
  });

  const handleUploadImage = async (image: any) => {
    setLoading(true);
    try {
      const { imageUrl } = await handleUpload(image);
      setThumbImages(imageUrl || "");
      setValue("thumb_image", imageUrl || "");
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  //upload array image
  const handleUploadImages = async (image: any, index: number) => {
    setImages(prevImages =>
      prevImages.map(img =>
        img.index === index ? { ...img, isLoading: true } : img
      )
    );

    try {
      const { imageUrl } = await handleUpload(image);
      if (imageUrl) {
        setImages(prevImages =>
          prevImages.map(img =>
            img.index === index ? { ...img, imgUrl: imageUrl, isLoading: false } : img
          )
        );
        const currentUrls = getValues("image_urls") || [];
        setValue("image_urls", [...currentUrls, imageUrl]);
      }
    } catch (err) {
      console.error("Lỗi tải lên:", err);
      setImages(prevImages =>
        prevImages.map(img =>
          img.index === index ? { ...img, isLoading: false } : img
        )
      );
    }
  };

  //upload product
  const { register, handleSubmit, setValue, reset, getValues, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(uploadProduct)
  })
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      setThumbImages("");
      setImages([]);
      setAttributes([]);
    },
    onError: (error: any) => {
      console.error('Tạo thất bại:', error);
    },
  })
  useEffect(() => {
    if (attributes.length > 0) {
      setValue("attributes", attributes);
    }
  }, [attributes, setValue]);
  const { isPending, isSuccess, data,isError,error } = mutation;

  const onSubmit = (dataS: FormData) => {
    console.log(dataS)
    mutation.mutate(dataS)
  }
  useEffect(() => {
    if (isSuccess) {
      toast({
        variant: 'success',
        title: data?.result?.message
      })
    }
    if (isError) {
      if (isError) {
        toast({
          variant: 'destructive',
          title: error.response.data.non_field_errors[0]
        })
      }
    }
  }, [isSuccess,isError])

  return (
    <div className=" ">
      <h1 className="mb-[15px] text-[20px] font-[700] text-textColor dark:text-white">Thêm mới sản phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit)} action="POST" >
        <div className="border border-gray-200 p-[20px] rounded-[6px]">
          <div className="grid grid-cols-12 gap-[30px] ">
            <div className=" col-span-6 flex flex-col gap-[20px] ">
              <div className="flex flex-col gap-3 w-full ">
                <div className="flex items-center gap-[10px] ">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Tên sản phẩm :
                  </Label>
                  {errors.product_name && <p className="text-red-500 text-[12px] font-[500] ">{errors.product_name.message}</p>}
                </div>
                <Input
                  id="categories_name"
                  className=" px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                  placeholder="tên sản phẩm"
                  {...register('product_name')}
                />
              </div>
              <div className="flex flex-col gap-3 w-full ">
                <div className="flex items-center gap-[10px]">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Giá sản phẩm :
                  </Label>
                  {errors.price && <p className="text-red-500 text-[12px] font-[500] ">{errors.price.message}</p>}
                </div>
                <Input
                  id="categories_name"
                  className=" px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                  placeholder="giá sản phẩm"
                  {...register('price')}
                />
              </div>
              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-[10px]">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Ảnh đại diện sản phẩm :
                  </Label>
                  {errors.thumb_image && <p className="text-red-500 text-[12px] font-[500] ">{errors.thumb_image.message}</p>}
                </div>
                <label htmlFor="thumb_image" className="rounded-[4px] border-[2px] border-gray-200 border-dashed p-[5px] w-[25%] flex flex-col items-center  justify-center cursor-pointer">
                  {
                    loading ? (<LoadingSpinner className='my-[60px] ' />) : (<div className="">
                      {
                        thumbImages ? (<img
                          src={thumbImages}
                          alt="Ảnh đại diện sản phẩm"
                          className="object-cover max-w-[130px] h-[200px]"
                        />) : (
                          <div className="mx-[20px] my-[50px] ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-11  fill-gray-500" viewBox="0 0 32 32">
                              <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" data-original="#000000" />
                              <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" data-original="#000000" />
                            </svg>
                            <span className="text-[16px]  text-gray-400">image</span>
                          </div>)
                      }
                    </div>)
                  }
                  <input
                    id="thumb_image"
                    className="hidden "
                    type="file"
                    onChange={(e: any) => handleUploadImage(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className=" col-span-6 flex flex-col gap-[20px] ">
              <div className="flex flex-col gap-3 w-full ">
                <div className="flex items-center gap-[10px]">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Số lượng sản phẩm :
                  </Label>
                  {errors.stock && <p className="text-red-500 text-[12px] font-[500] ">{errors.stock.message}</p>}
                </div>
                <Input
                  id="categories_name"
                  className=" px-[14px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                  placeholder="số lượng sản phẩm"
                  {...register('stock')}
                />
              </div>

              <div className=" flex flex-col gap-3 w-full ">
                <div className="flex items-center gap-[10px]">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Ảnh mô tả sản phẩm :
                  </Label>
                  {errors.image_urls && <p className="text-red-500 text-[12px] font-[500] ">{errors.image_urls.message}</p>}
                </div>
                <ul className="flex items-center gap-[15px] ">
                  {
                    images.map((item) => {
                      return (
                        <li key={item.index} className="group relative rounded-[4px] border-[2px] border-gray-200 border-dashed p-[5px]  flex flex-col items-center  justify-center cursor-pointer">
                          <div
                            onClick={() => {
                              if (images.length > 1) {
                                return setImages((prevImages) => prevImages.filter((element) => element.index !== item.index))
                              }
                            }
                            }
                            className="absolute flex items-center justify-center py-[5px] rounded-[50%] bg-gray-300 px-[7px] top-[-11%] right-[-15%] opacity-0 group-hover:opacity-85 transition-all duration-300 ease-in-out"
                          >
                            <i className="fa-solid fa-xmark text-gray-400 text-[12px] "></i>
                          </div>
                          {
                            item.isLoading ? (<LoadingSpinner className='m-[15px] ' />) : (
                              <div className=" ">
                                {
                                  item.imgUrl ? (<img
                                    className="max-w-[80px] h-[105px] object-cover "
                                    alt="ảnh mô tả"
                                    src={`${item.imgUrl}`}
                                  />) : (
                                    <label htmlFor="image" className="flex items-center ">
                                      <div className="mx-[15px] my-[15px] ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500 cursor-pointer " viewBox="0 0 32 32">
                                          <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" data-original="#000000" />
                                          <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" data-original="#000000" />
                                        </svg>
                                        <span className="text-[16px]  text-gray-400">image</span>
                                      </div>
                                      <input id="image" className="hidden" type="file" onChange={(e: any) => handleUploadImages(e.target.files[0], item.index ?? 0)} />
                                    </label>)
                                }
                              </div>)
                          }
                        </li>
                      )
                    })
                  }
                  <li onClick={() => {
                    if (images.length < 4) {
                      return setImages((prevImages) => [...prevImages, { index: prevImages.length, imgUrl: "", isLoading: false }]);
                    }
                  }
                  }
                    className="rounded-[4px] border-[2px] border-gray-200 border-dashed py-[10px] px-[15px] flex flex-col items-center  justify-center cursor-pointer"
                  >
                    <i className="fa-solid fa-plus text-[30px] text-gray-400  "></i>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-3 w-full ">
                <div className="flex items-center gap-[10px]">
                  <Label htmlFor="categories_name" className="text-textColor ">
                    Lựa chọn danh mục sản phẩm :
                  </Label>
                  {errors.category_id && <p className="text-red-500 text-[12px] font-[500] ">{errors.category_id.message}</p>}
                </div>

                <Select onValueChange={(id) => setValue("category_id", id)} >
                  <SelectTrigger className="max-w-[300px] text-textColor shadow-none ">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <ScrollArea className="h-[100px] ">
                        <SelectLabel className="text-textColor ">Danh mục</SelectLabel>
                        {
                          allCat?.result.data.map((cat: any) => {
                            return (
                              <SelectItem key={cat.id} className="text-textColor " value={cat?.id}>{cat?.category_name}</SelectItem>
                            )
                          })
                        }
                      </ScrollArea>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full mt-[15px]">
            <div className="flex items-center gap-[10px]">
              <Label htmlFor="categories_name" className="text-textColor ">
                Thuộc tính sản phẩm :
              </Label>
              {errors.attributes && <p className="text-red-500 text-[12px] font-[500] ">{errors.attributes.message}</p>}
            </div>
            <div className="flex items-center gap-[20px]">
              <Select onValueChange={(value) => setAttributeName(value)}>
                <SelectTrigger className="max-w-[200px] text-textColor">
                  <SelectValue placeholder="Chọn thuộc tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <ScrollArea className="h-[100px] ">
                      <SelectLabel className="text-textColor ">Thuộc tính</SelectLabel>
                      {
                        attribute?.result.data.map((cat: any) => {
                          return (
                            <SelectItem key={cat.id} className="text-textColor " value={cat?.attribute_name}>{cat?.attribute_name}</SelectItem>
                          )
                        })
                      }
                    </ScrollArea>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                id="categories_name"
                className=" px-[14px] max-w-[250px] py-[6px] outline-none text-textColor text-[14px] font-[400]"
                placeholder="Giá trị thuộc tính..."
                onChange={(e) => setAttributeValue(e.target.value)}
                value={attributeValue}
              />
              <Button
                variant={'outline'}
                className=" text-white bg-primaryColor hover:bg-primaryColor hover:opacity-90 transition-all duration-300 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  if (attributeName.trim() !== "" && attributeValue.trim() !== "") {
                    setAttributes((prev) => [
                      ...prev,
                      { attribute_name: attributeName.trim(), value: attributeValue.trim() },
                    ]);
                    setAttributeValue("");
                  }
                }}
              >
                Thêm mới thuộc tính
              </Button>
            </div>
            <ul className=" w-auto  mt-[15px] flex items-center gap-[12px]  ">
              {
                attributes.map((attribute: any, index) => {
                  return (
                    <li key={index} className="relative border border-gray-200 rounded-[4px] p-[15px] group  flex flex-col gap-[16px] ">
                      <div
                        onClick={() => {
                          setAttributes((prev) => prev.filter((pre) => pre.value !== attribute.value))
                        }}
                        className="cursor-pointer absolute flex items-center justify-center py-[5px] rounded-[50%] bg-gray-300 px-[7px] top-[-11%] right-[-15%] opacity-0 group-hover:opacity-85 transition-all duration-300 ease-in-out"
                      >
                        <i className="fa-solid fa-xmark text-gray-400 text-[12px] "></i>
                      </div>
                      <h2 className="text-[16px] font-[500] text-textColor ">
                        {attribute.attribute_name}
                      </h2>
                      <span className="text-[14px] font-[400] text-textColor ">
                        {attribute.value}
                      </span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="">

          </div>
          <div className="flex flex-col gap-3 w-full mt-[15px] ">
            <div className="flex items-center gap-[10px]">
              <Label htmlFor="categories_name" className="text-textColor ">
                Mô tả sản phẩm :
              </Label>
              {errors.description && <p className="text-red-500 text-[12px] font-[500] ">{errors.description.message}</p>}
            </div>
            <Ckeditor
              onChange={(value) => setValue('description', value)}
            />
          </div>
        </div>
        <div className="mt-[30px] w-full flex justify-end ">
          {
            isPending ? (<LoadingSpinner className="mr-[20px] " />) : (<Button type="submit" variant={'outline'} className="mb-[30px] text-white bg-primaryColor hover:bg-primaryColor hover:opacity-90 transition-all duration-300 ease-in-out" >
              Thêm mới sản phẩm
            </Button>)
          }
        </div>
      </form>
    </div>
  )
}
