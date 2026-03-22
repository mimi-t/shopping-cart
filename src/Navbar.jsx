import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { CartContext } from "./Contexts";

const Navbar = () => {
  const { products } = useContext(CartContext);
  return (
    <nav className={styles["navbar"]}>
      <Link to="/shop">Shop all</Link>
      <Link to="/" className={`logo ${styles["main-link"]}`}>
        Fables
      </Link>
      <Link to="/cart">
        Cart {products.length > 0 && `(${products.length})`}
      </Link>
    </nav>
  );
};

export default Navbar;
