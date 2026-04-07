import ShopContainer from "../ShopContainer/ShopContainer";
import styles from "./ShopPage.module.css";

const ShopPage = () => {
  return (
    <main className={styles["container"]}>
      <h1 className={styles["heading"]}>Shop</h1>
      <ShopContainer />
    </main>
  );
};

export default ShopPage;
