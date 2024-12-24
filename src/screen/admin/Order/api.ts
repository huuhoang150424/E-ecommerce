import { handleApi } from "@/service";




export const getAllOrder=async (page: number, pageSize: number)=>{
  try {
    const response=await handleApi('order/getAllOrders',null,'GET',{ page, size: pageSize })
    return response.data
  } catch (err:any) {
    throw err;
  }
}

export const confirmOrder =async (id:string)=>{
  try {
    const response=await handleApi(`order/confirmOrder/${id}`,null,'POST')
    return response.data
  } catch (err:any) {
    throw err;
  }
}
export const destroyOrder =async (id:string)=>{
  try {
    const response=await handleApi(`order/destroy/${id}`,null,'POST')
    return response.data
  } catch (err:any) {
    throw err;
  }
}