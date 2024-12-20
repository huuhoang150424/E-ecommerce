import { createSelector, createSlice } from '@reduxjs/toolkit';
import { getCart, addToCart, removeCart, removeAllCart, updateCart } from "@/redux/action/cart";



interface CartState {
  showMiniCart: boolean;
  item: any[];
  cartSelect: any[];
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string
}

const initialState: CartState = {
  showMiniCart: false,
  item: [],
  cartSelect: [],
  loading: false,
  error: false,
  success: false,
  message: ""
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showMiniCartBlock: (state) => {
      state.showMiniCart = true;
    },
    resetCartState(state) {
      state.success = false;
      state.error = false;
      state.message = '';
    },
    hiddenShowMiniCart(state) {
      state.showMiniCart = false;
    },
    resetCart() {
      return initialState;
    },
    selectCart(state,action) {
      console.log(action.payload)
      state.cartSelect=action.payload.cart
    },
    resetCartSelect(state) {
      state.cartSelect=[]
    }
  },

  extraReducers(builder) {
    //get cart
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload.result.data.cart_items;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
      });
    //add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.result.message;
        state.showMiniCart = true;
      })
      .addCase(addToCart.rejected, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.error_message.message
        state.error = true;
      });
    //update cart
    builder
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        const { id, quantity } = action.payload;
        const cartItem = state.item.find((item) => item.id === id);
        if (cartItem) {
          cartItem.quantity = quantity;
        }
      })
      .addCase(updateCart.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.error_message.message
      });

    //remove cart
    builder
      .addCase(removeCart.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.item = state.item.filter((item) => item.id != action.payload.id)
        state.loading = false;
        state.message = action.payload.result.message;
        state.success = true;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.loading = false;
      });
    // //remove all cart
    builder
      .addCase(removeAllCart.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(removeAllCart.fulfilled, (state, action) => {
        state.message=action.payload.result.message;
        state.success = true;
        state.loading = false;

      })
      .addCase(removeAllCart.rejected, (state, action) => {
        state.loading = false;
      });
  },

});

export const { showMiniCartBlock, resetCartState, hiddenShowMiniCart, resetCart ,selectCart,resetCartSelect} = cartSlice.actions;



export const selectShowMiniCart = (state: { cart: CartState }) => state.cart.showMiniCart;
export const selectItem = (state: { cart: CartState }) => state.cart.item;
export const selectCartSelect = (state: { cart: CartState }) => state.cart.cartSelect;
export const selectError = (state: { cart: CartState }) => state.cart.error;
export const selectLoading = (state: { cart: CartState }) => state.cart.loading;
export const selectSuccess = (state: { cart: CartState }) => state.cart.success;
export const selectMessage = (state: { cart: CartState }) => state.cart.message;


//total cart item
export const selectTotalCart = createSelector([selectItem], (carts) => {
  return carts.reduce((totalPrice: number, cart: any) => totalPrice + cart.quantity * cart.product.price, 0)
})


export default cartSlice.reducer;
