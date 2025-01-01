import { handleApi } from "@/service";

export const getTargetForTheMonth =async ()=>{
  try {
    const response=await handleApi(`analysis/getTargetForTheMonth`)
    return response.data
  } catch (err:any) {
    throw err;
  }
}

export const getRevenueForTheYear =async (year:number)=>{
  try {
    console.log(year)
    const response=await handleApi(`analysis/getRevenueForTheYear/${year}`)
    return response.data
  } catch (err:any) {
    throw err;
  }
}

export const getStatisticalUser =async ()=>{
  try {
    const response=await handleApi(`analysis/statisticalUser`)
    return response.data
  } catch (err:any) {
    throw err;
  }
}