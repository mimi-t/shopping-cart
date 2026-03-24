import PropTypes from "prop-types";
import styles from "./ConfirmDialog.module.css";
function ConfirmDialog({ description, closeDialog, confirmAction }) {
  return (
    <>
      <div onClick={closeDialog} className={styles["overlay"]}></div>
      <dialog open className={styles["dialog"]}>
        <p>{description}</p>
        <div className={styles["button-container"]}>
          <button onClick={closeDialog} className="secondary-button">
            Cancel
          </button>
          <button onClick={confirmAction} className="primary-button">
            Confirm
          </button>
        </div>
      </dialog>
    </>
  );
}

ConfirmDialog.propTypes = {
  description: PropTypes.string.isRequired,
  closeDialog: PropTypes.func.isRequired,
  confirmAction: PropTypes.func.isRequired,
};
export default ConfirmDialog;
