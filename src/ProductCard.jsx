import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { CartContext } from "./Contexts.js";
import styles from "./ProductCard.module.css";

const ProductCard = ({ id, title, description, price, image }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useContext(CartContext);

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(id, quantity);
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
        <div className="quantity">
          <button onClick={decrementQuantity}>-</button>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleQuantity}
            min={0}
            max={99}
          />
          <button onClick={incrementQuantity}>+</button>
        </div>
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
