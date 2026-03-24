import { useState, useContext, useEffect } from "react";
import trashIcon from "./assets/icons/trash-can.svg";

import PropTypes from "prop-types";
import QuantityInput from "./QuantityInput";
import { CartContext } from "./Contexts";
import ConfirmDialog from "./ConfirmDialog";
import { createPortal } from "react-dom";
import styles from "./CartItem.module.css";

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
    <div className={styles["item"]}>
      <img src={thumbnail} alt={title} className={styles["thumbnail"]} />
      <div className={styles["item-details"]}>
        <div className={styles["top-row"]}>
          <p className={styles["title"]}>{title}</p>
          <img
            onClick={() => setIsDialogOpen(true)}
            src={trashIcon}
            alt="Delete button"
            className={styles["trash-icon"]}
          />
        </div>
        <div className={styles["bottom-row"]}>
          <QuantityInput
            quantity={quantity}
            setQuantity={setQuantity}
            updateQuantityInCart={(qty) => updateCartQuantity(id, qty)}
            showDeleteDialog={() => setIsDialogOpen(true)}
            setError={setQuantityError}
          />
          <p className={styles["price"]}>${price}</p>
        </div>
        {quantityError && <div>{quantityError}</div>}
      </div>
      {isDialogOpen &&
        createPortal(
          <ConfirmDialog
            description={`Are you sure you want to remove ${title} from your cart?`}
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
