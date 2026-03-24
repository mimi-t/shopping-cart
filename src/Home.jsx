import styles from "./Home.module.css";
import { Link } from "react-router";
import heroImage from "./assets/images/home.jpg";

function Home() {
  return (
    <main className={styles["container"]}>
      <div className={styles["hero-container"]}>
        <img
          src={heroImage}
          className={styles["hero-image"]}
          alt="Perfume bottle balanced on wood"
        />
      </div>
      <div className={styles["welcome-message"]}>
        <h1 className="logo">Fables</h1>
        <p>
          Explore our range of science-backed formulas engineered to nourish
          your skin.
        </p>
        <Link to="/shop">
          <button>Discover our collection</button>
        </Link>
      </div>
    </main>
  );
}

export default Home;
