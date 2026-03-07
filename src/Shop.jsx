import Navbar from "./Navbar";
import ProductContainer from "./ProductContainer";
import styles from "./Shop.module.css";

const Shop = () => {
  return (
    <div className={styles["container"]}>
      <Navbar />
      <main>
        <h1>Shop</h1>
        <ProductContainer />
      </main>
    </div>
  );
};

export default Shop;
