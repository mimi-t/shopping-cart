import CartContainer from "../CartContainer/CartContainer";
import styles from "./CartPage.module.css";

function CartPage() {
  return (
    <main className={styles["container"]}>
      <h1 className={styles["heading"]}>Cart</h1>
      <div>
        <CartContainer />
      </div>
    </main>
  );
}

export default CartPage;
