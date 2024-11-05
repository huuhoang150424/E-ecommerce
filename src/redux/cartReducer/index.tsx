import { createSlice } from '@reduxjs/toolkit';




interface CartState {
  showMiniCart: boolean
}

const initialState: CartState = {
  showMiniCart: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showMiniCartBlock: (state)=>{
      state.showMiniCart=true;
    }
  },

});

export const { showMiniCartBlock } = cartSlice.actions;

export const selectShowMiniCart = (state: { cart: CartState }) => state.cart.showMiniCart;

export default cartSlice.reducer;
