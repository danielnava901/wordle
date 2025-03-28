import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose, className }) => {
  return ReactDOM.createPortal(
    <div className={`modal-overlay`}>
      <div className={`modal-content ${className}`}>
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Modal;
