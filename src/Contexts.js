import { createContext } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  updateCartQuantity: () => {},
  deleteFromCart: () => {},
});
