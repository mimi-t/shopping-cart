import styles from "./App.module.css";
import { Link } from "react-router";
import homeImage from "../public/home.jpg";

function App() {
  return (
    <main className={styles["container"]}>
      <div className={styles["hero-container"]}>
        <img
          src={homeImage}
          className={styles["hero-image"]}
          alt="Perfume bottle balanced on wood pieces"
        />
      </div>
      <div className={styles["welcome-message"]}>
        <h1>Fables</h1>
        <p>
          Explore our range of science-backed formulas engineered to nourish
          your skin.
        </p>
        <button>
          <Link to="shop">Discover our collection</Link>
        </button>
      </div>
    </main>
  );
}

export default App;
