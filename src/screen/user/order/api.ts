
import { handleApi } from "@/service";



export const getAllMyOrder=async (typeOrder:string)=>{
  try {
    const response=await handleApi(`order/${typeOrder}`)
    return response.data
  } catch (err:any) {
    throw err;
  }
}

export const destroyOrder=async (id:string)=>{
  try {
    const response=await handleApi(`order/destroy/${id}`,null,'PUT')
    return response.data
  } catch (err:any) {
    throw err;
  }
}

//xác nhận đơn hàng
export const receivedOrder=async (id:string)=>{
  try {
    const response=await handleApi(`order/received/${id}`,null,'PUT')
    return response.data
  } catch (err:any) {
    throw err;
  }
}
