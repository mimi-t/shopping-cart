import Navbar from "./Navbar";
import ProductContainer from "./ProductContainer";
import styles from "./Shop.module.css";

const Shop = () => {
  return (
    <div className={styles["shop-container"]}>
      <Navbar />
      <main className={styles["main-content"]}>
        <h1 className={styles["heading"]}>Shop</h1>
        <ProductContainer />
      </main>
    </div>
  );
};

export default Shop;
