import { CartUser } from "@/types/personal.types";
import { ProductInfo } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cart: ProductInfo[];
  cartUser: CartUser;
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  cart: [],
  cartUser: {
    email: "",
    fullName: "",
    customerAddress: "",
    customerPhone: "",
  },
  totalQuantity: 0,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ product: ProductInfo; quantity: number }>,
    ) {
      const { product, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        state.cart = state.cart.map((cartItem) =>
          cartItem.id === product.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
                totalProductPrice:
                  (cartItem.quantity + quantity) *
                  (cartItem.price[0].price || 0),
              }
            : cartItem,
        );
      } else {
        state.cart.push({
          ...product,
          quantity: quantity,
          totalProductPrice: product.price[0].price || 0,
        });
        state.totalQuantity += 1;
      }
      state.totalPrice += quantity * product.price[0].price || 0;
    },

    removeFromCart(state, action: PayloadAction<ProductInfo>) {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          state.cart = state.cart.map((cartItem) =>
            cartItem.id === product.id
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity - 1,
                  totalProductPrice:
                    (cartItem.quantity - 1) * (cartItem.price[0].price || 0),
                }
              : cartItem,
          );
        } else {
          state.cart = state.cart.filter(
            (cartItem) => cartItem.id !== product.id,
          );
          state.totalQuantity -= 1;
        }

        state.totalPrice -= product.price[0].price || 0;
      }
    },

    clearCart(state) {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setCartUser(state, action: PayloadAction<CartUser>) {
      state.cartUser = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartUser } =
  cartSlice.actions;
export default cartSlice.reducer;
