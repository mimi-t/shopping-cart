import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { CartContext } from "./Contexts.js";
import styles from "./ProductCard.module.css";
import QuantityInput from "./QuantityInput.jsx";

const ProductCard = ({ id, title, description, price, image }) => {
  const [quantity, setQuantity] = useState(0);
  const { addOrUpdateCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addOrUpdateCart(id, quantity);
    }
    setQuantity(0);
  };

  return (
    <div className={styles["card"]}>
      <div className={styles["details"]}>
        <img src={image} />
        <h2 className="title">{title}</h2>
        <p className={styles["description"]}>{description}</p>
      </div>
      <div className={styles["actions"]}>
        <p className={styles["price"]}>${price}</p>
        <QuantityInput quantity={quantity} updateQuantity={setQuantity} />
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to cart
        </button>
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

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  image: isImageUrl,
};

export default ProductCard;
