import PropTypes from "prop-types";
import { MIN_QUANTITY, MAX_QUANTITY } from "./Constants";

function QuantityInput({
  quantity,
  setQuantity,
  updateQuantityInCart,
  showDeleteDialog,
  setError,
}) {
  const decrementQuantity = () => {
    // don't allow the user to decrement below the minimum value
    if (quantity > MIN_QUANTITY) {
      let newQuantity = quantity - 1;
      // decrementing a quantity over the max value will set the new quantity to the max value
      if (quantity > MAX_QUANTITY) {
        setError(null);
        newQuantity = MAX_QUANTITY;
      }
      if (newQuantity === 0 && showDeleteDialog) {
        showDeleteDialog();
      } else {
        setQuantity(newQuantity);
        if (updateQuantityInCart) {
          updateQuantityInCart(newQuantity);
        }
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
      setQuantity(newQuantity);
      if (updateQuantityInCart) {
        updateQuantityInCart(newQuantity);
      }
    }
  };

  const handleChangeQuantity = (event) => {
    setError(null);
    setQuantity(parseInt(event.target.value));
  };

  const updateCartQuantity = () => {
    if (quantity === 0) {
      showDeleteDialog();
    } else {
      // if invalid value show error message , also need to update for onaddtocart in ProductCard
      if (quantity < MIN_QUANTITY || quantity > MAX_QUANTITY) {
        setError("Invalid quantity, please enter a number between 0 to 99.");
      } else if (updateQuantityInCart) {
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
  showDeleteDialog: PropTypes.func,
  setError: PropTypes.func,
};

export default QuantityInput;
