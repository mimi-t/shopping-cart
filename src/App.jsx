import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useState } from "react";
import { CartContext } from "./Contexts";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (id, quantity) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === id);
    if (index === -1) {
      // this item isn't in the cart, add it with quantity
      updatedCart.push({ id, quantity });
    } else {
      // this item already exists in the cart, update quantity
      updatedCart[index].quantity += quantity;
    }
    setCart(updatedCart);
  };

  return (
    <CartContext value={{ cart, addToCart }}>
      <Navbar />
      <Outlet />
    </CartContext>
  );
}

export default App;
