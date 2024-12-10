import { handleApi } from "@/service";



export const getProductSearch = async (keyword: string) => {
  try {
    const response = await handleApi(`product/search`,null,'GET',{keyword: keyword});
    return response.data;
  } catch (err: any) {
    throw err;
  }
};