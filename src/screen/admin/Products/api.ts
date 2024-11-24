import { handleApi } from "@/service";
import { z } from "zod";



export const uploadProduct = z.object({
  product_name: z.string().min(1, "Tên sản phẩm không được để trống"), 
  price: z.string().min(1,"Giá phải là một số dương"),
  thumb_image: z.string().min(1,"Đây phải là một URL hợp lệ"),
  stock: z.string().min(1,"Số lượng tồn kho phải là số nguyên không âm"), 
  image_urls: z.array(z.string().url("Mỗi URL phải hợp lệ")).nonempty("Phải có ít nhất một ảnh mô tả sản phẩm"),
  category_id: z.string().min(1, "Danh mục không được để trống"),
  description: z.string().min(1, "Mô tả sản phẩm không được để trống"),
  attributes: z.array(
    z.object({
      attribute_name: z.string().min(1, "Tên thuộc tính không được để trống"),
      value: z.string().min(1, "Giá trị thuộc tính không được để trống"),
    })
  )
});


export type FormData=z.infer<typeof uploadProduct>;

export const createProduct=async (dataS:FormData)=>{
  try {
    const response=await handleApi('product/createProduct',dataS,'POST')
    return response.data
  } catch (err:any) {
    console.log(err)
  }

}
export const getAllProducts=async ()=>{
  try {
    const response=await handleApi('product/getAllProduct')
    return response.data
  } catch (err:any) {
    console.log(err)
  }

}
export const updateProduct = async (dataS: any) => {
  const { id, ...payload } = dataS; 
  try {
    const response = await handleApi(`product/updateProduct/${id}`, payload, 'PUT');
    return response.data;
  } catch (err: any) {
    console.log(err);
  }
}


export const deleteProduct=async (id:string)=>{
  try {
    const response=await handleApi(`product/deleteProduct/${id}`,null,'DELETE')
    return response.data
  } catch (err:any) {
    console.log(err)
  }

}
