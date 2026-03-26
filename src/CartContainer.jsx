import { useEffect, useState, useContext } from "react";
import { CartContext } from "./Contexts";
import CartItem from "./CartItem";
import styles from "./CartContainer.module.css";

const SHOP_API = "https://dummyjson.com/";

function CartContainer() {
  const { products, deleteFromCart } = useContext(CartContext);
  const [detailedProducts, setDetailedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productIds = products.map((p) => p.id).join(",");

  useEffect(() => {
    const getCartProducts = async () => {
      setLoading(true);
      try {
        let cartProducts = [];
        for (const product of products) {
          const response = await fetch(`${SHOP_API}/products/${product.id}`);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productIds]);

  // Update quantities in detailedProducts when products quantities change
  useEffect(() => {
    setDetailedProducts((prevDetailed) =>
      prevDetailed.map((detailed) => {
        const updatedProduct = products.find((p) => p.id === detailed.id);
        return updatedProduct
          ? { ...detailed, quantity: updatedProduct.quantity }
          : detailed;
      }),
    );
  }, [products]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Can&apos;t retrieve products, encountered error: {error}</p>;
  }

  return (
    <>
      {detailedProducts.length <= 0 && <p>Your cart is empty.</p>}
      {detailedProducts.map((product) => {
        return (
          <CartItem
            key={product.id}
            {...product}
            initialQuantity={product.quantity}
            deleteProduct={() => deleteFromCart(product.id)}
          />
        );
      })}
      {detailedProducts.length > 0 && (
        <>
          <div className={styles["total"]}>
            <p>Total</p>
            <p>
              $
              {detailedProducts
                .reduce(
                  (total, current) => total + current.quantity * current.price,
                  0,
                )
                .toFixed(2)}
            </p>
          </div>
          <div className={styles["checkout"]}>
            <button className="primary-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </>
  );
}

export default CartContainer;
