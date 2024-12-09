import { handleApi } from "@/service";
import { z } from "zod";



export const upLoadComment=z.object({
  comment: z.string()
})
export type FormDataComment=z.infer<typeof upLoadComment>;


export const getProduct =async (id:string)=>{
  try {
    console.log("Load lại")
    const response=await handleApi(
      `product/getProductClient/${id}`
    );
    return response.data.result.data;
  } catch (err:any) {
    throw err;
  }
}


//comment
export const getComments = async (data: any) => {
  const { productId, offset } = data;
  try {
    const response = await handleApi(
      `review/getCommentProduct/${productId}?offset=${offset}&limit=5`
    );
    return response.data;
  } catch (err: any) {
    throw err;
  }
};
export const deleteComments = async (commentId: string) => {

  try {
    const response = await handleApi(
      `review/deleteComment/${commentId}`,
      null,
      'DELETE'
    );
    return response.data;

  } catch (err: any) {
    throw err;
  }
};




export const postComment =async (data:any)=>{
  const {id,...dataS}=data;
  try {
    const response=await handleApi(
      `review/comment/${id}`,dataS,'POST'
    );
    return response.data;
  } catch (err:any) {
    throw err;
  }
}


//favorite product
export const addFavoriteProduct =async (productId:String)=>{
  try {
    const response=await handleApi(
      'product/addFavoriteProduct',{productId},'POST'
    );
    return response.data;
  } catch (err:any) {
    throw err;
  }
}

export const removeFavoriteProduct =async (productId:String)=>{
  try {
    const response=await handleApi(
      `product/removeFavoriteProduct/${productId}`,null,'DELETE'
    );
    return response.data;
  } catch (err:any) {
    throw err;
  }
}