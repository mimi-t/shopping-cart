import PropTypes from "prop-types";

function ConfirmDialog({ description, closeDialog, confirmAction }) {
  return (
    <dialog open>
      <p>{description}</p>
      <div>
        <button onClick={closeDialog}>Close</button>
        <button onClick={confirmAction}>Confirm</button>
      </div>
    </dialog>
  );
}

ConfirmDialog.propTypes = {
  description: PropTypes.string.isRequired,
  closeDialog: PropTypes.func.isRequired,
  confirmAction: PropTypes.func.isRequired,
};
export default ConfirmDialog;
