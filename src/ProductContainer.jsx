import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import styles from "./ProductContainer.module.css";

const SHOP_API = "https://dummyjson.com/products";

const ProductContainer = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(SHOP_API);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const products = await response.json();
        setProducts(products.products);
        setError(null);
      } catch (error) {
        setError(error.message);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles["container"]} data-testid="product-container">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.thumbnail}
          />
        );
      })}
    </div>
  );
};

export default ProductContainer;
