import { handleApi } from "@/service";
import { z } from "zod";


// Schema for form create product
export const uploadProduct = z.object({
  product_name: z.string().min(1, "Tên sản phẩm không được để trống"),
  price: z.string().min(1, "Giá phải là một số dương"),
  thumb_image: z.string().min(1, "Đây phải là một URL hợp lệ"),
  stock: z.string().min(1, "Số lượng tồn kho phải là số nguyên không âm"),
  image_urls: z.array(z.string().url("Mỗi URL phải hợp lệ")).nonempty("Phải có ít nhất một ảnh mô tả sản phẩm"),
  category_id: z.string().min(1, "Danh mục không được để trống"),
  description: z.string().min(1, "Mô tả sản phẩm không được để trống"),
  attributes: z.array(
    z.object({
      attribute_name: z.string().min(1, "Tên thuộc tính không được để trống"),
      value: z.string().min(1, "Giá trị thuộc tính không được để trống"),
    })
  ),
});

// Schema for form update product
export const editProductForm = z.object({
  product_name: z.string().optional(),
  price: z.string().optional(),
  thumb_image: z.string().optional(),
  stock: z.string().optional(),
  image_urls: z.array(z.string().optional()).optional(),
  category_id: z.string().optional(),
  description: z.string().optional(),
  attributes: z.array(
    z.object({
      attribute_name: z.string().optional(),
      value: z.string().optional(),
    })
  ).optional(),
  status: z.enum(["Có sẵn", "Hết hàng", "Ngưng bán"]).default("Có sẵn").optional(),
});

export type FormData=z.infer<typeof uploadProduct>;

export type FormDataUpdate=z.infer<typeof editProductForm>;

export const createProduct=async (dataS:FormData)=>{
  try {
    const response=await handleApi('product/createProduct',dataS,'POST')
    return response.data
  } catch (err:any) {
    console.log(err)
  }

}

export const getAllProducts=async (page: number, pageSize: number)=>{
  try {
    const response=await handleApi('product/getAllProduct',null,'GET',{page,size:pageSize})
    return response.data
  } catch (err:any) {
    console.log(err)
  }
}


export const getProduct = async ({ queryKey }: { queryKey: any[] }) => {
  const slug = queryKey[1]; 
  try {
    const response = await handleApi(`product/getProduct/${slug}`, null, 'GET');
    return response.data;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};

export const updateProduct = async (dataS: any) => {
  const { id, ...payload } = dataS; 
  console.log(id)
  try {
    const response = await handleApi(`product/editProduct/${id}`, payload, 'PUT');
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
