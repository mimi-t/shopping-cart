import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useState } from "react";
import { CartContext } from "./Contexts";

function App() {
  const [products, setProducts] = useState([]);

  const addOrUpdateCart = (id, quantity) => {
    const updatedCart = [...products];
    const index = updatedCart.findIndex((item) => item.id === id);
    if (index === -1) {
      // this item isn't in the cart, add it with quantity
      updatedCart.push({ id, quantity });
    } else {
      // this item already exists in the cart, update quantity
      updatedCart[index].quantity += quantity;
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
    <CartContext value={{ products, addOrUpdateCart, deleteFromCart }}>
      <Navbar />
      <Outlet />
    </CartContext>
  );
}

export default App;
