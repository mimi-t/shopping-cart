import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useState } from "react";
import { CartContext } from "./Contexts";
import { MAX_QUANTITY } from "./Constants";

function App() {
  const [products, setProducts] = useState([]);

  const addToCart = (id, quantity) => {
    const updatedCart = [...products];
    const index = updatedCart.findIndex((item) => item.id === id);
    if (index === -1) {
      // this item isn't in the cart, add it with quantity
      updatedCart.push({ id, quantity });
    } else if (updatedCart[index].quantity + quantity > MAX_QUANTITY) {
      // this item already exists in the cart, but total quantity would be over max so set quantity to max
      updatedCart[index].quantity = MAX_QUANTITY;
    } else {
      // this item already exists in the cart, add to existing quantity
      updatedCart[index].quantity += quantity;
    }
    setProducts(updatedCart);
  };

  const updateCartQuantity = (id, quantity) => {
    const updatedCart = [...products];
    const index = updatedCart.findIndex((item) => item.id === id);
    if (index !== -1) {
      // update the quantity to the new value
      updatedCart[index].quantity = quantity;
    }
    setProducts(updatedCart);
  };

  const deleteFromCart = (id) => {
    const index = products.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedCart = [...products];
      updatedCart.splice(index, 1);
      setProducts(updatedCart);
    }
  };

  return (
    <CartContext
      value={{ products, addToCart, updateCartQuantity, deleteFromCart }}
    >
      <Navbar />
      <Outlet />
    </CartContext>
  );
}

export default App;
