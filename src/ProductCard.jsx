import PropTypes from "prop-types";
import { useState } from "react";

const ProductCard = ({ title, description, price, image }) => {
  const [quantity, setQuantity] = useState(0);
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

  return (
    <div className="card">
      <img src={image} />
      <p>{title}</p>
      <p>{description}</p>
      <p>${price}</p>
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
      <button>Add to cart</button>
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  image: isImageUrl,
};

export default ProductCard;
