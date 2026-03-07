import Navbar from "./Navbar";
import styles from "./Shop.module.css";
const Shop = () => {
  return (
    <div className={styles["container"]}>
      <Navbar />
      <main>
        <h1>Shop</h1>
        <p>Items here...</p>
      </main>
    </div>
  );
};

export default Shop;
