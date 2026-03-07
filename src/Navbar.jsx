import { Link } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["link-container"]}>
        <Link to="/">Fables</Link>
        <Link to="/shop">Shop all</Link>
      </div>
      <div className={styles["link-container"]}>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
