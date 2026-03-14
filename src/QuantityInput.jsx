import PropTypes from "prop-types";
import { MIN_QUANTITY, MAX_QUANTITY } from "./Constants";

function QuantityInput({
  quantity,
  setQuantity,
  updateQuantityInCart,
  deleteFromCart,
  setError,
}) {
  const decrementQuantity = () => {
    if (quantity > MIN_QUANTITY) {
      let newQuantity = quantity - 1;
      if (quantity > MAX_QUANTITY) {
        // decrementing a quantity that is over the max value will set the quantity to the max value
        setError(null);
        newQuantity = MAX_QUANTITY;
      }
      if (newQuantity === 0 && deleteFromCart) {
        deleteFromCart();
      } else if (updateQuantityInCart) {
        updateQuantityInCart(newQuantity);
      } else {
        setQuantity(newQuantity);
      }
    }
  };

  const incrementQuantity = () => {
    if (quantity < MAX_QUANTITY) {
      let newQuantity = quantity + 1;
      if (quantity > MAX_QUANTITY) {
        // incrementing a quantity that is under the min value will set the quantity to the min value
        setError(null);
        newQuantity = MIN_QUANTITY;
      }
      if (updateQuantityInCart) {
        updateQuantityInCart(newQuantity);
      } else {
        setQuantity(newQuantity);
      }
    }
  };

  const handleChangeQuantity = (event) => {
    setError(null);
    setQuantity(parseInt(event.target.value));
  };

  const updateCartQuantity = () => {
    if (quantity === 0) {
      deleteFromCart();
    } else {
      // if invalid value show error message , also need to update for onaddtocart in ProductCard
      if (quantity < MIN_QUANTITY || quantity > MAX_QUANTITY) {
        setError("Invalid quantity, please enter a number between 0 to 99.");
      } else {
        updateQuantityInCart(quantity);
      }
    }
  };

  return (
    <div className="quantity">
      <button onClick={decrementQuantity}>-</button>
      <input
        type="number"
        name="quantity"
        value={quantity}
        onKeyDown={(event) =>
          ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()
        }
        onChange={handleChangeQuantity}
        onBlur={() => updateCartQuantity()}
        min={MIN_QUANTITY}
        max={MAX_QUANTITY}
      />
      <button onClick={incrementQuantity}>+</button>
    </div>
  );
}

QuantityInput.propTypes = {
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  updateQuantityInCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
  setError: PropTypes.func,
};

export default QuantityInput;
