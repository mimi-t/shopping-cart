import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import QuantityInput from "./QuantityInput";
import { CartContext } from "./Contexts";
import ConfirmDialog from "./ConfirmDialog";
import { createPortal } from "react-dom";

function CartItem({
  id,
  title,
  price,
  thumbnail,
  initialQuantity,
  deleteProduct,
}) {
  const { updateCartQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [quantityError, setQuantityError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        showDeleteDialog={() => setIsDialogOpen(true)}
        setError={setQuantityError}
      />
      {quantityError && <div>{quantityError}</div>}
      <button onClick={() => setIsDialogOpen(true)}>Delete</button>
      {isDialogOpen &&
        createPortal(
          <ConfirmDialog
            description={`Are you sure you want to delete ${title} from your cart?`}
            closeDialog={() => setIsDialogOpen(false)}
            confirmAction={deleteProduct}
          />,
          document.body,
        )}
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
