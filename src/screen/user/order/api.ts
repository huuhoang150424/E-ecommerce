
import { handleApi } from "@/service";



export const getAllMyOrder=async ()=>{
  try {
    const response=await handleApi('order/getOrderByUser')
    return response.data
  } catch (err:any) {
    throw err;
  }
}

export const getAllProductsRecent =async ()=>{
  try {
    const response=await handleApi('product/getProductRecent')
    return response.data
  } catch (err:any) {
    throw err;
  }
}