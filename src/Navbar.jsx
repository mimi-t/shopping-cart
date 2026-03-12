import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { CartContext } from "./Contexts";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  return (
    <nav className={styles["navbar"]}>
      <Link to="/shop">Shop all</Link>
      <Link to="/" className={styles["main-link"]}>
        Fables
      </Link>
      <Link to="/cart">Cart {cart.length > 0 && `(${cart.length})`}</Link>
    </nav>
  );
};

export default Navbar;
