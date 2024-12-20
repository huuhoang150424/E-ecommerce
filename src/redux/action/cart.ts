import { handleApi } from '@/service';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const getCart=createAsyncThunk('cart/getCart',async ()=>{
  try {
    const response = await handleApi('/cart/getCart');
    return response.data;
  } catch (err: any) {
    throw err;
  }
})

export const addToCart = createAsyncThunk(
  'cart/addCart',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await handleApi('/cart/addCart', data, 'POST');
      return response.data; 
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);


export const removeCart=createAsyncThunk('cart/removeCart',async (id:string)=>{
  try {
    const response = await handleApi(`/cart/removeCart/${id}`, null,'DELETE');
    return {id: id,...response.data} ;
  } catch (err: any) {
      throw err;
  }
})

export const removeAllCart=createAsyncThunk('cart/removeAllCart',async ()=>{
  try {
    const response = await handleApi('/cart/removeAllCart', null,'DELETE');
    return response.data;
  } catch (err: any) {
    throw err;
  }
})


export const updateCart = createAsyncThunk('cart/updateCart', async (data: { id: string ,dataS: any}, { rejectWithValue }) => {
  const { id,dataS } = data;
  try {
    console.log(dataS)
    const response = await handleApi(`/cart/updateCart/${id}`, dataS, 'PUT');
    return { id, quantity: dataS.quantity, ...response.data }; 
  } catch (err: any) {
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data);
    }
    throw err;
  }
});
