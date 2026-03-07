import "./App.css";
import { Link } from "react-router";
import homeImage from "../public/home.jpg";

function App() {
  return (
    <>
      <div className="hero-image-container">
        <img
          src={homeImage}
          className="hero-image"
          alt="Perfume bottle balanced on wood pieces"
        />
      </div>
      <div className="welcome-message">
        <h1>Fables</h1>
        <p>
          Explore our range of science-backed formulas engineered to nourish
          your skin.
        </p>
        <button>
          <Link to="shop">Discover our collection</Link>
        </button>
      </div>
    </>
  );
}

export default App;
