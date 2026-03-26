import PropTypes from "prop-types";
import { MIN_QUANTITY, MAX_QUANTITY } from "./Constants";
import styles from "./QuantityInput.module.css";
import { useState } from "react";

function QuantityInput({
  quantity,
  setQuantity,
  updateQuantityInCart,
  showDeleteDialog,
  setError,
}) {
  const [prevQuantity, setPrevQuantity] = useState(null);
  const decrementQuantity = () => {
    // don't allow the user to decrement below the minimum value
    setPrevQuantity(quantity);
    if (quantity > MIN_QUANTITY) {
      let newQuantity = parseInt(quantity) - 1;
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
      setPrevQuantity(quantity);
      let newQuantity = parseInt(quantity) + 1;
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
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
    // Handle 0 quantity by showing delete dialog
    if (newQuantity === 0) {
      if (showDeleteDialog) {
        showDeleteDialog();
      }
    } else if (newQuantity >= MIN_QUANTITY && newQuantity <= MAX_QUANTITY) {
      // Validate and update cart immediately on change
      if (updateQuantityInCart) {
        updateQuantityInCart(newQuantity);
      }
    } else {
      // Show error for invalid quantities
      setError("Invalid quantity, please enter a number between 0 to 99.");
    }
  };

  const updateCartQuantity = () => {
    setPrevQuantity(quantity);
    if (quantity === 0) {
      showDeleteDialog();
    } else if (isNaN(quantity)) {
      // if value is NaN (e.g. empty string), set quantity to the previous valid quantity inputted
      setQuantity(prevQuantity);
    } else {
      // if invalid value show error message
      setPrevQuantity(quantity);
      if (quantity < MIN_QUANTITY || quantity > MAX_QUANTITY) {
        setError("Invalid quantity, please enter a number between 0 to 99.");
      } else if (updateQuantityInCart) {
        updateQuantityInCart(parseInt(quantity));
      }
    }
  };

  return (
    <div className={styles["quantity"]}>
      <button
        title="Decrease quantity"
        onClick={decrementQuantity}
        className={`${styles["decrement-button"]} secondary-button`}
      >
        -
      </button>
      <input
        type="number"
        name="quantity"
        value={quantity}
        onKeyDown={(event) =>
          ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()
        }
        onChange={handleChangeQuantity}
        onBlur={updateCartQuantity}
        min={MIN_QUANTITY}
        max={MAX_QUANTITY}
        className={styles["number-input"]}
      />
      <button
        title="Increase quantity"
        onClick={incrementQuantity}
        className={`${styles["increment-button"]} secondary-button`}
      >
        +
      </button>
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
