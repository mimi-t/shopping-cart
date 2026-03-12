import ProductContainer from "./ProductContainer";
import styles from "./Shop.module.css";

const Shop = () => {
  return (
    <main className={styles["container"]}>
      <h1 className={styles["heading"]}>Shop</h1>
      <ProductContainer />
    </main>
  );
};

export default Shop;
