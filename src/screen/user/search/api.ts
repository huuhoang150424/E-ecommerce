import { handleApi } from '@/service';

export const getProductSearch = async (keyword: string) => {
  try {
    const response = await handleApi(`product/search`, null, 'GET', { keyword: keyword });
    return response.data;
  } catch (err: any) {
    throw err;
  }
};
export const getCats = async () => {
  try {
    const response: any = await handleApi('category/getAllClient');
    return response.data;
  } catch (err: any) {
    throw err;
  }
};
export const filterProductByCats = async (categoryId: string) => {
  try {
    const response: any = await handleApi(`product/${categoryId}/category`);
    return response.data;
  } catch (err: any) {
    throw err;
  }
};
export const filterProductByRating = async (rating: number) => {
  try {
    const response: any = await handleApi(`product/getProductByStar`, null, 'GET', { countStar: rating });
    return response.data;
  } catch (err: any) {
    throw err;
  }
};
export const filterProductByPrices = async (minPrice?: number, maxPrice?: number) => {
  try {
    console.log(minPrice,maxPrice)
    const response = await handleApi(`product/getProductByPrice`, null, 'GET', { minPrice, maxPrice });
    return response.data || [];
  } catch (err) {
    throw err;
  }
};