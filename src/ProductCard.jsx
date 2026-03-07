import PropTypes from "prop-types";
const ProductCard = ({ title, description, price, image }) => {
  return (
    <div className="card">
      <img src={image} />
      <p>{title}</p>
      <p>{description}</p>
      <p>${price}</p>
      <p>Quantity</p>
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
