import { handleApi } from "@/service";
import { z } from "zod";


export const buyCodForm = z.object({
  carts: z.array(z.any()), 
  shipping_address:  z.string(),
  receiver_name:  z.string(),
  receiver_phone:  z.number(),
});

export type FormBuyCod=z.infer<typeof buyCodForm>;

export const buyCod =async (dataS:any)=>{
  try {
    console.log(dataS)
    const response=await handleApi('order/cod',dataS,'POST')
    return response.data
  } catch (err:any) {
    throw err;
  }
}