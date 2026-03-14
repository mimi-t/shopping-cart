import { useEffect, useState, useContext } from "react";
import { CartContext } from "./Contexts";
import CartProduct from "./CartProduct";

const SHOP_API = "https://dummyjson.com/";

function Cart() {
  const { products, deleteFromCart } = useContext(CartContext);
  const [detailedProducts, setDetailedProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCartProducts = async () => {
      setLoading(true);
      try {
        let cartProducts = [];
        for (const product of products) {
          const response = await fetch(`${SHOP_API}/products/${product.id}`);
          if (!response.ok) {
            return new Error(`Response status: ${response.status}`);
          }
          const newProduct = await response.json();
          cartProducts.push({
            title: newProduct.title,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            id: product.id,
            quantity: product.quantity,
          });
        }
        setDetailedProducts(cartProducts);
      } catch (error) {
        setError(error.message);
        setDetailedProducts(null);
      } finally {
        setLoading(false);
      }
    };
    getCartProducts();
  }, [products]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Can&apos;t retrieve products, encountered error: {error}</p>;
  }

  return (
    <main>
      <h1>Cart</h1>
      {detailedProducts.length <= 0 && "Your cart is empty."}
      {detailedProducts.map((product) => {
        return (
          <CartProduct
            key={product.id}
            {...product}
            initialQuantity={product.quantity}
            deleteProduct={() => deleteFromCart(product.id)}
          />
        );
      })}
    </main>
  );
}

export default Cart;
