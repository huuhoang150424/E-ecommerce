import { handleApi } from "@/service";

export const getProduct =async (id:string)=>{
  try {
    const response=await handleApi(`product/getProductClient/${id}`)
    return response.data.result.data
  } catch (err:any) {
    throw err;
  }
}

export const getComment =async ()=>{
  
  try {
    const response=await handleApi('product/getProductRecent')
    return response.data
  } catch (err:any) {
    throw err;
  }
}