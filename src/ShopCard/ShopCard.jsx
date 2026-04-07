import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { CartContext } from "../Contexts.js";
import styles from "./ShopCard.module.css";
import QuantityInput from "../QuantityInput/QuantityInput.jsx";

const ShopCard = ({ id, title, description, price, image }) => {
  const [quantity, setQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState(null);
  const [addIsClicked, setAddIsClicked] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (quantity > 0) {
      setAddIsClicked(true);
      addToCart(id, quantity);
    }
    setQuantity(0);
  };

  return (
    <div className={styles["card"]}>
      <div className={styles["details"]}>
        <img src={image} />
        <p className={styles["title"]}>{title}</p>
        <p className={styles["description"]}>{description}</p>
      </div>
      <div className={styles["actions"]}>
        <p className={styles["price"]}>${price}</p>
        <QuantityInput
          quantity={quantity}
          setQuantity={setQuantity}
          setError={setQuantityError}
        />
        <button
          className={styles["add-cart-btn"]}
          onClick={handleAddToCart}
          disabled={quantityError !== null}
        >
          Add to cart
        </button>
        {quantityError && addIsClicked && <div>{quantityError}</div>}
      </div>
    </div>
  );
};

const isImageUrl = (props, propName, componentName) => {
  const startStr = ["http://", "https://"];
  const endStr = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  const startFound = startStr.some((str) => props[propName].startsWith(str));
  const endFound = endStr.some((str) => props[propName].endsWith(str));
  if (!(startFound && endFound)) {
    return new Error(
      `Invalid prop ${propName} passed to ${componentName}. Expected an image URL`,
    );
  }
};

ShopCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  image: isImageUrl,
};

export default ShopCard;
