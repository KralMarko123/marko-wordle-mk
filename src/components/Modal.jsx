import React from "react";
import "../styles/Modal.css";

const Modal = ({ message, modalHandler, isGameOver }) => {
  const hideModal = () => {
    modalHandler();
  };

  return (
    <div className="modal">
      <div className="card">
        {!isGameOver ? (
          <span className="modal-toggle" onClick={hideModal}>
            X
          </span>
        ) : null}
        <p className="modal-message">{message}</p>
      </div>
    </div>
  );
};

export default Modal;
