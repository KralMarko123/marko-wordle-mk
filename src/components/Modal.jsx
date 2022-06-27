import React from "react";
import "../styles/Modal.css";

const Modal = ({ message, modalHandler }) => {
  const hideModal = () => {
    modalHandler();
  };

  return (
    <div className="modal">
      <div className="card">
        <span className="modal-toggle" onClick={hideModal}>
          X
        </span>
        <p className="modal-message">{message}</p>
      </div>
    </div>
  );
};

export default Modal;
