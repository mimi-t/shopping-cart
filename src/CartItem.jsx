import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import QuantityInput from "./QuantityInput";
import { CartContext } from "./Contexts";

function CartItem({
  id,
  title,
  price,
  thumbnail,
  initialQuantity,
  deleteProduct,
}) {
  const { deleteFromCart, updateCartQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [quantityError, setQuantityError] = useState(null);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  return (
    <div className="cart-item">
      <img src={thumbnail} alt={title} />
      <p>{title}</p>
      <p>${price}</p>
      <QuantityInput
        quantity={quantity}
        setQuantity={setQuantity}
        updateQuantityInCart={(qty) => updateCartQuantity(id, qty)}
        deleteFromCart={() => deleteFromCart(id)}
        setError={setQuantityError}
      />
      {quantityError && <div>{quantityError}</div>}
      <button onClick={deleteProduct}>Delete</button>
    </div>
  );
}

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  initialQuantity: PropTypes.number.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default CartItem;
