import { handleApi } from "@/service";


export const getAllReview=async (page: number, pageSize: number)=>{
  try {
    const response=await handleApi('review/getAllReview',null,'GET',{page,size:pageSize})
    return response.data
  } catch (err:any) {
    throw err;
  }
}

export const deleteComment=async (page: number, pageSize: number)=>{
  try {
    const response=await handleApi('product/getAllProduct',null,'GET',{page,size:pageSize})
    return response.data
  } catch (err:any) {
    throw err;
  }
}