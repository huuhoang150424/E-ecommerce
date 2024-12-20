import { handleApi } from "@/service";




export const getAllOrder=async (page: number, pageSize: number)=>{
  try {
    const response=await handleApi('order/getAllOrders',null,'GET',{ page, size: pageSize })
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