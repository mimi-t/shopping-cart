import PropTypes from "prop-types";

function QuantityInput({ quantity, updateQuantity }) {
  const decrementQuantity = () => {
    if (quantity > 0) {
      updateQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 99) {
      updateQuantity(quantity + 1);
    }
  };

  const handleQuantity = (event) => {
    updateQuantity(event.target.value);
  };

  return (
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
  );
}

QuantityInput.propTypes = {
  quantity: PropTypes.number.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default QuantityInput;
