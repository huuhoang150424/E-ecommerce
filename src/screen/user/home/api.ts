import { handleApi } from "@/service";



export const getAllProductsSale=async ()=>{
  try {
    console.log("test")
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