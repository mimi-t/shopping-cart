import { Link } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <Link to="/shop">Shop all</Link>
      <Link to="/" className={styles["main-link"]}>
        Fables
      </Link>
      <Link to="/cart">Cart</Link>
    </nav>
  );
};

export default Navbar;
